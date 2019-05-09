const Logger = require("cute-logger")
const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var admins = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
},{
    collection: 'admins', timestamps: true
});

// hash user password before saving into database
admins.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  Logger.log("MODEL: Hasing password")
  next();
});
module.exports = mongoose.model('admins', admins);
