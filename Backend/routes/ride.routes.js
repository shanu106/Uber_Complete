const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const rideController = require('../controllers/ride.controller')
const authMiddleWare = require('../middlewares/auth.middleware');
router.post('/create', 
    authMiddleWare.authUser,
    
    body('pickUp').isString().isLength({min:3}).withMessage('Invalid pickup Point'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination Point'),
    body('vehicleType').isString().isIn(['auto', 'car','motorcycle']).isLength({min:3}).withMessage('Invalid vehicle type'),
    
    rideController.createRide

)
router.get('/get-fare',
   
    query('pickUp').isString().isLength({min:3}).withMessage('Invalid pickup Point'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination Point'),
    rideController.getFare
)
router.post('/confirm',
    
    authMiddleWare.authCaptain,
    body('body.rideId').isLength({min:24,max:24}).withMessage('Invalid ride Id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleWare.authCaptain,
    query('otp').isLength({min:6,max:6}).withMessage('Invalid message'),
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleWare.authCaptain,
    body('body.rideId').isLength({min:24,max:24}).withMessage('Invalid Ride Id'),
    rideController.endRide
)

module.exports = router;