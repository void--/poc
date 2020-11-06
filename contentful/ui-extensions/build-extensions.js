#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

fs.readdir(__dirname, (err, files) => {
    const extensions = files.filter((file) => {
        return ![path.basename(__filename), 'package.json'].includes(file);
    });

    extensions.forEach((el) => {
        process.chdir(`${__dirname}/${el}`);
        exec('npm run build');
    });
});
