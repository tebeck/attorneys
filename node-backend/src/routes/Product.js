var express = require('express');
var app = express();
var router = express.Router();
var slug = require('limax');
//Schema
var Product = require('../models/Product');

// Get Specific
router.route('/:id').get(function (req, res) {
  var id = req.params.id;
  Product.findById(id, function (err, item){
      res.json(item);
  });
});

// Get All Items
router.route('/').get(function (req, res) {
  Product.find(function (err, items){
    if(err){
      console.log(err);
    } else {
      res.json(items);
    }
  });
});

// Add item
router.route('/add').post(function (req, res) {
  console.log('body: ',req.body);
  var payload = req.body;
  if (typeof payload.title === 'string'){
    payload.slug = slug(payload.title.toLowerCase());
  }
  var item = new Product(payload);
      item.save()
    .then(item => {
    res.json('Added');
    })
    .catch(err => {
      console.error(err.message)
      res.status(400).send("unable to save to database => "+err.message);
    });
});

//  Update Specific
router.route('/update/:id').post(function (req, res) {
  Product.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.desc = req.body.desc;

      item.save().then(item => {
          res.json('Updated');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Delete Specific
router.route('/delete/:id').get(function (req, res) {
  Product.findByIdAndRemove({_id: req.params.id},
       function(err, item){
        if(err) res.json(err);
        else res.json('Deleted');
    });
});

module.exports = router;
