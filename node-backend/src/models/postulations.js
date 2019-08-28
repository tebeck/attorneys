var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postulations = new Schema({
  appearanceId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  attorneyId: {
    type: String,
    required: true,
  },
  seekerId: {
    type: String,
    required: false
  }
},{
    collection: 'postulations', timestamps: true
});
// pending, applied, accepted, completed, finished, rated.
module.exports = mongoose.model('postulations', postulations);
