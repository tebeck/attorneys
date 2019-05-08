const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const adminMiddleware = require('../middlewares/admin');

router.post('/signup', adminMiddleware.adminRoute, adminController.signup);
router.post('/singin', adminMiddleware.adminRoute, adminController.signin);
router.post('/create', adminMiddleware.adminRoute, adminController.make);
router.get('/attorneys', adminMiddleware.adminRoute, adminController.getAttorneys);
router.get('/seekers', adminMiddleware.adminRoute, adminController.getSeekers);
router.get('/appearences', adminMiddleware.adminRoute, adminController.getAppearances);


module.exports = router;
