const express = require('express');
const router = express.Router();
const { body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const captainModel = require('../models/captain.model');
const captainController = require('../controllers/captain.controller');

router.post('/create', [
    body('fullname').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
    body('color').isEmpty().withMessage('Vehicle colour is required'),
    body('vehicleType').isEmpty().withMessage('vehicle Type is required'),
    body('plateNumber').isEmpty().withMessage('Vehicle Registration Number is required'),
    body('capacity').isEmpty().withMessage('vehicle capacity is required')
    
],


captainController.registerCaptain
);

router.post('/loginCaptain', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
    ], 
    captainController.loginCaptain
)

// get captain profile 

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile );

router.get('/logout', authMiddleware.authCaptain, captainController.logoutcaptain);

module.exports = router;