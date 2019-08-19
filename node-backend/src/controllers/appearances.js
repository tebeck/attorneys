const appearanceModel = require('../models/appearances');
const userModel = require('../models/users');
const send = require('../services/sendmail');
const Logger = require("cute-logger")
const stripe = require('stripe')('sk_test_ZGEymtkcwjXSaswUlv4nZJeu002Le9D64P');




module.exports = {

get: function(req, res, next){
  appearanceModel.find({'status': 'pending'} ,function (err, data){
    if(err){ res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data });
  }).sort({ createdAt:-1 });
},

create: function(req, res, next){
  const payload = req.body;
   payload.attorneyId = payload.userId;
   console.log(payload.attorneyId)
   appearance = new appearanceModel(payload);
    appearance.save()
    .then(appearance => {
      let subject = "Request created"
      let text = "Congrats! Your request was successfully published."
        userModel.findById(payload.attorneyId, function( err, user){
         if(err) {return res.status(500).send({message: err.message})}
         if(!user) {return res.status(401).send({message: "No user found"})}
          
        Logger.log("APPEARANCE CREATED: Sending email")
        
        userModel.findByIdAndUpdate(payload.attorneyId,
          { $push:{ "notifications": {"type": "Congrats! Your appearance was successfully created.", msg: "created" }} }, function(err, user){

          })

    res.status(200).send({message: "Appearance created", data:{appearance: appearance}});
    })
   })
    .catch(err => {
      console.log(err)
      res.status(401).send("unable to save to database => UNAUTHORIZED");
    });
},

delete: function(req, res, next){
  

appearanceModel.findOne({_id: req.body.appId}, function(err, appearance){
   if(err){console.log(err)}
   if(!appearance){console.log("no appearance found")}
   
   
   
   if(appearance.subscription && appearance.subscription.seekerId){


    var expirationDay = new Date(appearance.subscription.date.getTime() + 86400000); // + 1 day in ms
    expirationDay.toLocaleDateString();




   userModel.findOne({_id: req.body.userId}, function(err, attorney){

    let customerId = attorney.stripe_customer_id;
    let attorneyId = attorney._id;

    console.log("CHARGING: checking appearance expiration date")

     if( new Date() > expirationDay ) {
       console.log("CHARGING: within 24hs. charge split 50% for the platform . 50% for the appearing.")
       var amount = 3700; // if not. paying 37 dolars to esquired. 37 dolars to appearing

       userModel.findOne({_id: appearance.subscription.seekerId}, function(err, seeker){
        if(err){ return console.log("Stripe: Charge error: " + err) };
        let appearingAccount = seeker.stripe_user_id;
        let seekerId = seeker._id;

        stripe.transfers.create({
          amount: amount,
          currency: "usd",
          destination: appearingAccount,
        }).then(function(transfer) {
             console.log("TRANSFER: attorney transfer +$37,5")
             console.log("TRANSFER: COMPLETED")
             userModel.updateOne( { _id: seekerId}, { 
              $push: {
               "transactions":{amount: "+$37,5", type: "Request canceled"} }
              }) 
              .then(obj => {
                stripe.charges.create({
                  amount: amount,
                  currency: "usd",
                  customer: customerId
                }).then(
          function(charge) {
             console.log("CHARGING: attorney charging -$37,5")
             console.log("AMOUNT :" + charge.amount)
             console.log("STATUS :" + charge.outcome.seller_message)
             console.log("TYPE: " + charge.outcome.type)
             console.log("CHARGING: COMPLETED")
           userModel.updateOne( { "_id": attorneyId}, {
            $push: {
              "transactions":{amount: "-$37,5", type: "Request canceled"}
            }}) 
           .then(obj => {
             console.log('STRIPE: Charge for cancelation added successfully to database.');
             console.log("CHARGING: payment completed to record and appearing")
           })
           .catch(err => { console.log('Error: ' + err)
           })
        })
              })
              .catch(err => { console.log('Error: ' + err)})               
          })
      })

       

     } else {
       console.log("CHARGING: more than 24hs. charge $50 for the platform.")
       var amount = 5000; //. if expired. paying 50 dolars to esquired.


      stripe.charges.create({
        amount: amount,
        currency: "usd",
        customer: customerId
      })
        .then(
          function(charge) {
           console.log("STRIPE: Charge completed. Details below:")
             console.log("AMOUNT :" + charge.amount)
             console.log("STATUS :" + charge.outcome.seller_message)
             console.log("TYPE: " + charge.outcome.type)
           userModel.updateOne( { "_id": attorneyId}, {
            $push: {
              "transactions":{amount: "-$50", type: "Request canceled"}
            }}) 
           .then(obj => {
             console.log('STRIPE: Charge for cancelation added successfully to database.');
             console.log("CHARGING: payment completed to record")

           })
           .catch(err => { console.log('Error: ' + err)
           })
        })


        
     }






   
   })
   }  
   
})
  

  appearanceModel.findOneAndDelete({_id: req.body.appId})
    .then(deletedDocument => {
      if(deletedDocument) {
        
          if(deletedDocument.subscription.seekerId){
          userModel.findOne({_id: deletedDocument.subscription.seekerId},function(err, seeker){
             let subject = "Appearance deleted"
             let text = "Your appearances has been deleted"
              send.email(seeker.email, subject, text)
              console.log("EMAIL-APPEARING: appearance canceled. ")
          })}

          userModel.findOne({_id: deletedDocument.attorneyId}, function(err, attorney){
           let subject = "Appearance deleted"
           let text = "Your appearances has been deleted"
            send.email(attorney.email, subject, text)          
            console.log("EMAIL-RECORD: appearance canceled. ")
              userModel.findByIdAndUpdate({_id: deletedDocument.attorneyId},
                { $push:{ "notifications": {"type": "Congrats! Your appearance was successfully deleted." , msg:"deleted" }} }, function(err, user){
                  
                })
          })
          return res.status(200).send({message: "appearance deleted", data:{appearance: deletedDocument}}) 
        } else {
          return res.status(409).send({ message: "cant find appearance", data:{appearance: deletedDocument}})
        }
     
  })
},

