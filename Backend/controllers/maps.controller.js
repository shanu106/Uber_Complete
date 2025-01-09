const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');
module.exports.getCordinates = async (req, res ,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
const {address} = req.query;
try{
    const cordinates = await mapsService.getAdressCordinates(address);
   
res.status(200).json(cordinates);

} catch(err){
    console.log(err);
    throw Error(err);
}
}
module.exports.getDistanceTime = async(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {origin, destination} = req.query;
    try{
        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch(err){
        throw Error(err);
    }

}
module.exports.getAutoCompleteSuggestions = async (req, res ,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const {input} = req.query;
        try{
            const suggestion = await mapsService.getAutoCompleteSuggestions(input);
           
               
         
            res.status(200).json(suggestion);
        } catch(err){
            console.log(err);
            throw Error(err);
        }
}