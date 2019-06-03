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
  goal: {
    type: String,
    required: true
  },
  hearingDate: {
    type: Date,
    required: true
  },
  time: {
    type: Date,
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
    type: String,
    default:"no docs",
    required: true
  },
  status: {
    type: String,
    default: 'published',
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
  }

},{
    collection: 'appearances', timestamps: true
});
//'pending', 'confirmed', 'ended', 'canceled',
module.exports = mongoose.model('appearances', appearances);
