const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAdressCordinates = async (address) =>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status==='OK'){
          const location = response.data.results[0].geometry.location;
           
            return {
                ltd:location.lat,
                lng:location.lng
            };
        } else {
            throw new Error("unable to fetch cordinates");
        }
        } catch(err){
            console.log(err);
            throw err;
        }
}
module.exports.getDistanceTime = async(origin , destination) =>{
    if(!origin || !destination){
        throw Error("origin and distance are required !");
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
       
        if(response.data.status==='OK'){
           const distance = response.data.rows[0].elements[0];
      
           return {
            distance
           }
        } else{
            console.log("error in get distance services");
        }
    } catch(err){
        console.log('errorrorororor')
        throw Error(err);
    }
}
module.exports.getAutoCompleteSuggestions = async(input)=>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

try{
    const response = await axios.get(url);
    if(response.data.status==='OK'){
        const predictions = response.data.predictions;
     
        return predictions;
    }
}catch(err){
    throw Error(err);
}

}

module.exports.getCaptainsInRadius = async (ltd, lng, radius)=>{
    const captains = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere:[[lng,ltd],radius / 6371]
            }
        }
    })
   
    return captains;
}