const usersModel = require('../models/users');

module.exports = {
	isSeeker: function(req, res, next) {
		usersModel.findById(req.body.userId, function(err, user){
			if(err){
				return res.status(500).send({state: "Error", message: err})
			}
			if(user.isSeeker || user.isAdmin){
				return next();
			} else {
				return res.status(401).send({Error: 'You are not seeker' });
			}
		}
	)},

	isAttorney: function(req, res, next){
		usersModel.findById(req.body.userId, function(err, user){
			if(err){
				return res.status(500).send({state: "Error", message: err})
			}
			if(user.isAttorney || user.isAdmin){
				return next();
			} else {
				return res.status(401).send({Error: 'You are not attorney' });
			}
		})
	}
 }
