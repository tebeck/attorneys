const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
module.exports = {
 
 exists: function(req, res, next) {
   userModel.findOne({email:req.body.email}, function(err, user){
    if (err) {
      return res.json({state:"Error", message: err.message, data:null});
    }
    if(user){ // Encontro un usuario con el mismo email.
    	  let err = new Error("User already exists"+ user);
    	  err.state = 409; // Conflict: user exists
      return res.json({state: err.state, message: "Email in use"}) // Corta aca en mw
    } else{ // No encontro usuario con mismo email
      next(); // Go to controller,
    }
 });
 }

}