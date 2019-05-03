var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postulations = new Schema({
  appearenceId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'confirmed',
    required: false
  }
},{
    collection: 'postulations', timestamps: true
});

module.exports = mongoose.model('postulations', postulations);
