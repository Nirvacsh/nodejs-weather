const request = require('postman-request') // TODO Replace this lib with axios, because 'postman-request' provides usage callbacks for async api and should be never used

const forecast = (latitude, longitude, callback) => {
    const url =
        'http://api.weatherstack.com/current?access_key=d950ca614fa8ef7d86a8db837b9edd5b&query=' + // TODO Move the access key to env variable (see 'dotenv' lib). Access keys should be NEVER be present in application code
        longitude +
        ',' +
        latitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(
                undefined,
                body.current.weather_descriptions[0] +
                    '. It is currently ' +
                    body.current.temperature +
                    ' degrees out.'
            )
        }
    })
}

module.exports = forecast
