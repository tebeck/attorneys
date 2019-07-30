const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe');
const userMiddleware = require('../middlewares/users');

router.post('/getstripeinfo', userMiddleware.isValid, stripeController.getStripeInfo);

router.post('/storestripetoken', userMiddleware.isValid, stripeController.storeToken);

router.post('/createcharge', userMiddleware.isValid, stripeController.createCharge);

module.exports = router;