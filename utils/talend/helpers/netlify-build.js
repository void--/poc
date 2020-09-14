const axios = require('axios');
const chalk = require('chalk');

module.exports = async function netlifyBuild(env, preview) {
    let message = preview
        ? `Preview build of ${env} triggered via CLI by ${process.env.DEVELOPER}`
        : `Standard build of ${env} triggered via CLI by ${process.env.DEVELOPER}`;
    message = encodeURIComponent(message);
    try {
        const buildUrl = `${process.env.NETLIFY_BUILD_HOOK}?trigger_branch=${env}&trigger_title=${message}`;
        const response = await axios.post(buildUrl, {
            'preview': preview,
        });
        if (response.status === 200) {
            console.log(chalk.green('Build triggered successfully'));
        }
    } catch (error) {
        console.error(chalk.red('Error:'), error);
    }
}
