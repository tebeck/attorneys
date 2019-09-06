const userModel = require('../models/users');
const tokenModel = require('../models/token');
const recoverPasswordModel = require('../models/recoverPassword');
const crypto = require('crypto');
const appearanceModel = require('../models/appearances');
const urlFrontend = process.env.URL_FRONTEND;

const saltRounds = 10;

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const Logger = require("cute-logger")
const send = require('../services/sendmail');

const notificationAlerts = require('../alerts/notification.alerts')
const mailAlerts = require('../alerts/mail.alerts')



module.exports = {

  register: function(req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, user) {

      if (user) return res.status(400).send({ message: 'The email address you have entered is already associated with another account.' });
      user = new userModel({ 
          firstName: req.body.firstName, lastName: req.body.lastName, firmName: req.body.firmName,
          stateBar: req.body.stateBar, officePhone: req.body.officePhone, mobilePhone: req.body.mobilePhone,
          email: req.body.email, mailingAddress: req.body.mailingAddress, password: req.body.password,
          profilePicture: req.body.profilePicture, creditCard: req.body.creditCard, policy: req.body.policy,
          notification: req.body.notification, insurancePolicy: req.body.insurancePolicy, termsConditions: req.body.termsConditions,
          isSeeker: req.body.isSeeker, isAttorney: req.body.isAttorney, rating: req.body.rating, reviewTotal: req.body.reviewTotal,
          reviews: req.body.reviews, isVerified: req.body.isVerified, isDisabled: req.body.isDisabled, onHold: req.body.onHold
      });

        user.save(function (err) {
          if (err) { return res.status(500).send({ message: err.message }); 
        }

           send.email(user.email, 'Welcome to Esquired!', "Thanks for signing up to keep in touch with Esquired. Please wait until your account is reviewed")
           send.email(process.env.ADMIN_EMAIL, "Esquired: Action needed" , "Hello admin! A new user has registered. "+user.email+" is pending your approve/reject action")           

           const token = jwt.sign({ _id:user._id }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_LIFE })

          return res.json({"status": "Logged in","token": token,"user": user,"status": 200,"message": "A welcome email has been sent to "+user.email });
         
        });
      });
  },

  authenticate: function(req, res, next) {
    userModel.findOne({email:req.body.email}, function(err, user){
      if (err) { return res.json({ message: err.message,status: 500 }) }
      if (!user) { return res.json({ message: notificationAlerts.USER_NOT_FOUND, status:409}) }
      if (user.onHold) { return res.json({ message: notificationAlerts.USER_ON_HOLD, status: 409}) } 
      if (user.isDisabled){ return res.json({ message: notificationAlerts.USER_DISABLED, status: 409 }) }
      if (user.status === "rejected"){return res.json({message: notificationAlerts.USER_REJECTED, status: 409})}

      if(bcrypt.compareSync(req.body.password, user.password)) {
          
           const token = jwt.sign({ _id:user._id }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_LIFE })
          

          return res.json({ token: token, result: user, status: 200 });
      } else {
          return res.json({ message: notificationAlerts.USER_INCORRECT_CREDENTIALS, result: user, status: 409 });
      }
    });
  },

  confirmation: function(req, res, next){
     tokenModel.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', message: 'We were unable to find a valid token. Your token my have expired.' });
   
          // If we found a token, find a matching user
          userModel.findOne({ _id: token._userId }, function (err, user) {
              if (!user) { return res.status(409).send({ message: notificationAlerts.USER_NOT_FOUND}) }
              if (user.isVerified) return res.status(400).send({ type: 'already-verified', message: 'This user has already been verified.' });

              user.updateOne({isVerified: true},function (err) {
                  if (err) { return res.status(500).send({ message: err.message }); }
                  res.status(200).send({message: "The account has been verified. Please log in.", redirect: req.headers.host + "/login"});
              });
          });
     });
  },

  getProfile: function(req, res, next){
     userModel.findById(req.body.userId , function (err, user) {
       if (err) {return res.status(500).send({ message: err.message })}
       if (!user) { return res.status(409).send({ message: notificationAlerts.USER_NOT_FOUND}) }
        return res.status(200).send({data: user})
       
     })

   },



makeSeeker: function(req, res, next){
  console.log(req.body)
     userModel.findById(req.body.userId, function(err, user) { 
      if (!user) { return res.status(409).send({ message: notificationAlerts.USER_NOT_FOUND}) }
      user.updateOne({isSeeker: true, areaOfLaw: req.body.areaOfLaw, onHold: true},function (err) {
          if (err) { return res.status(500).send({ message: err.message }); }

            send.email(process.env.ADMIN_EMAIL, "Esquired: Action needed", "Hello admin! This record attorney wants to be an attorney of record. "+user.email+" is pending your approve/reject action")
          return res.status(200).send({state: 200,data: user,message: "Your profile will be in revision. We will notify you when your Appearing attorney profile be accepted"});
      });
    })
},

