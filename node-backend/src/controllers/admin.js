const userModel = require('../models/users');
const appModel = require('../models/appearences');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = {

makeAdmin: function(req, res, next){
    userModel.findById(req.body.id, function(err, user) {
    if (!user)
      return next(new Error('No user found'));
    if(user.isAdmin)
      return res.json({state: 200, message:"This user is already admin", data: user})
    else {
      user.isAdmin = true;
      user.save().then(user => {
        return res.json({state: 200, message: "User updated", data: user});
      })
      .catch(err => {
            res.status(400).send("Unable to update");
      });
    }
  });
},

getAttorneys: function(req, res, next){

  userModel.find({isAttorney: {$eq: true}}, function(err, result) {
      if (err){
        return res.json({status: "Error", message: err});
      } else {
        return res.json({status: 200, data: result});
      }
  })   

},
getSeekers: function(req, res, next){

  userModel.find({isSeeker: {$eq: true}}, function(err, result) {
      if (err){
        return res.json({status: "Error", message: err});
      } else {
        return res.json({status: 200, data: result});
      }
  })   

},
getAppearances: function(req, res, next){ // Agregar en el modelo

  appModel.find(function(err, result) {
      if (err){
        return res.json({status: "Error", message: err});
      } else {
        return res.json({status: 200, data: result});
      }
  })   

},

}