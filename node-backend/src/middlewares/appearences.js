const usersModel = require('../models/users');

module.exports = {
	isSeeker: function(req, res, next) {
		usersModel.findById(req.body.userId, function(err, user){
			if(err){
				return res.json({state: "Error", message: err})
			}
			if(user.isSeeker || user.isAdmin){
				return next();
			} else {
				return res.status(401).send({Error: 'Only seekers can manipulate appearences' });
			}
		}
	)},

	isAttorney: function(req, res, next){
		usersModel.findById(req.body.userId, function(err, user){
			if(err){
				return res.json({state: "Error", message: err})
			}
			if(user.isAttorney || user.isAdmin){
				return next();
			} else {
				return res.status(401).send({Error: 'Only attorneys can postulate to an appearence' });
			}
		})
	}
 }
