#!/usr/bin/env node

// Import config.
require("dotenv").config({
    path: `${__dirname}/../../.env.local`,
});

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

program.parse(process.argv);
