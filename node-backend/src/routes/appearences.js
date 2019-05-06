const express = require('express');
const router = express.Router();
const appController = require('../controllers/appearences');
const appMiddleware = require('../middlewares/appearences');

router.get('/' ,appController.get);

router.get('/confirmed', appMiddleware.isAttorney, appController.getAccepted)
router.post('/create', appMiddleware.isSeeker, appController.create);
router.post('/update',  appMiddleware.isSeeker, appController.update);
router.post('/delete', appMiddleware.isSeeker, appController.delete);
router.get('/seekers',appMiddleware.isSeeker ,appController.getOwn);

// router.post('/find',appController.find);

// router.post('/postulate', appMiddleware.isAttorney, appController.postulate);

module.exports = router;