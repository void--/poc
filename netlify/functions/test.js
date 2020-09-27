exports.handler = async event => {
    const test = event.queryStringParameters.test || 'asdf';
    return {
        statusCode: 200,
        body: `~~> ${test}!`,
    }
}
