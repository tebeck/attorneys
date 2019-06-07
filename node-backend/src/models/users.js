const Logger = require("cute-logger")
const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  lawFirm: {
    type: String,
    required: true
  },
  stateBar: {
    type: Number,
    required: true
  },
  officePhone: {
    type: String,
    required: true
  },
  mobilePhone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mailingAddress: [
    {
      streetAddrOne: {
        type: String,
        required: false
      },
      streetAddrTwo: {
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
      },
      required:false
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
    required: true
  },
  policy: {
    type: Number,
    required: true
  },
  notification: {
    type: Boolean,
    default: false,
    required: false
  },
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
  reviewTotal: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      seekerId: {
        type: String,
        required: true,
        default: ''
      },
      appearanceId: {
        type: String,
        required: true,
        default: ''
      },
      postulationId: {
        type: String,
        required: true,
        default: ''
      },
      comment: {
        type: String,
        required: true,
        default: ''
      },
      rating: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ],
  isVerified: { 
    type: Boolean,
    default: false 
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
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
