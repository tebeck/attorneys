const Logger = require("cute-logger")
const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  lawFirm: {
    type: String,
    required: false
  },
  stateBar: {
    type: Number,
    required: false
  },
  officePhone: {
    type: String,
    required: false
  },
  mobilePhone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  mailingAddress: [
    {
      streetAdd1: {
        type: String,
        required: false
      },
      streetAdd2: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: false
      },
      state: {
        type: String,
        required: false
      },
      zip: {
        type: String,
        required: false
      }
    }
  ],
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  creditCard: {
    type: Number,
    required: false
  },
  policy: {
    type: Number,
    required: false
  },
  notification: [
    {
      email: Boolean,
      required: false
    },
    {
      sms: Boolean,
      required: false
    },
    {
      alert: Boolean,
      required: false
    }
  ],
  insurancePolicy:{
    type: Number,
    required: true
  }, 
  termsConditions: {
    type: Boolean,
    required: false
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
  reviewTotal: {
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
  ],
  isVerified: { 
    type: Boolean,
    default: false 
  },
},{
    collection: 'users', timestamps: true
});

// hash user password before saving into database
users.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  Logger.log("MODEL: Hasing password")
  next();
});
module.exports = mongoose.model('users', users);
