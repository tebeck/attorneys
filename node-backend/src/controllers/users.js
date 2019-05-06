const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = {

register: function(req, res, next) { // Agregar account number .. etc
  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password, isAttorney: req.body.isAttorney, isSeeker: req.body.isSeeker }, 
    function (err, result) {
      if (err) {
        return res.json({state:"Error", message: err.message, data:null});
      }
      else {
        return res.json({state: 200, message: "User added", data: result})
      }
  })
},

authenticate: function(req, res, next) {
  userModel.findOne({email:req.body.email}, function(err, user){
      if (err) {
        return res.json({state:"Error", message: err.message, data:null});
      }      
      if (!user) {
        var err = new Error('User not found.');
        err.state = 401;
        const response = {state: err.state, message: "User not found", data: null }
        return res.json({response});
      }       
      if(bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({_id:user._id }, config.secret, { expiresIn: config.tokenLife})
        const refreshToken = jwt.sign({_id:req.body.email}, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
        const response = { "state": 200, "token": token, user }
        return res.json({response});
      } else {
        console.log(user )
        var err = new Error('Incorrect Email/Password');
        err.state = 409;
        const response = {state: err.state, message: "Incorrect email/password"}
        return res.json({response});
      }
     });
},

makeAdmin: function(req, res, next){
    userModel.findById(req.params.id, function(err, user) {
    if (!user)
      return next(new Error('No user found'));
    else {
      
      user.isAdmin = true;
      user.save().then(user => {
          res.json('Updated');

      })
      .catch(err => {
            res.status(400).send("Unable to update");
      });
    }
  });
},

}