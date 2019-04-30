const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const adminMiddleware = require('../middlewares/admin');

router.post('/create', adminMiddleware.adminRoute, adminController.makeAdmin);

module.exports = router;
