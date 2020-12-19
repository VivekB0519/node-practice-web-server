const request = require('postman-request')

const forecast = (latitude,logitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=4b9c4f2c06b4dcb2ff695570c526f9bf&query=' +latitude+',' +logitude+'&units=m';

    request({ url, json: true },(error,{body}) => {
        if(error){
            callback('Could not connect to Weather service!')
        }else if(body.error){
            callback('Unable to find location')
        }else{
            // callback(undefined,{
            //     description: body.current.weather_descriptions[0],
            //     current_temp: body.current.temperature,
            //     feels_like: body.current.feelslike
            // })
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out')
        }
        
        })
}

module.exports = forecast
