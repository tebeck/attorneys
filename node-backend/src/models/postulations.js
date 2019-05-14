var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postulations = new Schema({
  appearanceId: {
    type: String,
    required: true
  },
  attorney: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    required: false
  }
},{
    collection: 'postulations', timestamps: true
});

module.exports = mongoose.model('postulations', postulations);
