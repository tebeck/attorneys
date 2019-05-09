const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admins');
const adminMiddleware = require('../middlewares/admins');

router.post('/register', adminMiddleware.adminRoute, adminController.register);
router.post('/authenticate', adminMiddleware.adminRoute, adminController.authenticate);
router.post('/disableUser', adminMiddleware.adminRoute, adminController.disableUser);


router.post('/create', adminMiddleware.adminRoute, adminController.make);
router.get('/attorneys', adminMiddleware.adminRoute, adminController.getAttorneys);
router.get('/seekers', adminMiddleware.adminRoute, adminController.getSeekers);
router.get('/appearences', adminMiddleware.adminRoute, adminController.getAppearances);


module.exports = router;
