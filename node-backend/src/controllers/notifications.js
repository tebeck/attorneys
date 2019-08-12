const userModel = require('../models/users');
const send = require('../services/sendmail');

module.exports = {

	get: function(res, req, next){
		return "Notification"
	},

	attorneyNotification: function (res, req, next){
		userModel.findById(req.body.userId, function(err, user){
			const subject = "Reminder";
			const text = "Appearance has been completed";
			send.email(user.email, subject, text);
		});
	},

	seekerNotification: function (res, req, next){
		userModel.findById(req.body.userId, function(err, user){
			const subject = "Reminder";
			const text = "Please upload the proof of completion of the appearance";
			send.email(user.email, subject, text);
		});		
	
	}
}