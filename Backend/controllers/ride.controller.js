const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapsService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');
module.exports.createRide = async (req, res)=>{
    
    const errors = validationResult(req);
  
    if(!errors.isEmpty()){
        return res.status(400).json(errors);

    }
        const { pickUp, destination, vehicleType} = req.body;
        
        try{ 
            
           
            const ride = await rideService.createRide({user:req.user._id, pickUp, destination, vehicleType});
            
            res.status(200).json(ride);
            
            const pickUpCordinates = await mapsService.getAdressCordinates(pickUp);
          
            const captainsInRadius = await mapsService.getCaptainsInRadius(pickUpCordinates.ltd, pickUpCordinates.lng, 10000)
           ride.otp="";

           const rideWithUser = await rideModel.findOne({_id:ride._id}).populate('user');

           captainsInRadius.map((captain)=>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:rideWithUser
            })
           })

         } catch(err){
            throw new Error(err)
         }
}
module.exports.getFare = async (req ,res)=>{
    const {pickUp, destination} = req.query;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);

    }
    try{ 
        const fare = await rideService.getFare(pickUp, destination);
     
    res.status(201).json(fare)
  
     } catch(err){
        throw new Error(err)
     }
}

module.exports.confirmRide = async(req, res)=>{
    const errors = validationResult(req);
 
    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(400).json(errors);

    }
   
   
    try {   
        
        const ride = await rideService.confirmRide({rideId:req.body.body.rideId, captain:req.captain});
        
       sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-confirmed',
        data: ride
    })

       return res.status(200).json(ride) 
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
}

module.exports.startRide = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
        }
        const {rideId, otp} = req.query;
        try{
            const ride = await rideService.startRide({rideId, otp, captain:req.captain});

            sendMessageToSocketId(ride.user.socketId,{
                event:'ride-started',
                data:ride
            })

            return res.status(200).json(ride)
        } catch(err){
            console.log(err)
            throw new Error(err)
        }
}

module.exports.endRide = async(req ,res)=>{
    const errors = validationResult(req);
 
    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(400).json(errors);

    }
   try{
        const ride = await rideService.endRide({rideId:req.body.body.rideId,captain:req.captain});
      
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
res.status(200).json(ride)
   } catch(err){
    console.log(err)
    throw new Error(err)
   }
}