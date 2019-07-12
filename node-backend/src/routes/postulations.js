const express = require('express');
const router = express.Router();
const postController = require('../controllers/postulations');
const appMiddleware = require('../middlewares/appearances');


router.post('/', postController.get);

router.post('/create', appMiddleware.isSeeker, postController.create); // appearanceId (frontend)
router.post('/cancel', appMiddleware.isSeeker, postController.cancel);

router.post('/upload', appMiddleware.isSeeker, postController.uploadProof);
router.post('/completed', appMiddleware.isSeeker, postController.completed);
router.post('/rateattorney', appMiddleware.isSeeker, postController.rateAttorney);

router.post('/accept', appMiddleware.isAttorney, postController.accept);
router.post('/reject', appMiddleware.isAttorney, postController.reject);

module.exports = router;