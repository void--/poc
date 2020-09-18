const axios = require('axios');
const chalk = require('chalk');

module.exports = async function netlifyBuild(branch, env, preview) {
    const message = (addColor) => {
        const maybeYellow = (item) => addColor ? chalk.yellow(item) : item;
        return `${preview ? "Preview" : "Standard"} build of ${maybeYellow(branch)} branch with ${maybeYellow(env)} env triggerd via CLI by ${maybeYellow(process.env.DEVELOPER)}`;
    }

    try {
        const buildUrl = `${process.env.NETLIFY_BUILD_HOOK}?trigger_branch=${branch}&trigger_title=${encodeURIComponent(message())}`;
        const payload = JSON.stringify({
            'preview': preview,
            'env': env,
        });
        const response = await axios.post(buildUrl, payload);
        if (response.status === 200) {
            console.log(chalk.green(message(true)));
        }
    } catch (error) {
        console.error(chalk.red('Error:'), error);
    }
}
