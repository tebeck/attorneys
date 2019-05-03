const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const adminMiddleware = require('../middlewares/admin');

router.post('/create', adminMiddleware.adminRoute, adminController.makeAdmin);
// router.get('/attorneys', adminMiddleware.adminRoute, adminController.getAttorneys);
// router.get('/seekers', adminMiddleware.adminRoute, adminController.getSeekers);
// router.get('/appearances', adminMiddleware.adminRoute, adminController.getAppearances);


module.exports = router;
