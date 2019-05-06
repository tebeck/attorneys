const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  email: {
    type: String,
    required: true
  },
  firm_name: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  contact_info: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  routing_number: {
    type: Number,
    required: false
  },
  account_number: {
    type: Number,
    required: false
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
