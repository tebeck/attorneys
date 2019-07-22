var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appearances = new Schema({
  courtHouse: {
    type: String,
    required: true
  },
  areaOfLaw: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  caseName: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  hearingDate: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  clientPresent: {
    type: Boolean,
    required: true
  },
  lateCall: {
    type: Boolean,
    required: true
  },
  documents: {
     type: Array,
     required: false
    },
  status: {
    type: String,
    default: 'pending',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  additionalComments: {
    type: String,
    required: false
  },
  attorneyId: {
    type: String,
    required: true
  },
  subscription: {
   seekerId: {
    type: String,
    required: false,
    default: "",
  },
   date: {
     type: Date,
     required: false
   },
   veredictDocs:{
     type: Array,
     required: false
   },
   information:{
     type: String,
     required: false
   }
  }

},{
    collection: 'appearances', timestamps: true
});
//'pending', 'confirmed', 'ended', 'canceled',
module.exports = mongoose.model('appearances', appearances);
