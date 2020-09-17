#!/usr/bin/env node
require("dotenv").config({
    path: `${__dirname}/../../.env.local`,
});

const commander = require('commander');
const inquirer = require('inquirer');
const axios = require('axios');
const chalk = require('chalk');
const notifier = require('node-notifier');
const { exec } = require('child_process');
const NetlifyAPI = require('netlify')
const netlifyClient = new NetlifyAPI(process.env.NETLIFY_API_TOKEN);
const netlifyBuild = require('./helpers/netlify-build');
const buildPollInterval = 5000;
const buildPollTimeout = 3600000;

const program = new commander.Command();

// Environment commands
const env = program.command('env');
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

// Local development commands
const local = program.command('local')
local
    .command('refresh')
    .action(async () => {
        try {
            const result = await axios.post('http://localhost:8000/__refresh');
            console.log(chalk.green('Success'));
        } catch (err) {
            console.log(chalk.red(err));
        }
    });

local
    .command('test')
    .action(() => {
        exec('sleep 5 && say test');
        // process.exit();
    })

program.parse(process.argv);
