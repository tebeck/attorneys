var nodemailer = require('nodemailer');

module.exports = {
	
	email: function(email,subject,text){
	   let transporter = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: process.env.GOOGLE_ACCOUNT, pass: process.env.GOOGLE_PASSWORD } });
       let mailOptions = { from: 'no-reply@nodeapp.com', to: email, subject: subject, text: 'Hello,\n\n' + text };
        if (!process.env.EMAIL_ENV==='sandbox'){
         transporter.sendMail(mailOptions, (err, info) => { console.log(info) })
     	}
	}
}