const axios = require('axios');

exports.handler = async event => {
    const joke = await axios.get('https://icanhazdadjoke.com', {
        headers: {
            'Accept': 'application/json'
        }
    });

    await new Promise(r => setTimeout(r, 2000));

    return {
        statusCode: 200,
        body: `NEW: ${joke.data.joke}`,
        headers: {
            'Cache-Control': 's-maxage=30'
        }
    }
}
