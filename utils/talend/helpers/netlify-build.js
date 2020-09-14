const axios = require('axios');
const chalk = require('chalk');

module.exports = async function netlifyBuild(branch, env, preview) {
    let message = preview
        ? `Preview build of ${branch} branch with ${env} env triggered via CLI by ${process.env.DEVELOPER}`
        : `Standard build of ${branch} branch with ${env} env triggered via CLI by ${process.env.DEVELOPER}`;

    try {
        const buildUrl = `${process.env.NETLIFY_BUILD_HOOK}?trigger_branch=${branch}&trigger_title=${encodeURIComponent(message)}`;
        const payload = JSON.stringify({
            'preview': preview,
            'env': env,
        });
        const response = await axios.post(buildUrl, payload);
        if (response.status === 200) {
            console.log(chalk.green(message));
        }
    } catch (error) {
        console.error(chalk.red('Error:'), error);
    }
}
