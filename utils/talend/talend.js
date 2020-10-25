#!/usr/bin/env node

// Import config.
require("dotenv").config({
    path: `${__dirname}/../../.env.local`,
});

// Run commands from CLI project root; allows discoverability of certain dependencies
// (namely eslint-config-standard used by `talend migrate bootstrap` command).
process.chdir(__dirname);

const commander = require('commander');
const inquirer = require('inquirer');

// Import commands.
const buildCommand = require('./commands/env/build');
const refreshCommand = require('./commands/local/refresh');
const testCommand = require('./commands/local/test');

const program = new commander.Command();

// Environment commands.
const env = program.command('env');
buildCommand(env);

// Local development commands.
const local = program.command('local')
refreshCommand(local);
testCommand(local);

// Migrate commands (talend migrate is basically an alias of void--/contentful-migrate
// which is a fork of deluan/contentful-migrate).
if(['migrate'].includes(process.argv[2])) {
    process.argv.splice(2, 1);
    require('yargs')
        .scriptName('talend migrate')
        .usage('Manage your Contentful schema by creating incremental scripted changes\nFor more information visit https://github.com/deluan/contentful-migrate')
        .commandDir('./node_modules/contentful-migrate/bin/commands')
        .recommendCommands()
        .demandCommand(1, 'Please provide a valid command from the list above')
        .argv;
}
// Else use commander.
else {
    program.parse(process.argv);
}
