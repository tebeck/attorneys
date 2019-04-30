const userModel = require('../models/users');
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

}