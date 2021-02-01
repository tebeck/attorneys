const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe');
const userMiddleware = require('../middlewares/users');

router.post('/getstripeinfo', userMiddleware.isValid, stripeController.getStripeInfo);
router.post('/createnewcreditcard', userMiddleware.isValid, stripeController.createNewCreditCard);
router.post('/setdefaultcard', userMiddleware.isValid, stripeController.setDefaultCard);
router.post('/retrivecustomer', userMiddleware.isValid, stripeController.retriveCustomer);
router.post('/createcharge', userMiddleware.isValid, stripeController.createCharge);

module.exports = router;