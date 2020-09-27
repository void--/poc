const NetlifyAPI = require('netlify')
const netlifyClient = new NetlifyAPI(process.env.NETLIFY_API_TOKEN);
const netlifyBuild = require('../../helpers/netlify-build');
const { exec } = require('child_process');
const notifier = require('node-notifier');
const buildPollInterval = 5000;
const buildPollTimeout = 3600000;

module.exports = (env) => {
    env
        .command('build')
        .arguments('<branch>')
        .option('-p, --preview', 'Whether or not this build should be a preview.')
        .option('-e, --env <env>', 'The Contentful environment that should be used with this build, will default to an env with the same name as the branch.')
        .action(async (branch, options) => {
            const env = options.env || branch;
            const currentTime = Date.now();

            await netlifyBuild(branch, env, options.preview);

            const builds = await netlifyClient.listSiteBuilds({
                site_id: process.env.NETLIFY_SITE_ID
            });

            const currentBuild = builds.filter((build) => {
                if (!build.done) {
                    const buildTime = (new Date(build.created_at)).getTime();
                    const timeDiff = buildTime - currentTime;
                    return 0 < timeDiff && timeDiff < 1000;
                }
            }).pop();

            exec(`talend env pollAndNotifyWhenBuildsComplete https://${branch}--${process.env.NETLIFY_SITE_NAME}.netlify.app ${currentBuild.id}`);
            process.exit();
        });

    // Helper command to poll
    env
        .command('pollAndNotifyWhenBuildsComplete')
        .arguments('<build_url> <build_id>')
        .action(async (build_url, build_id) => {

            const pollInterval = setInterval(async () => {
                const runningBuilds = await netlifyClient.listSiteBuilds({
                    site_id: process.env.NETLIFY_SITE_ID
                });

                const build = runningBuilds.filter((item) => item.id === build_id).pop();

                if (build.done) {
                    clearInterval(pollInterval);
                    notifier.notify({
                        title: 'Build is done!',
                        message: build_url,
                        open: build_url
                    });

                    exec(process.env.ALERT_COMMAND);
                }

            }, buildPollInterval);

            setTimeout(() => {
                clearInterval(pollInterval);
            }, buildPollTimeout);
        });
}
