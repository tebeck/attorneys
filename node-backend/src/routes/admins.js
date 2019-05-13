const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admins');
const adminMiddleware = require('../middlewares/admins');

router.post('/register',  adminController.register);
router.post('/authenticate',  adminController.authenticate);
router.post('/create', adminMiddleware.adminRoute, adminController.make);

router.post('/disableuser', adminMiddleware.adminRoute, adminController.disableUser);
router.post('/deleteuser', adminMiddleware.adminRoute, adminController.deleteUser);
router.post('/getusers', adminMiddleware.adminRoute, adminController.getUsers);

router.get('/attorneys', adminMiddleware.adminRoute, adminController.getAttorneys);
router.get('/seekers', adminMiddleware.adminRoute, adminController.getSeekers);
router.get('/appearences', adminMiddleware.adminRoute, adminController.getAppearances);


module.exports = router;
