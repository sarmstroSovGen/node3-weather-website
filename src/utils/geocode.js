const request = require('request')

const geocode = (address, callback) => {
    const token = 'pk.eyJ1Ijoic3RldmVhcm1zdHJvbmdzb3ZnZW4iLCJhIjoiY2p3cWxta242MW1nazN5cW02MzQ0Z3U5NiJ9.t0AU-wyp7NO7cRPFtZk5Yw'
    const url   = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + token + '&limit=1'
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the location service')
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude:  body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            })
        }
    })
}

module.exports = geocode