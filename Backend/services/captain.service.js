const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    fullname, email, password, vehicleType, color, plateNumber, capacity,
}) =>{
    


    if(!fullname || !email || !password || !vehicleType || !color || !plateNumber || !capacity){
        throw new Error('All fields are required');
    }

   
    const captain = await captainModel.create({
        fullname, email,password, 
        vehicle:
        {vehicleType, color, plateNumber, capacity}
    })
    return captain;
}