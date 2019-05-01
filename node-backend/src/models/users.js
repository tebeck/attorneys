const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  email: {
    type: String,
    required: false
  },
  firm_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contact_info: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  routing_number: {
    type: Number,
    required: true
  },
  account_number: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
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
