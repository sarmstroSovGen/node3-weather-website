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
            const msg = 'The high today is expected to be ' + Math.round(body.daily.data[0].temperatureHigh) + ' degrees celcius ' +
                        'with a low of ' + Math.round(body.daily.data[0].temperatureLow)  + '. ' + ' Currently it is ' + 
                        Math.round(body.currently.temperature) + ' degrees and the wind is blowing at ' + Math.round(body.currently.windSpeed) + 
                        ' kph with gusts up ' + Math.round(body.currently.windGust) + ' kph. Visibility is at ' + Math.round(body.currently.visibility) + 
                        ' km. ' + body.daily.data[0].summary
            callback(undefined, msg)         
         }
    })
}

module.exports = forecast