const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app  = express()
const port = process.env.port || 3000

// Define paths for Express configuration
const publicPath   = path.join(__dirname, '../public')
const viewsPath    = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:  'Taylor Erb'    
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    } 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.render('error', {
                    title: 'Weather',
                    errmsg: error,
                    name: 'Taylor Erb'    
                })
            }
            res.send({
                location: location,
                forecast: forecastData
            }) 
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:   'Help',
        message: 'This is a test help message',
        name:  'Taylor Erb'    
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name:  'Taylor Erb'    
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errmsg: 'Help article not found',
        name: 'Taylor Erb'    
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errmsg: 'Test 404 page',
        name: 'Taylor Erb'    
    })
})

app.listen(port, () => {
    console.log('Server running on port: ' + port)
})