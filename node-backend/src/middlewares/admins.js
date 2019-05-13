const adminModel = require('../models/admins');

module.exports = {
	adminRoute: function(req, res, next) {
		adminModel.findById(req.body.userId, function(err, user){
			if(err){
				return res.status(404).send({message: err})
			}
			if(user && user.isAdmin){
				return next();
			} else {
				return res.status(401).send({Error: "Not authorized" });
			}
		}
	)}
 }
