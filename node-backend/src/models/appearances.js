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
  goal: {
    type: String,
    required: true
  },
  contextInformation: {
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
  status: {
    type: String,
    default: 'published',
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
