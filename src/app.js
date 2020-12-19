const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')//Custom Views path; default is "views" 
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views path
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)


// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

//Setup static directory to serve;used for js/css
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Vivek'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Weather App',
        name: 'Vivek'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        message: 'My Help Page',
        name: 'Vivek'
    })
})
// app.get('',(req, res)=>{
//     res.send("<h1>Weather</h1>")
// })

// app.get('/help',(req, res)=>{
//     //res.send("Help Page")
//     // res.send({
//     //     name: 'Vivek',
//     //     age: 30
//     // })
//     // res.send([{
//     //     name: 'Vivek',
//     //     age: 30
//     // },
//     // {
//     //     name: 'Test',
//     //     age: 30
//     // }])
// })

// app.get('/about',(req, res)=>{
//     res.send("About Page")
// })

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: location
            })
            
        })
    })
    
})


app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404error',{
        errorMessage: '404 Help Article not found',
        title: '404 Page',
        name: 'Vivek2'
    })
})



app.get('*', (req,res) => {
    res.render('404error',{
        errorMessage: '404 Page Not Found',
        title: '404 Page',
        name: 'Vivek2'
    })
})

app.listen(port, () => {
    console.log("Server is Up on Port "+ port)
})
