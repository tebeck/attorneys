const express = require('express');
const router = express.Router();
const appController = require('../controllers/appearances');
const appMiddleware = require('../middlewares/appearances');
const validateMiddleware = require('../middlewares/isvalid');

router.get('/' ,appController.get);
router.post('/create', appMiddleware.isAttorney, validateMiddleware.user, appController.create);
router.post('/delete', appMiddleware.isAttorney, validateMiddleware.user, appController.delete);
router.post('/update', appMiddleware.isAttorney, validateMiddleware.user, appController.update);
router.get('/confirmed', appMiddleware.isAttorney, validateMiddleware.user, appController.getAccepted);
router.post('/requests', appMiddleware.isAttorney, validateMiddleware.user, appController.getRequests);
router.post('/getspecific', appController.getSpecific);

// router.get('/seekers', appController.getOwn);
// router.post('/find',appController.find);
// router.post('/postulate', appMiddleware.isAttorney, appController.postulate);

module.exports = router;