update: function(req, res, next){
    appearanceModel.updateOne( { "_id": req.body.result._id},
        {$set: {
          areaOfLaw: req.body.areaOfLaw,
          caseName: req.body.caseName,
          clientPresent: req.body.clientPresent,
          courtHouse: req.body.courtHouse,
          department: req.body.department,
          instructions: req.body.instructions,
          lateCall: req.body.lateCall,
          documents: req.body.documents,
          time: req.body.time,
          hearingDate: req.body.hearingDate
        }}) 

      .then(obj => {
        console.log('Updated - ' + obj);
          return res.status(200).send({message: "Update OK", status: 200})
         })
        .catch(err => {
           console.log('Error: ' + err);
      }) 
},

getAppearancesTab: function(req, res, next){
  appearanceModel.find({"attorneyId": { $ne: req.body.userId }, status: "pending" }  ,function (err, data){
    if(err){ console.log(err) }
      return res.status(200).send({ data: data });
  }).sort({ hearingDate: "1" });
},

getAgendaTab: function(req, res, next){
  appearanceModel.find({
    $or: [ 
    { 'attorneyId': req.body.userId, $and: [{ $or:[{'status': 'applied'},{'status': 'completed'},{'status': 'finished'},{'status': 'rated'}] }]},
    { 'subscription.seekerId': req.body.userId, } 
    ]}
    ,function (err, data){

    if(err){ res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data });
  }).sort({ hearingDate: "1" });
},




 deleteFile: function(req, res, next){
  appearanceModel.updateOne({ _id: req.body.appId },{ $pull: { documents: { etag: req.body.etag } }}, function(err, doc){
    console.log(doc)
    console.log(err)
    console.log(req.body.etag)
    return res.status(200).send({message: "deleted", status: 200, data: doc})
 })

},

getAppDetail: function(req, res, next){
  appearanceModel.findById(req.body.appId,function (err, data){
    if(err){ return res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data })
  })
},

getRequestsTab: function(req, res, next){ 
  appearanceModel.find({ attorneyId: req.body.userId, status: {$in: ['accepted','pending','finished' ] }},function (err, data){
    if(err){ return res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data })
  })
},

