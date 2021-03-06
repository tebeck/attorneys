const userModel = require('../models/users');
const tokenModel = require('../models/token');
const recoverPasswordModel = require('../models/recoverPassword');
const crypto = require('crypto');

const urlFrontend = process.env.URL_FRONTEND;

const saltRounds = 10;

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const Logger = require("cute-logger")
const send = require('../services/sendmail');


module.exports = {

  register: function(req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, user) {

      if (user) return res.status(400).send({ message: 'The email address you have entered is already associated with another account.' });
      user = new userModel({ 
          firstName: req.body.firstName, lastName: req.body.lastName, lawFirm: req.body.lawFirm,
          stateBar: req.body.stateBar, officePhone: req.body.officePhone, mobilePhone: req.body.mobilePhone,
          email: req.body.email, mailingAddress: req.body.mailingAddress, password: req.body.password,
          profilePicture: req.body.profilePicture, creditCard: req.body.creditCard, policy: req.body.policy,
          notification: req.body.notification, insurancePolicy: req.body.insurancePolicy, termsConditions: req.body.termsConditions,
          isSeeker: req.body.isSeeker, isAttorney: req.body.isAttorney, rating: req.body.rating, reviewTotal: req.body.reviewTotal,
          reviews: req.body.reviews, isVerified: req.body.isVerified, isDisabled: req.body.isDisabled
      });

        user.save(function (err) {
          if (err) { return res.status(500).send({ message: err.message }); 
        }

        let token = new tokenModel({
          _userId: user._id,
          token: crypto.randomBytes(16).toString('hex')
        });
         
        token.save(function (err) {
          if (err) { return res.status(500).send({ message: err.message }); 
        }

         const subject = 'Account Verification Token'
         const text = 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n';

         Logger.log("REGISTER: Sending email")
         if (!process.env.EMAIL_ENV==='sandbox'){
           send.email(user.email, subject, text)
          return res.status(200).send('A verification email has been sent to ' + user.email + '=> ' + token.token) 
         } else { 
           return res.status(200).send('Test token => ' + token.token); 
         }
        
        });
      });

    });
  },

  authenticate: function(req, res, next) {
    userModel.findOne({email:req.body.email}, function(err, user){

      if (err) { return res.status(500).send({ message: err.message }); }
      if (!user) { return res.status(401).send({ message: "User not found"}); }
      if (!user.isVerified) { return res.status(401).send({ message: "Your account has not been verified"}); } 
      if (user.isDisabled){ return res.status(401).send({ message: "User disabled" }); }
      
      if(bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({ _id:user._id }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_LIFE })
          return res.status(200).send({ token: token, result: user });
      } else {
          return res.status(409).send({ message: "Incorrect user/password", result: user });
      }
    });
  },

  confirmation: function(req, res, next){
     tokenModel.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', message: 'We were unable to find a valid token. Your token my have expired.' });
   
          // If we found a token, find a matching user
          userModel.findOne({ _id: token._userId }, function (err, user) {
              if (!user) return res.status(400).send({ message: 'We were unable to find a user for this token.' });
              if (user.isVerified) return res.status(400).send({ type: 'already-verified', message: 'This user has already been verified.' });

              user.updateOne({isVerified: true},function (err) {
                  if (err) { return res.status(500).send({ message: err.message }); }
                  res.status(200).send({message: "The account has been verified. Please log in.", redirect: req.headers.host + "/login"});
              });
          });
     });
  },

  getProfile: function(req, res, next){
     userModel.findOne({ _id: req.body.userId }, function (err, user) {
       if (err) {return res.status(500).send({ message: err.message })}
         return res.status(200).send({data: user})
     })

   },



   recoverPassword: function(req, res, next){
     userModel.findOne({email: req.body.email}, function( err, user){
       if(err) {return res.status(500).send({message: err.message})}
       if(!user) {return res.status(401).send({message: "No user found"})}

          let recoverPassword = new recoverPasswordModel({
            _userId: user._id,
            token: crypto.randomBytes(19).toString('hex')
          });
       
          recoverPassword.save(function (err) {
            if (err) { return res.status(500).send({ message: err.message });  
          }

          const link = req.headers.host + '/confirmation/' + recoverPassword.token;
          console.log(link)
         if (!process.env.EMAIL_ENV==='sandbox'){


           const subject = 'Recover password';
           const text = 'Please click this '+ link + ' to recover your password';
           
           
           send.email(user.email, subject, text)
             return res.status(200).send({message: "Mail sent, check your inbox"})
         } else {

             return res.status(200).send(
               {'message': "Click this link to recover your password",
                 'link_frontend': process.env.URL_FRONTEND + '/createnewpassword/?token=' + recoverPassword.token
               }); 
         }
     })
   })
  },

    recoverPasswordConfirm: function(req, res,next){
      recoverPasswordModel.findOne({ token: req.params.token }, function( err, token ){
        if (!token) return res.status(409).send({ type: 'not-recovered', message: 'We were unable to find a valid token. Your token my have expired.' });

          userModel.findOne({ _id: token._userId }, function (err, user) {
              if (!user) return res.status(409).send({ message: 'We were unable to find a user for this token.' });
               var string = encodeURIComponent(user.email);

               return res.status(200).send({message: "Now change password", token: req.params.token})
              // return res.status(302).redirect('/users/changepassword/?email=' + string);
          });
      })
    },

    changepassword: function(req, res, next){

      const getToken = req.params;
      const payload = req.body;

      console.log("llego")

      recoverPasswordModel.findOne({ token: JSON.parse(getToken.token).confirmationCode }, function( err, token ){
        if (!token) return res.status(409).send({ type: 'not-recovered', message: 'We were unable to find a valid token. Your token my have expired.' });

      userModel.findOne({_id: token._userId}, function(err, user){
        if (!user) return res.status(409).send({ message: 'We were unable to find a user for this token.' });
        user.password = JSON.parse(getToken.token).password;
        
        user.save()
          .then( user => {
            return res.status(200).send({message: "Password changed successfully", data: user})  
          })
          .catch( err => {
            return res.status(401).send({message: "Cant update database", data: err})
          })  

      });  

    }) //Token validation again

    },



    sendMail: function(req, res, next){
      const subject = "Email contact"
      const text = "Text for email contact"

        send.email(req.body.email, subject || req.body.subject, text || req.body.text)
        console.log("email")
      return res.status(200).send({message: "Email sent", email: req.body.email,subject:req.body.subject, text: req.body.text })
    }

}
