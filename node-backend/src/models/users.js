const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
var users = new Schema({
  isAdmin: {
    type: Boolean,
    default: false
  },
  isGuest: {
    type: Boolean,
    default: true
  },
  isDeveloper: {
    type: Boolean,
    default: false
  },
  isSeeker: {
    type:Boolean,
    default: false
  },
  isAttorney: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0
  },
  review_total: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      userId: Number,
      appearanceId: Number,
      comment: String,
      rating: Number
    }
  ]

},{
    collection: 'users', timestamps: true
});

// hash user password before saving into database
users.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
module.exports = mongoose.model('users', users);
