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
    .arguments('<env>')
    .option('-p, --preview', 'Whether or not this build should be a preview')
    .action((env, options) => {
        netlifyBuild(env, options.preview);
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
