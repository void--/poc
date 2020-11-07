#!/usr/bin/env node
const fs = require('fs');
const { exec } = require('child_process');

const root = __dirname;
fs.rmdirSync(`${root}/build`, { recursive: true });

fs.readdir(root, (err, files) => {
    const extensions = files.filter((file) => {
        return fs.lstatSync(file).isDirectory() && file !== 'node_modules';
    });

    extensions.forEach((el) => {
        console.log(el);
        fs.mkdirSync(`${root}/build/${el}`, { recursive: true })
        process.chdir(`${root}/${el}`);
        exec(`npm run build && mv build/* ${root}/build/${el}`);
    });
});
