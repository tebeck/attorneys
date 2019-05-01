const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appearence = new Schema({
  email: {
    type: String,
    required: false
  },
  firm_name: {
    type: String,
    required: true
  }
},{
    collection: 'users', timestamps: true
});

// hash user password before saving into database
users.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
module.exports = mongoose.model('users', users);
