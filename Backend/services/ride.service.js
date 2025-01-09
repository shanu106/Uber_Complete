const rideModel = require('../models/ride.model');
const mapsService = require('../services/maps.service');
const crypto = require('crypto');


async function getFare(pickup, destination){

    if(!pickup || !destination){
        throw new Error('pickup and destination required');
    }
    const obj = await mapsService.getDistanceTime(pickup, destination);
    const distanceTime = obj.distance
    
   

    const baseFare={
        auto:30,
        car:50,
        motorcycle:20
    }
    const perKmRate={
        auto: 10,
        car: 15,
        motorcycle: 8
    }
    const perMinuteRate={
        auto: 2,
        car: 3,
        motorcycle: 1.5
    }
const fare = {
    auto:Math.floor(baseFare.auto + ((distanceTime.distance.value/1000)*perKmRate.auto)+((distanceTime.duration.value/60) * perMinuteRate.auto)),
    car:Math.floor(baseFare.car + ((distanceTime.distance.value/1000)*perKmRate.car)+((distanceTime.duration.value/60) * perMinuteRate.car)),
    motorcycle:Math.floor(baseFare.motorcycle + ((distanceTime.distance.value/1000)*perKmRate.motorcycle)+((distanceTime.duration.value/60) * perMinuteRate.motorcycle)),
   
}

    return fare;
}
 function getOtp(num){
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}

module.exports.getFare = getFare;
module.exports.createRide = async({user, pickUp, destination, vehicleType}) =>{

    if(!user || !pickUp || !destination || !vehicleType){  
        throw new Error('user, pickUp, destination, vehicleType required');
     }

const distanceTime = await mapsService.getDistanceTime(pickUp, destination);
const distance = distanceTime.distance.distance.text;
const duration = distanceTime.distance.duration.text;
const fare = await getFare(pickUp, destination);
const ride = await rideModel.create({
    user,
    pickUp,
    vehicleType,
    destination,
    distance,
    duration,
    otp:getOtp(6),
    fare:fare[vehicleType]
})

return ride;
}

module.exports.confirmRide = async({rideId, captain})=>{
    
    if(!rideId){
        throw new Error("ride Id is required")
    }
    

    await rideModel.findOneAndUpdate({
_id:rideId
    },
{
    status:'accepted',
    captain:captain._id
}
)

const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp');


if(!ride) throw new Error('No ride Found')

    return ride;


}

module.exports.startRide = async ({rideId, otp, captain})=>{
    if(!rideId)
        throw new Error('Ride Id is not available');

    
    await rideModel.findOneAndUpdate({_id:rideId},
        {
            status:'ongoing'
        }
    )
    const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp')
   
    if(ride.otp!=otp)
 throw new Error('Invalid OTP')

    if(!ride)  throw new Error('Internal server Error')

        return ride;
}

module.exports.endRide = async ({rideId, captain})=>{
    if(!rideId){
        throw new Error("ride Id is required")
    }
    

    await rideModel.findOneAndUpdate({
_id:rideId
    },
{
    status:'completed',
   
}
)
const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('captain');


if(!ride) throw new Error('No ride Found')

    return ride;


}