const config = require('../config/config')
const jwt = require('jsonwebtoken');

module.exports = {

user: function(req, res, next) {
  jwt.verify(req.headers['x-access-token'], config.secret, function(err, decoded) {
    if (err) {
      return res.json({state:"Error", message: err.message, data:null});
    }else{
      req.body.userId = decoded._id;
      next();
    }
  });
}

}