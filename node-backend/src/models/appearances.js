var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appearances = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: 'pending',
    required: false
  },
  createdBy: {
    type: String,
    required: true
  },
  attachment: {
    type: String,
    required: false
   }
},{
    collection: 'appearances', timestamps: true
});
//'pending', 'confirmed', 'ended', 'canceled',
module.exports = mongoose.model('appearances', appearances);
