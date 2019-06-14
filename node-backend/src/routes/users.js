const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const userMiddleware = require('../middlewares/users');
const validateMiddleware = require('../middlewares/isvalid');

router.post('/register',userMiddleware.exists, userController.register);
router.post('/authenticate', userController.authenticate);
router.post('/recoverpassword', userController.recoverPassword);
router.get('/recoverpassword/confirmation/:token', userController.recoverPasswordConfirm);
router.post('/changepassword/:token', userController.changepassword);

router.post('/updatepassword', userController.updatePassword);
router.post('/makeseeker', userController.makeSeeker );

router.get('/confirmation/:token', userController.confirmation);
router.get('/profile', validateMiddleware.user,userController.getProfile);


// const authMiddleware = require('../middlewares/authorization');
// router.post('/resend', userController.resendTokenPost);
router.post('/sendmail',  userController.sendMail);

module.exports = router;