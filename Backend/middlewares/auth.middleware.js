const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res ,next)=> {
   
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.body.headers.Authorization.split(' ')[1];
   
 
    if(!token) {
        return res.status(401).json({message: 'Unauthorized No token available'});
    }
    const isBlacklisted = await blacklistTokenModel.findOne({token:token});
    
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized blacklisted'});
    }
    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
       
        
      
   
     const user  = await userModel.findOne({_id:decoded.id});
       
        
        req.user = user;
        return next();
        
    } catch (error) {
        
        return res.status(401).json({message: 'Unaurthorized others'});
    }
    

}


// middleware for captain 

module.exports.authCaptain = async (req, res ,next)=>{
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.body.headers.Authorization.split(' ')[1];
    
    if(!token) {
        
        return res.status(401).json({message: 'Unauthorized no token'});
        }
        const isBlacklisted = await blacklistTokenModel.findOne({token:token});
        if(isBlacklisted){
            return res.status(401).json({message: 'Unauthorized token black'});
            }
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
           
              
                const captain  = await captainModel.findOne({_id:decoded.id}).select("-password") 
               
              
                req.captain = captain 
                return next();
            } catch(error){
             
                return res.status(401).json({message: "Internal Server Error"});
            }
                
}