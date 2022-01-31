const request = require('postman-request') // TODO Replace this lib with axios, because 'postman-request' provides usage callbacks for async api and should be never used

const geocode = (address, callback) => { // TODO refactor code to use async await instead of callbacks
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent( // TODO Move host to env variable (see 'dotenv' lib)
        address
    )}.json?access_token=pk.eyJ1IjoibmlydmFjc2giLCJhIjoiY2t5c2loM2N6MTQxdjJvbzNyM215YXNhNCJ9.g7qPUT41MloODVJqTBF7Hg&limit=1` // TODO Move the access key to env variable (see 'dotenv' lib). Access keys should be NEVER be present in application code
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, { // TODO use destructurization
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode
