const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e4adf675b8a0e31a4e914062ae6d2bc0/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, { body }) => {
         if(error) {
             callback('Unable to connect to the weather service')
         } else if(body.error) {
             callback('Unable to find the location')
         } else {
            //console.log(body.currently) 
            const msg = 'The high today is expected to be ' + body.daily.data[0].temperatureHigh + ' degrees ' +
                        'with the low at ' + body.daily.data[0].temperatureLow  + '. ' + ' Currently it is ' + body.currently.temperature + 
                        ' degrees and the wind is blowing at ' + body.currently.windSpeed + ' kph with gusts up ' + body.currently.windGust + ' kph. ' +
                        'Expect '  + body.daily.data[0].summary
            callback(undefined, msg)         
         }
    })
}

module.exports = forecast