#!/usr/bin/env node
const fs = require('fs');
const { exec } = require('child_process');

const root = __dirname;
fs.rmdirSync(`${root}/build`, { recursive: true });

fs.readdir(root, (err, files) => {
    const extensions = files.filter((file) => {
        return fs.lstatSync(file).isDirectory() && !['node_modules', '.netlify'].includes(file);
    });

    extensions.forEach((el) => {
        console.log(el);
        fs.mkdirSync(`${root}/build/${el}`, { recursive: true })
        console.log(`made dir for ${el}`);
        process.chdir(`${root}/${el}`);
        exec(`echo ${el} && npx @contentful/contentful-extension-scripts build --no-inline && echo ${el}2 && mv build/* ${root}/build/${el}`);
    });
});
