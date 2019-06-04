const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const userMiddleware = require('../middlewares/users');
const validateMiddleware = require('../middlewares/isvalid');
// const authMiddleware = require('../middlewares/authorization');

// router.post('/isvalid', validateMiddleware.user);
router.post('/isvalid', validateMiddleware.user);

router.post('/register',userMiddleware.exists, userController.register);

router.post('/authenticate', userController.authenticate);
router.get('/confirmation/:token', userController.confirmation);
router.get('/profile', userMiddleware.isValid ,userController.getProfile);

router.post('/getseekerauth', userController.getSeekerAuth)
router.post('/makeseeker', userController.makeSeeker );
router.post('/sendmail', userMiddleware.isValid, userController.sendMail);
router.post('/recoverpassword', userController.recoverPassword);
router.get('/recoverpassword/confirmation/:token', userController.recoverPasswordConfirm);
router.post('/changepassword/:token', userController.changepassword);


// router.post('/resend', userController.resendTokenPost);


module.exports = router;