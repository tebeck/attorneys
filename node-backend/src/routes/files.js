var express = require('express');
const upload = require('../services/file-upload');
var app = express();
var router = express.Router();
const singleUpload = upload.single('avatar');
const multiUpload = upload.array('avatar' );

router.post('/upload', function(req, res) {
  
const userId = req.body.userId;

  singleUpload(req, res, function(err, some) {
    
    if (err) {
      console.error(err);
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }
    console.log(req.file)
  	return res.json({status: 200, location: req.file.location, _id: userId})
    
  });

  
})


router.post('/multiupload', function(req, res) {

  const userId = req.body.userId;

  multiUpload(req, res, function(err, some) {
    
    if (err) {
      console.error(err);
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }
    console.log(req.files)
    console.log(userId)
  	return res.json({status: 200, location: req.files, _id: userId}) // No encuentra id del user! no lo mete en la respuesta.
    
  });

  
})

module.exports = router;