makeAttorney: function(req, res, next){
     userModel.findById(req.body.userId, function(err, user) { 
      if (!user) { return res.status(409).send({ message: notificationAlerts.USER_NOT_FOUND}) }
      user.updateOne({isAttorney: true},function (err) {
          if (err) { return res.status(500).send({ message: err.message }); }
            send.email(process.env.ADMIN_EMAIL, "Esquired: Action needed", "Hello admin! A new appearing attorney has registered. "+user.email+" is pending your approve/reject action")
          return res.status(200).send({state: 200,message: "Now your a attorney too", data: user});
      });
    })
},



   recoverPassword: function(req, res, next){
     userModel.findOne({email: req.body.email}, function( err, user){
       if(err) {return res.status(500).send({message: err.message})}
       if(!user) {return res.status(401).send({message: notificationAlerts.USER_NOT_FOUND})}

          let recoverPassword = new recoverPasswordModel({
            _userId: user._id,
            token: crypto.randomBytes(19).toString('hex')
          });
       
          recoverPassword.save(function (err) {
            if (err) { return res.status(500).send({ message: err.message });  
          }
          
          const link = process.env.URL_FRONTEND + '/createnewpassword/?token=' + recoverPassword.token

           send.email(user.email, 'Recover password', 'Please click this '+ link + ' to recover your password')
             return res.status(200).send({message: "Mail sent, check your inbox"})

     })
   })
  },

    recoverPasswordConfirm: function(req, res,next){
      recoverPasswordModel.findOne({ token: req.params.token }, function( err, token ){
        if (!token) return res.status(409).send({ type: 'not-recovered', message: 'We were unable to find a valid token. Your token my have expired.' });

          userModel.findOne({ _id: token._userId }, function (err, user) {
              if (!user) { return res.status(409).send({ message: notificationAlerts.USER_NOT_FOUND}) }
               var string = encodeURIComponent(user.email);

               return res.status(200).send({message: "Now change password", token: req.params.token})
              // return res.status(302).redirect('/users/changepassword/?email=' + string);
          });
      })
    },

    changepassword: function(req, res, next){

      const getToken = req.params;
      const payload = req.body;

      recoverPasswordModel.findOne({ token: JSON.parse(getToken.token).confirmationCode }, function( err, token ){
        if (!token) return res.status(409).send({ type: 'not-recovered', message: 'We were unable to find a valid token. Your token my have expired.' });

      userModel.findOne({_id: token._userId}, function(err, user){
        if (!user) { return res.status(409).send({ message: notificationAlerts.USER_NOT_FOUND}) }
        user.password = JSON.parse(getToken.token).password;
        
        user.save()
          .then( user => {
            return res.status(200).send({message: "Password changed successfully", data: user})  
          })
          .catch( err => {
            return res.status(401).send({message: "Cant update database", data: err})
          })  
      });  
    }) 

    },


    updateaccountinfo: function (req, res, next){
      userModel.findById( req.body._userId , function(err, user){
        if (!user) { return res.status(409).send({ message: notificationAlerts.USER_NOT_FOUND}) }

          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.email = req.body.email;
          user.notification = req.body.notification;   
          user.profilePicture = req.body.image;    

          if(req.body.newpassword && req.body.password && req.body.confirm){
            bcrypt.compare(req.body.password, user.password, function(err, resp) {
              if(err) {return res.status(500).send({message: err.message})}
              if(!resp){ return res.json({message: notificationAlerts.USER_INCORRECT_CREDENTIALS}) }
               if(resp) { 
                bcrypt.hash(req.body.newpassword, 10, function(err, hash) {
                    user.password = hash; 
   
                    user.updateOne(user,function (err) {  
                     if (err) { return res.status(500).send({ message: err.message }); }
                       console.log("Account updated")
                       return res.status(200).send({message: notificationAlerts.USER_UPDATE_ACCOUNT})
                    });

                });
               } 
            })
          } else {
            user.updateOne(user,function (err) {  
             if (err) { return res.status(500).send({ message: err.message }); }

             return res.status(200).send({message: notificationAlerts.USER_UPDATE_ACCOUNT})
         });
          }
        


 
      });

    },

    updateprofinfo: function(req, res, next){
      userModel.findById( req.body._userId , function(err, user){
        if(err) {return res.status(500).send({message: err.message})}
        if (!user) { return res.status(409).send({ message: notificationAlerts.USER_NOT_FOUND}) }

         user.firmName = req.body.firmName;
         user.policy = req.body.policy;
         user.officePhone = req.body.officePhone;
         user.mobilePhone = req.body.mobilePhone;
         user.mailingAddress[0].streetAddrOne = req.body.streetAddrOne;
         user.creditCard = req.body.creditCard;
         user.areaOfLaw = req.body.areaOfLaw;

         user.updateOne(user,function (err) {
            if (err) { return res.status(500).send({ message: err.message }); }
            return res.status(200).send({message: notificationAlerts.USER_UPDATE_ACCOUNT})
         }); 
          
      })
    },

    rateAttorney: function( req, res, next ){
      userModel.updateOne({_id: req.body.attorneyId},
        { "$push": 
        { "reviews": { "rating": req.body.rating,"appearanceId": req.body.appId,"seekerId": req.body.seekerId },
        }}
        ).then(obj => { 
          appearanceModel.updateOne({_id: req.body.appId}, 
            {$set: {"subscription.attorneyRate": req.body.rating}}).then(a=>{console.log(a)}) })
      
      userModel.updateOne({_id: req.body.seekerId},
        { "$push": { "notifications": { type: notificationAlerts.APPEARANCE_RATED, msg:"rated"}}}
        ).then(obj => { 
          
          userModel.find({_id:req.body.attorneyId}, function(err, user){

            user.map(u =>{
              userModel.updateOne({ _id: u._id },
                { $set: { 
                  reviewTotal: u.reviews.reduce((a,b)=> (+a) + (+b['rating'] || 0), 0  ) / u.reviews.length  
                }
                }, 
              function(err, doc){
                console.log(doc)
              })
            })

            send.email(user[0].email, "You have been rated", "Please check your rate") 
           })

       return res.status(200).send({message: notificationAlerts.APPEARANCE_RATED, status: 200}) }) 
        .catch(err => { console.log('Error: ' + err) }) 
    },
    rateSeeker: function( req, res, next ){
      userModel.updateOne({_id: req.body.seekerId},
        { "$push": 
        { "reviews": { "rating": req.body.rating,"appearanceId": req.body.appId,"attorneyId": req.body.attorneyId },
        }}
        ).then(obj => { 
          appearanceModel.updateOne({_id: req.body.appId}, 
            {$set: {"subscription.seekerRate": req.body.rating}}).then(a=>{console.log(a)}) })
      
      userModel.updateOne({_id: req.body.attorneyId},
        { "$push": { "notifications": { type: notificationAlerts.APPEARANCE_RATED, msg:"rated"}}}
        ).then(obj => { 
      
          userModel.find({_id:req.body.seekerId}, function(err, user){
            console.log(user)
            user.map(u =>{
              userModel.updateOne({ _id: u._id },
                { $set: { 
                  reviewTotal: u.reviews.reduce((a,b)=> (+a) + (+b['rating'] || 0), 0  ) / u.reviews.length  
                }
                }, 
              function(err, doc){
                console.log(doc)

              })
            })
            
            send.email(user[0].email, "You have been rated", "Please check your rate") 
           })

       return res.status(200).send({message: notificationAlerts.APPEARANCE_RATED, status: 200}) }) 
        .catch(err => { console.log('Error: ' + err) }) 
    },
    sendMail: function(req, res, next){
        send.email(req.body.email, req.body.subject, req.body.text)
      return res.status(200).send({message: "Email sent", email: req.body.email,subject:req.body.subject, text: req.body.text })
    },

    getUserProfile: function(req, res, next){

     userModel.findById(req.body.uid , function (err, user) {
       if (err) { console.log("error")
         return res.status(500).send({ message: err.message })
       }
       if (!user) { return res.status(409).send({ message: notificationAlerts.USER_NOT_FOUND}) }

        return res.status(200).send({data: user})
       
     })
   },

   notificationsRead: function(req, res, next){
     userModel.updateMany({"_id": req.body.userId},
      { $pull: { notifications:{read: { $in: [ false ] } }}},
      { multi: true }
      ).then(a=>{console.log(a)})
     },


    ratingAverage: function(req, res, next){
      console.log('aaa')
      userModel.findOneById(req.body.userId, function(err, user){
        if(err) { return res.json({"error": err}) };
        if(user) {  
          user.review.rating.map(function(rating){
             return res.json({"rating": rating})
          })
        }
        
      })

    }




}
