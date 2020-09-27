const axios = require('axios');
const chalk = require('chalk');

module.exports = (local) => {
    local
        .command('refresh')
        .action(async () => {
            try {
                const result = await axios.post('http://localhost:8000/__refresh');
                console.log(chalk.green('Success'));
            } catch (err) {
                console.log(chalk.red(err));
            }
        });
}
