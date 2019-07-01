const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admins');
const adminMiddleware = require('../middlewares/admins');

router.post('/register',  adminController.register);
router.post('/authenticate',  adminController.authenticate);
router.post('/create', adminMiddleware.adminRoute, adminController.make);

// SEEKRS
router.post('/enable', adminController.enableSeeker);
router.post('/reject', adminController.rejectSeeker);

router.post('/disableuser', adminMiddleware.adminRoute, adminController.disableUser);
router.post('/deleteuser', adminMiddleware.adminRoute, adminController.deleteUser);
router.post('/getusers', adminController.getUsers);

router.get('/attorneys', adminMiddleware.adminRoute, adminController.getAttorneys);
router.get('/seekers', adminMiddleware.adminRoute, adminController.getSeekers);
router.get('/appearances', adminMiddleware.adminRoute, adminController.getAppearances);


module.exports = router;
