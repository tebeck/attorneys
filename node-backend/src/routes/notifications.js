const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notifications')
const appMiddleware = require('../middlewares/appearances');

router.post('/reminderaor', appMiddleware.isAttorney, notificationController.attorneyNotification);
router.post('/reminderaoa', appMiddleware.isSeeker, notificationController.seekerNotification);


module.exports = router;