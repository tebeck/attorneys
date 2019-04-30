const usersModel = require('../models/users');

module.exports = {
	adminRoute: function(req, res, next) {
		usersModel.findById(req.body.userId, function(err, user){
			if(err){
				return res.json({state: "Error", message: err})
			}
			if(user.isAdmin){
				return next();
			} else {
				return res.status(401).send({Error: 'Not authorized' });
			}
		}
	)}
 }
