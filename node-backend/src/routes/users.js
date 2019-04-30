const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const userMiddleware = require('../middlewares/users');
// const validateMiddleware = require('../middlewares/validate');
// const authMiddleware = require('../middlewares/authorization');

router.post('/register',userMiddleware.exists, userController.register);
router.post('/authenticate', userController.authenticate);
// router.post('/isvalid', validateMiddleware.uservalid)

module.exports = router;