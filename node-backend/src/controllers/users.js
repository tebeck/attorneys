const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = {

register: function(req, res, next) {
  userModel.create({ name: req.body.name,lastname: req.body.lastname, email: req.body.email, password: req.body.password }, 
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
        return res.json({state: err.state, message: "User not found", data: null });
      }       
      if(bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({_id:user._id }, config.secret, { expiresIn: config.tokenLife})
        const refreshToken = jwt.sign({_id:req.body.email}, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
        const response = { "state": 200, "token": token, "refreshToken": refreshToken, "user": user.name, "email": user.email, "message": "User logged in", "_id": user.id }
        return res.json({response});
      } else {
        console.log(user )
        var err = new Error('Incorrect Email/Password');
        err.state = 409;
        return res.json({state: err.state, message: "Incorrect email/password" });
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