unsubscribe: function(req, res, next){ 
  let subject = "Unsubscribed"
  let text = "Appearing successfully unsubscribed to appearance"
  appearanceModel.findOne({_id: req.body.appId, "subscription.seekerId": req.body.userId}, function(err, result){
    if(err) {return res.status(500).send({message: err.message})}
    if(result && result.subscription.date) {

       validTo = new Date(new Date(result.subscription.date).getTime() + 60 * 60 * 24 * 1000);  // check if appearance is valid or not to 

      if (new Date() > validTo){ return res.status(409).send({message: "Can't unsubscribe", validTo: validTo})}
    }

      appearanceModel.updateOne( { "_id": req.body.appId},{$set: {"subscription.seekerId": "", status: "pending", "subscription.verdictDocs":[], "subscription.information": ""}} ) 
      .then(obj => { 
        userModel.findOne({_id: req.body.userId}, function(err, seeker){
         let subject = "Appearance canceled"
         let text = "Your appearances has been canceled"
          send.email(seeker.email, subject, text)          
          console.log("mail sent to appearing")
              userModel.findByIdAndUpdate({_id: req.body.userId},
                { $push:{ "notifications": {"type": "Your application was successfully cancelled.", msg: "unsubscribed" }} }, function(err, user){
                  console.log(user)
                  console.log(err)
                })
        })
        userModel.findOne({_id: result.attorneyId}, function(err, attorney){
         let subject = "Appearance canceled"
         let text = "Your appearances has been canceled"
          send.email(attorney.email, subject, text)          
          console.log("mail sent to record")
              // userModel.findByIdAndUpdate({_id: result.attorneyId},
              //   { $push:{ "notifications": {"type": "Appearance ubsubscribe" }} }, function(err, user){
              //     console.log(user)
              //     console.log(err)
              //   })
        })

        return res.status(200).send({message: "Unsubscribed OK", status: 200})
      })
      .catch(err => { console.log('Error: ' + err)}) 
    
  })
},

 subscribe: function(req, res, next){
    appearanceModel.updateOne({ "_id": req.body.appId},
      {$set: {"subscription.seekerId": req.body.userId, "subscription.date": Date.now(), status: "applied"}} ) 
      .then(obj => {
        userModel.findOne({_id: req.body.userId}, function(err, seeker){
         let subject = "Subscription"
         let text = "Your are now subscribed"
          send.email(seeker.email, subject, text)          
          console.log("mail sent to appearing")
              userModel.findByIdAndUpdate({_id: req.body.userId},
                { $push:{ "notifications": {"type": "Your application was successfully! We will notify you when the attorney of record accept it.", msg: "subscribed" }} }, function(err, user){

                })
        })
        appearanceModel.findOne({"_id": req.body.appId}, function(err, appearance){
          userModel.findOne({"_id": appearance.attorneyId}, function(err, attorney){
           let subject = "Subscription"
           let text = "Your are now subscribed"
            send.email(attorney.email, subject, text)          
            console.log("mail sent to appearing")
              userModel.findByIdAndUpdate({_id: appearance.attorneyId},
                { $push:{ "notifications": {"type": "You have a new application in "+ appearance.courtHouse +", check it!", msg:"subscribed" }} }, function(err, user){

                })
          })
        
          return res.status(200).send({message: "Postulated OK", data: appearance , status: 200})
          })
         })
        .catch(err => {
           console.log('Error: ' + err);
      }) 
 },

  acceptAppearing: function(req, res, next){
    console.log(req.body)
    appearanceModel.updateOne({"_id": req.body.appId},{$set: { status: 'accepted' }}) 
      .then(obj => { 
        userModel.findOne({_id: req.body.userId}, function(err, attorney){
         let subject = "Appearance accepted"
         let text = "Your appearances has been accepted"
          send.email(attorney.email, subject, text)          
          console.log("mail sent to record")

        })
        userModel.findOne({_id: req.body.seekerId}, function(err, seeker){
         let subject = "Appearance accepted"
         let text = "Your appearances has been accepted"
          send.email(seeker.email, subject, text)          
          console.log("mail sent to appearing")

              userModel.findByIdAndUpdate({_id: seeker._id},
                { $push:{ "notifications": {"type": "Congrats! Your application was accepted!", msg: "accepted" }} }, function(err, user){
                  console.log(user)
                  console.log(err)
                })

        })
        return res.status(200).send({message: "Update OK", status: 200}) 
      })
      .catch(err => { console.log('Error: ' + err) }) 
  },

  rejectAppearing: function(req, res, next){
    appearanceModel.updateOne({"_id": req.body.appId},{$set: { status: 'pending', 'subscription.seekerId': "" }}) // REJECTED 
      .then(obj => { 
        userModel.findOne({_id: req.body.userId}, function(err, attorney){
         let subject = "Appearance rejected"
         let text = "Your appearances has been rejected"
          send.email(attorney.email, subject, text)          
          console.log("mail sent to record")
              userModel.findByIdAndUpdate({_id: req.body.seekerId},
                { $push:{ "notifications": {"type": "We're sorry! Your application was rejected.", msg:"rejected" }} }, function(err, user){
                  console.log(user)
                  console.log(err)
                })
        })
        userModel.findOne({_id: req.body.seekerId}, function(err, seeker){
         let subject = "Appearance rejected"
         let text = "Your appearances has been rejected"
          send.email(seeker.email, subject, text)          
          console.log("mail sent to appearing")
              // userModel.findByIdAndUpdate({_id: req.body.seekerId},
              //   { $push:{ "notifications": {"type": "Appearance rejected" }} }, function(err, user){
              //     console.log(user)
              //     console.log(err)
              //   })
        })
        return res.status(200).send({message: "Update OK", status: 200}) })
      .catch(err => { console.log('Error: ' + err) }) 
  },
  
  completeAppearance: function(req, res, next){
    
    appearanceModel.updateOne({"_id": req.body.appId},
    {
      $set: { status: 'completed', "subscription.verdictDocs": req.body.verdictDocs, "subscription.information": req.body.information, "subscription.completedDay": new Date() }}) 
      .then(obj => { 
        let subject = "Appearance completed"
        let text = "Your appearances has been completed"

        appearanceModel.findById(req.body.appId,function (err, data){
          if(err){ return res.status(500).send({ message: err.message }) }
           
          userModel.findOne({_id: data.attorneyId}, function(err, attorney){
           let subject = "Appearance completed"
           let text = "Your appearances has been completed!"
            send.email(attorney.email, subject, text)          
            console.log("mail sent to record")
              userModel.findByIdAndUpdate({_id: data.attorneyId},
                { $push:{ "notifications": {"type": "Congrats! Your appearance is completed. The appearing attorney uploaded the verdict.", msg: "completed" }} }, function(err, user){
                  console.log(user)
                  console.log(err)
                })
          })
        })


        return res.status(200).send({message: "Update OK", status: 200}) })
      .catch(err => { console.log('Error: ' + err) }) 
  },


  getAccepted: function(req, res, next){
    appearanceModel.find({ status: 'accepted' }, function(err, result) { // ?????
      if(err){
        console.log(err);
      } else {
        res.json(result);
      }
    }).sort({createdAt:-1}); 
  },
  


