#!/usr/bin/env node
const fs = require('fs');
const { exec } = require('child_process');

const root = __dirname;
const extDir = `${root}/ui-extensions`;
const appDir = `${root}/apps`;

// Remove build dir if it exists.
fs.rmdirSync(`${root}/build`, { recursive: true });

// Loop over each ui extension, build and move contents to deployment dir.
fs.readdir(extDir, (err, files) => {
    const extensions = files.filter((file) => {
        return fs.lstatSync(`${extDir}/${file}`).isDirectory();
    });

    extensions.forEach((el) => {
        const buildDir = `${root}/build/ui-extensions/${el}`;
        fs.mkdirSync(buildDir, { recursive: true })
        process.chdir(`${extDir}/${el}`);
        exec(`npx contentful-extension-scripts build --no-inline && mv build/* ${buildDir}`);
    });
});
