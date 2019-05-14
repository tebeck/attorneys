var nodemailer = require('nodemailer');

module.exports = {
	
	email: function(email, host, token){

	   let transporter = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: process.env.GOOGLE_ACCOUNT, pass: process.env.GOOGLE_PASSWORD } });
       let mailOptions = { from: 'no-reply@nodeapp.com', to: email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/confirmation\/' + token + '.\n' };
              
         transporter.sendMail(mailOptions, (err, info) => {
    		console.log(info.envelope);
    		console.log(info.messageId)
    	})
	}
}