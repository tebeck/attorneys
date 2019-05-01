const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const adminMiddleware = require('../middlewares/admin');

router.post('/create', adminMiddleware.adminRoute, adminController.makeAdmin);
router.post('/attorneys', adminMiddleware.adminRoute, adminController.getAttorneys);
router.post('/seekers', adminMiddleware.adminRoute, adminController.getSeekers);
router.post('/appearances', adminMiddleware.adminRoute, adminController.getAppearances);


module.exports = router;
