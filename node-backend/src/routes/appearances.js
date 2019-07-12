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
router.post('/updateall', appMiddleware.isAttorney, validateMiddleware.user, appController.updateAll);

router.post('/agenda', appController.getAgenda);

// Record Attorney
router.post('/deletedoc', appMiddleware.isAttorney, appController.deleteSingleDocument);

// Appearing Attorney
router.post('/subscribe', appMiddleware.isSeeker, appController.subscribe); // appearanceId (frontend)
router.post('/unsubscribe', appMiddleware.isSeeker, appController.unsubscribe); // appearanceId (frontend)
router.post('/completed', appMiddleware.isSeeker, appController.completed); // appearanceId (frontend)


module.exports = router;