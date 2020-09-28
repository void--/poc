const axios = require('axios');

exports.handler = async event => {
    const joke = await axios.get('https://icanhazdadjoke.com', {
        headers: {
            'Accept': 'application/json'
        }
    });

    return {
        statusCode: 200,
        body: `old: ${joke.data.joke}`,
    }
}
