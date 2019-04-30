const config = require('../config/config')
const jwt = require('jsonwebtoken');

module.exports = {

user: function(req, res, next) { //Verify if x-access-token exists and its valid.
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