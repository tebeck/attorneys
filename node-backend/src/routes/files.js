var express = require('express');
const upload = require('../services/file-upload');

var app = express();
var router = express.Router();
const singleUpload = upload.single('Image')

router.post('/upload', function(req, res) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      console.error(err);
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }

    return res.json({'imageUrl': req.file.location});
  });
})

module.exports = router;
