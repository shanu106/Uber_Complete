const express = require('express');
const router = express.Router();

const authMiddleWare = require('../middlewares/auth.middleware');
const mapsController = require('../controllers/maps.controller');
const {getAdressCordinates} = require('../services/maps.service');
const { query } = require('express-validator');

router.get('/get-cordinates',
    query('address').isString().isLength({ min: 3 }),
     authMiddleWare.authUser,
    mapsController.getCordinates)
router.get('/get-distance',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleWare.authUser,
    mapsController.getDistanceTime
)
router.get('/get-suggestion',

    query('input').isString().isLength({min:1}),
    authMiddleWare.authUser,
    mapsController.getAutoCompleteSuggestions
)
    module.exports = router;