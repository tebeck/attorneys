const express = require('express');
const router = express.Router();
const appController = require('../controllers/appearances');
const appMiddleware = require('../middlewares/appearances');

router.get('/' ,appController.get);

router.post('/create', appMiddleware.isAttorney, appController.create);
router.post('/update',  appMiddleware.isAttorney, appController.update);
router.post('/delete', appMiddleware.isAttorney, appController.delete);

router.get('/confirmed', appMiddleware.isAttorney, appController.getAccepted)

// router.get('/seekers', appController.getOwn);
// router.post('/find',appController.find);
// router.post('/postulate', appMiddleware.isAttorney, appController.postulate);

module.exports = router;