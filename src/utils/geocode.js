const request = require('postman-request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoidml2ZWs1MTkiLCJhIjoiY2tpYjgxZnMyMDVrNjJ0cG9tdzR6dGF6dCJ9.J9129Sn1ueYJhDgahfICbQ&limit=1';

    request({ url, json: true },(error,{body}) => {
        if(error){
            callback('Could not connect to Location service!')
        }else if(body.features.length === 0){
            callback('Unable to find location')
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        
        })
}

module.exports = geocode
