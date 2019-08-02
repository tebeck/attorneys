const express = require('express');
const router = express.Router();
const appController = require('../controllers/appearances');
const appMiddleware = require('../middlewares/appearances');
const validateMiddleware = require('../middlewares/isvalid'); // Get user ID


// router.get('/confirmed', appMiddleware.isAttorney, validateMiddleware.user, appController.getAccepted);
// router.post('/updateall', appMiddleware.isAttorney, validateMiddleware.user, appController.updateAll);

// Both roles
router.post('/getagendatab', validateMiddleware.user,appController.getAgendaTab);
router.post('/getappearancestab', validateMiddleware.user, appController.getAppearancesTab);
router.post('/getappdetail', appController.getAppDetail);

// Record Attorney
router.post('/create', appMiddleware.isAttorney, validateMiddleware.user, appController.create); // Create request
router.post('/delete', appMiddleware.isAttorney, validateMiddleware.user, appController.delete); //Delete request
router.post('/deletefile', appMiddleware.isAttorney, appController.deleteFile); //Delete documents
router.post('/update', appMiddleware.isAttorney, validateMiddleware.user, appController.update); //Update request
router.post('/getrequeststab', appMiddleware.isAttorney, validateMiddleware.user,appController.getRequestsTab); //Get requests
router.post('/acceptappearing', appMiddleware.isAttorney, validateMiddleware.user,appController.acceptAppearing); //Get requests
router.post('/rejectappearing', appMiddleware.isAttorney, validateMiddleware.user,appController.rejectAppearing); //Get requests
router.post('/finishAppearance', appMiddleware.isAttorney, appController.finishAppearance); // appearanceId (frontend)
router.post('/getbycourt', appController.getAppearanceByCourt); // appearanceId (frontend)
// Appearing Attorney
router.post('/subscribe', appMiddleware.isSeeker, appController.subscribe); // appearanceId (frontend)
router.post('/unsubscribe', appMiddleware.isSeeker, appController.unsubscribe); // appearanceId (frontend)
router.post('/completeappearance', appMiddleware.isSeeker, validateMiddleware.user,appController.completeAppearance); //Get requests



// router.post('/requests', appMiddleware.isAttorney, validateMiddleware.user, appController.getRequests);
// router.get('/' ,appController.get);

module.exports = router;