const mandrill = require('mandrill-api/mandrill');
const userModel = require('../models/users');

module.exports = {
	


	email: function(email, subject, text){
    userModel.findOne({email: email },function(err, user){
    	if(err){return console.log(err)}

    	if(user && user.notification){
    		console.log("--------------")
    		console.log("Sending email: " + subject)

	    	console.log("This user notification is true")
			mandrill_client = new mandrill.Mandrill('2-1UFpeIBHy67hD-kxSEZw');

			var raw_message = "From: esquired@space-servers.com\nTo: "+email+"\nSubject: "+subject+"\n\n"+text+"";
			var from_email = "esquired@space-servers.com";
			var from_name = "Esquired";
			var to = [email];
			var async = false;
			var ip_pool = "Main Pool";
			var send_at = false;
			var return_path_domain = 'http://space-servers.com';
			mandrill_client.messages.sendRaw({"raw_message": raw_message, "from_email": from_email, "from_name": from_name, "to": to, "async": async, "ip_pool": ip_pool, "send_at": send_at, "return_path_domain": return_path_domain},
			 function(result) {
			    console.log("Response:")
			    console.log(result);
			    
			}, function(e) {
			    // Mandrill returns the error as an object with name and message keys
			    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
			    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
			});
			console.log("--------------")

	} else {
		return console.log("This user notification is set false")
	}
    })

	}
}
