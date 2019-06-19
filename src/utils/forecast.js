const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e4adf675b8a0e31a4e914062ae6d2bc0/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, { body }) => {
         if(error) {
             callback('Unable to connect to the weather service')
         } else if(body.error) {
             callback('Unable to find the location')
         } else {
            const msg = 'It is currently ' + body.currently.temperature + ' degrees and there is a ' + body.currently.precipProbability + '% chance of rain.'
            callback(undefined, msg)         
         }
    })
}

module.exports = forecast