finishAppearance: function(req, res, next){ 
  let attorneyEmail = req.body.email
  console.log(attorneyEmail)
  appearanceModel.findById({_id: req.body.appId, "subscription.seekerId": req.body.userId}, function(err, appearance){
    if (err){ return res.status(500).send({message: err.message}) }
    if (!appearance){ return res.status(409).send({message: "Not found"}) }
     
     const subject = 'Work done!';
     const text = 'test text appearance finished';
      appearance.status = 'finished';
      appearance.save()
        .then(appearance => {
          Logger.log("SUBSCRIPTION FINISHED: Sending email")
            userModel.findById(appearance.subscription.seekerId, function(err,seeker){
              send.email(seeker.email, subject, text)
              Logger.log(seeker.email + " " + subject)
              userModel.findByIdAndUpdate({_id: appearance.subscription.seekerId},
                { $push:{ "notifications": {"type": "Congrats! Your appearance is finished. Thanks for use Esquired.", msg:"finished" }} }, function(err, user){
                  console.log(user)
                  console.log(err)
                })
            })
              send.email(attorneyEmail, subject, text)
              userModel.updateOne({email: attorneyEmail},
                { $push:{ "notifications": {"type": "Congrats! Your appearance is finished. Thanks for use Esquired.", msg:"finished" }} }, function(err, user){
                  console.log(user)
                  console.log(err)
                })
              Logger.log(attorneyEmail + " " + subject)

        return res.status(200).send({ message:'Work finished', status: 200 });
      })
      .catch(err => {
        return res.status(401).send({ message: "unable to update the database", msg: err.message});
      });
    });
},


  getAppearanceByCourt: function(req, res, next){

    appearanceModel.find({"courtHouse": req.body.court, status: "pending", hearingDate: req.body.day }, function(err, appearance){
      if (err){ return res.status(500).send({message: err.message}) }
      if (!appearance){ return res.status(409).send({message: "Not found"}) }
        
        console.log(appearance.length)

        if(appearance.length > 0){
          userModel.findOne({_id: req.body.userId}, function(err, user){
            let subject = "Get more appearances!"
            let text = "You recently applied for an appearance and we detected that there are more appearances the same day in that courthouse. Check them in Esquired and also make your apply!"
            console.log("STACKING: email sent!")
            console.log(appearance)
            send.email(user.email, subject, text)
          })

       return res.status(200).send({data: appearance, status: 200})
       }

    })
  }


}





















