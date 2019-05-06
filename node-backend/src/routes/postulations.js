const express = require('express');
const router = express.Router();
const postController = require('../controllers/postulations');
const appMiddleware = require('../middlewares/appearences');

router.post('/',appMiddleware.isAttorney ,postController.get);
router.post('/postulate', appMiddleware.isAttorney, postController.postulate);
router.post('/delete', appMiddleware.isAttorney, postController.delete);

module.exports = router;