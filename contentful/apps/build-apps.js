#!/usr/bin/env node
const fs = require('fs');
const { exec } = require('child_process');

const root = __dirname;
const extDir = `${root}/src`;

// Remove build dir if it exists.
fs.rmdirSync(`${root}/build/*`, { recursive: true });

// Loop over each app, build and move contents to deployment dir.
const extensions = fs.readdirSync(extDir).filter((file) => {
    return fs.lstatSync(`${extDir}/${file}`).isDirectory();
});

extensions.forEach((el) => {
    const buildDir = `${root}/build/${el}`;
    fs.mkdirSync(buildDir, { recursive: true })
    process.chdir(`${extDir}/${el}`);
    console.log('running "react-scripts build"');
    exec(`${root}/node_modules/.bin/react-scripts build && mv build/* ${buildDir}`, (error, stdout, stderr) => {
        console.log('error:', '======');
        console.log(error);
        console.log('stdout:', '======');
        console.log(stdout);
        console.log('stderr:', '======');
        console.log(stderr);
        console.log('======');
        console.log(`done w/ ${el}`);
    });
});
