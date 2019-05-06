var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appearences = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
    collection: 'appearences', timestamps: true
});
//'pending', 'confirmed', 'ended', 'canceled',
module.exports = mongoose.model('appearences', appearences);
