const userModel = require('../models/users');
const appModel = require('../models/appearences');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = {

make: function(req, res, next){
    userModel.findById(req.body.id, function(err, user) {
    if (!user)
      return res.status(404).send({message: "No user found", user: user});
    if(user.isAdmin)
      return res.status(200).send({message:"This user is already admin", data: user})
    else {
      user.isAdmin = true;
      user.save().then(user => {
        return res.status(200).send({message: "User updated", data: user});
      })
      .catch(err => {
            res.status(400).send("Unable to update");
      });
    }
  });
},

 register: function(req, res, next){
   
 },
 authenticate: function(req, res, next){

 },

getAttorneys: function(req, res, next){

  userModel.find({isAttorney: {$eq: true}}, function(err, result) {
      if (err){
        return res.json({status: "Error", message: err});
      } else {
        return res.status(200).send({data: result});
      }
  })   

},
getSeekers: function(req, res, next){

  userModel.find({isSeeker: {$eq: true}}, function(err, result) {
      if (err){
        return res.json({status: "Error", message: err});
      } else {
        return res.status(200).send({data: result});
      }
  })   

},
getAppearances: function(req, res, next){ // Agregar en el modelo

  appModel.find(function(err, result) {
      if (err){
        return res.json({status: "Error", message: err});
      } else {
        return res.status(200).send({data: result});
      }
  })   

},

}