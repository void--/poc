#!/usr/bin/env node
const commander = require('commander');
const axios = require('axios');
require("dotenv").config({
    path: `../../.env.local`,
});

const program = new commander.Command();
const env = program.command('env');

env
    .command('build')
    .arguments('<env>')
    .option('-p, --preview', 'Whether or not this build should be a preview')
    .action((env, options) => {
        netlifyBuild(env, options.preview);
    });

program.parse(process.argv);

async function netlifyBuild(env, preview) {
    let message = preview
        ? `Preview build of ${env} triggered via CLI by ${process.env.DEVELOPER}`
        : `Standard build of ${env} triggered via CLI by ${process.env.DEVELOPER}`;
    message = encodeURIComponent(message);
    try {
        const buildUrl = `${process.env.NETLIFY_BUILD_HOOK}?trigger_branch=${env}&trigger_title=${message}`;
        const response = await axios.post(buildUrl);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}