#!/usr/bin/env node
const commander = require('commander');
const inquirer = require('inquirer');
const axios = require('axios');
const chalk = require('chalk');
const netlifyBuild = require('./helpers/netlify-build');
require("dotenv").config({
    path: `${__dirname}/../../.env.local`,
});

const program = new commander.Command();
const env = program.command('env');

env
    .command('build')
    .arguments('<branch>')
    .option('-p, --preview', 'Whether or not this build should be a preview.')
    .option('-e, --env <env>', 'The Contentful environment that should be used with this build, will default to an env with the same name as the branch.')
    .action((branch, options) => {
        const env = options.env || branch;
        netlifyBuild(branch, env, options.preview);
    });

const local = program.command('local')

local
    .command('refresh')
    .action(async() => {
        try {
            const result = await axios.post('http://localhost:8000/__refresh');
            console.log(chalk.green('Success'));
        }
        catch (err) {
            console.log(chalk.red(err));
        }
    });

program.parse(process.argv);
