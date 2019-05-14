const express = require('express');
const router = express.Router();
const postController = require('../controllers/postulations');
const appMiddleware = require('../middlewares/appearances');

router.get('/', postController.get);

router.post('/create', appMiddleware.isSeeker, postController.create); // appearanceId (frontend)
router.post('/cancel', appMiddleware.isSeeker, postController.cancel);

router.post('/accept', appMiddleware.isAttorney, postController.acceptOrReject);
router.post('/reject', appMiddleware.isAttorney, postController.acceptOrReject);

module.exports = router;