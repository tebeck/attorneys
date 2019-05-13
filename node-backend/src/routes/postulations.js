const express = require('express');
const router = express.Router();
const postController = require('../controllers/postulations');
const appMiddleware = require('../middlewares/appearances');

router.get('/', postController.get);

router.post('/create', appMiddleware.isSeeker, postController.create); // appearanceId (frontend)
// router.post('/delete', appMiddleware.isAttorney, postController.delete);

router.post('/approve', appMiddleware.isAttorney, postController.update);
router.post('/reject', appMiddleware.isAttorney, postController.update);

module.exports = router;