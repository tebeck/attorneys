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

        // let token = new tokenModel({
        //   _userId: user._id,
        //   token: crypto.randomBytes(16).toString('hex')
        // });
         
        // token.save(function (err) {
        //   if (err) { return res.status(500).send({ message: err.message }); 
        // }

         //const subject = 'Account Verification Token'
         //const text = "Please verify your account by clicking the link: "+'http:\/\/' + req.headers.host + '\/users/confirmation\/' + token.token 

         const subject = 'Welcome to Esquired!'
         
         console.log(user)
         
         let text = "Thanks for signing up to keep in touch with Esquired. If you register as Appearance Attorney, please wait until your account is reviewed"

         Logger.log("REGISTER: Sending email")
         
         send.email(user.email, subject, text)

         if(user.isSeeker){
           let subject = "Esquired: Action needed"
           let text = "New appearing attorney registered. "+user.email+" is pending your approve/reject action"
           send.email(process.env.ADMIN_EMAIL, subject, text)           
         }
         
         const token = jwt.sign({ _id:user._id }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_LIFE })
         return res.status(200).send({token: token,user: user,state: 200, message:"A welcome email has been sent to "+user.email}) 
         
        });
      });

    // });
  },

  authenticate: function(req, res, next) {
    userModel.findOne({email:req.body.email}, function(err, user){

      if (err) { return res.status(500).send({ message: err.message }); }
      if (!user) { return res.status(401).send({ message: "User not found"}); }
      if (!user.isVerified) { return res.status(401).send({ message: "Your account has not been verified"}); } 
      if (!user.isAttorney && user.isSeeker && user.onHold) { return res.status(401).send({ message: "Account is on review, we will let you know when its active"}); } 
      if (user.isDisabled){ return res.status(401).send({ message: "User disabled" }); }
      if(user.status === "rejected"){return res.status(401).send({message: "Your account was rejected, please contact the admin"})}

      if(bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({ _id:user._id }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_LIFE })
          console.log(user)
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
     userModel.findById(req.body.userId , function (err, user) {
       if (err) {return res.status(500).send({ message: err.message })}
       if (!user) {return res.status(409).send({message: "no user found"})}
        return res.status(200).send({data: user})
       
     })

   },



makeSeeker: function(req, res, next){

     userModel.findById(req.body.userId, function(err, user) { 
      
      if (!user) { return res.status(401).send({ message: "User not found"}) }
      user.updateOne({isSeeker: true, insurancePolicy: req.body.insurancePolicy, onHold: true},function (err) {
          if (err) { return res.status(500).send({ message: err.message }); }
          let subject ="Appearing request"
          let text = "Appearing request"
          send.email(process.env.ADMIN_EMAIL, subject, text)
          return res.status(200).send({state: 200,data: user,message: "Your profile will be in revision. We will notify you when your Appearing attorney profile be accepted"});
      });
    })
},

makeAttorney: function(req, res, next){

     userModel.findById(req.body.userId, function(err, user) { 
      
      if (!user) { return res.status(401).send({ message: "User not found"}) }
      user.updateOne({isAttorney: true},function (err) {
          if (err) { return res.status(500).send({ message: err.message }); }
          return res.status(200).send({state: 200,message: "Now your a attorney too", data: user});
      });
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
          
          const link = process.env.URL_FRONTEND + '/createnewpassword/?token=' + recoverPassword.token



           const subject = 'Recover password';
           const text = 'Please click this '+ link + ' to recover your password';
           
           
           send.email(user.email, subject, text)
             return res.status(200).send({message: "Mail sent, check your inbox"})

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
    }) 

    },



//Profile section
    updateaccountinfo: function (req, res, next){
      userModel.findById( req.body._userId , function(err, user){
        if (!user) return res.status(409).send({ message: 'We were unable to find a users.' });

          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.email = req.body.email;
          user.notification = req.body.notification;   
          user.profilePicture = req.body.image;    

          if(req.body.newpassword && req.body.password && req.body.confirm){
            bcrypt.compare(req.body.password, user.password, function(err, resp) {
              if(err) {return res.status(500).send({message: err.message})}
              if(!resp){ return res.status(409).send({message: "Invalid password!"}) }
               if(resp) { 
                bcrypt.hash(req.body.newpassword, 10, function(err, hash) {
                    user.password = hash; 
                    console.log("1")

                    console.log("2") 

                    user.updateOne(user,function (err) {  
                     if (err) { return res.status(500).send({ message: err.message }); }
                       console.log("Account updated")
                       return res.status(200).send({message: 'Account updated!'})
                    });

                });
               } 
            })
          } else {
            user.updateOne(user,function (err) {  
             if (err) { return res.status(500).send({ message: err.message }); }
              console.log("2")
             return res.status(200).send({message: 'Account updated!'})
         });
          }
        


 
      });

    },

    updateprofinfo: function(req, res, next){
      userModel.findById( req.body._userId , function(err, user){
        if(err) {return res.status(500).send({message: err.message})}
        if (!user) return res.status(409).send({ message: 'We were unable to find a users.' });

         user.firmName = req.body.firmName;
         user.policy = req.body.policy;
         user.officePhone = req.body.officePhone;
         user.mobilePhone = req.body.mobilePhone;
         user.mailingAddress[0].streetAddrOne = req.body.streetAddrOne;
         user.creditCard = req.body.creditCard;
          
         console.log(user)
        
         user.updateOne(user,function (err) {
            if (err) { return res.status(500).send({ message: err.message }); }
            return res.status(200).send({message: 'Account updated!'})
         }); 
          
      })
    },

    rateAttorney: function( req, res, next ){
      userModel.updateOne({_id: req.body.attorneyId},
        { "$push": { "reviews": 
        { "rating": req.body.rating,
          "appearanceId": req.body.appId, 
          "seekerId": req.body.seekerId }
        }}).then(obj => { 
          appearanceModel.updateOne({_id: req.body.appId}, 
            {$set: {"subscription.attorneyRate": req.body.rating}}).then(a=>{console.log(a)})

          return res.status(200).send({message: "Update OK", status: 200}) })
        .catch(err => { console.log('Error: ' + err) }) 
    },
    rateSeeker: function( req, res, next ){
      userModel.updateOne({_id: req.body.seekerId},
        { "$push": { "reviews": 
        { "rating": req.body.rating,
          "appearanceId": req.body.appId, 
          "attorneyId": req.body.attorneyId }
        }}).then(obj => { 
          appearanceModel.updateOne({_id: req.body.appId}, 
            {$set: {"subscription.seekerRate": req.body.rating}}).then(a=>{console.log(a)})

          return res.status(200).send({message: "Update OK", status: 200}) })
        .catch(err => { console.log('Error: ' + err) }) 
    },
    sendMail: function(req, res, next){
        send.email(req.body.email, req.body.subject, req.body.text)
      return res.status(200).send({message: "Email sent", email: req.body.email,subject:req.body.subject, text: req.body.text })
    }

}
