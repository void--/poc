exports.handler = async event => {
    const test = event.queryStringParameters.test || 'asdf';
    console.log('test!!!', process.env.SPACE_ID);
    return {
        statusCode: 200,
        body: `~~~~~~> ${test}!`,
    }
}
