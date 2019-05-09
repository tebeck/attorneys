const users = require('../models/users');
const tokenModel = require('../models/token');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const Logger = require("cute-logger")


module.exports = {

register: function(req, res, next) {

  users.findOne({ email: req.body.email }, function (err, user) {

    if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });

    user = new users({ 
        firstName: req.body.firstName, lastName: req.body.lastName, lawFirm: req.body.lawFirm,
        stateBar: req.body.stateBar, officePhone: req.body.officePhone, mobilePhone: req.body.mobilePhone,
        email: req.body.email, mailingAddress: req.body.mailingAddress, password: req.body.password,
        profilePicture: req.body.profilePicture, creditCard: req.body.creditCard, policy: req.body.policy,
        notification: req.body.notification, insurancePolicy: req.body.insurancePolicy, termsConditions: req.body.termsConditions,
        isSeeker: req.body.isSeeker, isAttorney: req.body.isAttorney, rating: req.body.rating, reviewTotal: req.body.reviewTotal,
        reviews: req.body.reviews, isVerified: req.body.isVerified, isDisabled: req.body.isDisabled
    });

      user.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); 
      }

      let token = new tokenModel({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex')
      });
 
      token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); 
      }

       Logger.log("REGISTER: Sending email")
       let transporter = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: process.env.GOOGLE_ACCOUNT, pass: process.env.GOOGLE_PASSWORD } });
       let mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
         
       if(!process.env.EMAIL_ENV==='sandbox'){         
         transporter.sendMail(mailOptions, function (err) {
           if (err) { return res.status(500).send({ msg: err.message }); }
             res.status(200).send('A verification email has been sent to ' + user.email + '=> ' + token.token);
          });
        } else { res.status(200).send('Test token => ' + token.token); }
      
      });
    });

  });


},

authenticate: function(req, res, next) {
  users.findOne({email:req.body.email}, function(err, user){

    if (err) { return res.status(500).send({ message: err.message }); }
    if (!user) { return res.status(401).send({ message: "User not found"}); }
    if (!user.isVerified) { return res.status(401).send({ message: "Your account has not been verified"}); } 

    if(bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ _id:user._id }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_LIFE })
        return res.status(200).send({ token: token, result: user });
    } else {
        return res.status(409).send({ msg: "Incorrect user/password", result: user });
    }
  });
},

confirmation: function(req, res, next){

   tokenModel.findOne({ token: req.params.token }, function (err, token) {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        users.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            user.updateOne({isVerified: true},function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send({message: "The account has been verified. Please log in.", redirect: req.headers.host + "/login"});
            });
        });
   });
}

}