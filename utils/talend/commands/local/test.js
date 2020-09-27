const { exec } = require('child_process')

module.exports = (local) => {
    local
        .command('test')
        .action(() => {
            exec('sleep 5 && say test');
            // process.exit();
        })
}
