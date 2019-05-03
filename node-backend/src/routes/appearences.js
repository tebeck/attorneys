const express = require('express');
const router = express.Router();
const appController = require('../controllers/appearences');
const appMiddleware = require('../middlewares/appearences');

router.get('/', appMiddleware.isSeeker ,appController.get);
router.get('/confirmed', appMiddleware.isAttorney, appController.getAccepted)
router.post('/create', appMiddleware.isSeeker, appController.create);
router.post('/update',  appMiddleware.isSeeker, appController.update);
router.post('/delete', appMiddleware.isSeeker, appController.delete);
// router.post('/find',appController.find);

// router.post('/postulate', appMiddleware.isAttorney, appController.postulate);

module.exports = router;