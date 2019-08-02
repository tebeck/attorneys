const appearanceModel = require('../models/appearances');
const userModel = require('../models/users');
const send = require('../services/sendmail');
const Logger = require("cute-logger")

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
          send.email(user.email, subject, text)

    res.status(200).send({message: "Appearance created", data:{appearance: appearance}});
    })
   })
    .catch(err => {
      console.log(err)
      res.status(401).send("unable to save to database => UNAUTHORIZED");
    });
},

delete: function(req, res, next){
  console.log(req.body)

  appearanceModel.findOneAndDelete({_id: req.body.appId})
    .then(deletedDocument => {
      if(deletedDocument) {
        console.log(deletedDocument)
          if(deletedDocument.subscription.seekerId){
          userModel.findOne({_id: deletedDocument.subscription.seekerId},function(err, seeker){
             let subject = "Appearance deleted"
             let text = "Your appearances has been deleted"
              send.email(seeker.email, subject, text)          
              console.log("mail sent to record")
          })}
          
          userModel.findOne({_id: deletedDocument.attorneyId}, function(err, attorney){
           let subject = "Appearance deleted"
           let text = "Your appearances has been deleted"
            send.email(attorney.email, subject, text)          
            console.log("mail sent to appearing")
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
  }).sort({ createdAt:-1 });
},

getAgendaTab: function(req, res, next){
  appearanceModel.find({
    $or: [ 
    { 'attorneyId': req.body.userId, $and: [{ $or:[{'status': 'applied'},{'status': 'completed'},{'status': 'finished'},{'status': 'rated'}] }]},
    { 'subscription.seekerId': req.body.userId, } ] }
    ,function (err, data){
    if(err){ res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data });
  }).sort({ createdAt:-1 });
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
        })
        userModel.findOne({_id: result.attorneyId}, function(err, attorney){
         let subject = "Appearance canceled"
         let text = "Your appearances has been canceled"
          send.email(attorney.email, subject, text)          
          console.log("mail sent to record")
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
        })
        appearanceModel.findOne({"_id": req.body.appId}, function(err, appearance){
          userModel.findOne({"_id": appearance.attorneyId}, function(err, attorney){
           let subject = "Subscription"
           let text = "Your are now subscribed"
            send.email(attorney.email, subject, text)          
            console.log("mail sent to appearing")
          })
        
          return res.status(200).send({message: "Postulated OK", data: appearance , status: 200})
          })
         })
        .catch(err => {
           console.log('Error: ' + err);
      }) 
 },

  acceptAppearing: function(req, res, next){
    appearanceModel.updateOne({"_id": req.body.appId},{$set: { status: 'accepted' }}) 
      .then(obj => { 
        userModel.findOne({_id: req.body.userId}, function(err, seeker){
         let subject = "Appearance accepted"
         let text = "Your appearances has been accepted"
          send.email(seeker.email, subject, text)          
          console.log("mail sent to record")
        })
        userModel.findOne({_id: req.body.seekerId}, function(err, seeker){
         let subject = "Appearance accepted"
         let text = "Your appearances has been accepted"
          send.email(seeker.email, subject, text)          
          console.log("mail sent to appearing")
        })
        return res.status(200).send({message: "Update OK", status: 200}) 
      })
      .catch(err => { console.log('Error: ' + err) }) 
  },

  rejectAppearing: function(req, res, next){
    appearanceModel.updateOne({"_id": req.body.appId},{$set: { status: 'pending', 'subscription.seekerId': "" }}) // REJECTED 
      .then(obj => { 
        userModel.findOne({_id: req.body.userId}, function(err, seeker){
         let subject = "Appearance rejected"
         let text = "Your appearances has been rejected"
          send.email(seeker.email, subject, text)          
          console.log("mail sent to record")
        })
        userModel.findOne({_id: req.body.seekerId}, function(err, seeker){
         let subject = "Appearance rejected"
         let text = "Your appearances has been rejected"
          send.email(seeker.email, subject, text)          
          console.log("mail sent to appearing")
        })
        return res.status(200).send({message: "Update OK", status: 200}) })
      .catch(err => { console.log('Error: ' + err) }) 
  },
  
  completeAppearance: function(req, res, next){
    appearanceModel.updateOne({"_id": req.body.appId},{
      $set: { status: 'completed', "subscription.verdictDocs": req.body.verdictDocs, "subscription.information": req.body.information }}) // REJECTED 
      .then(obj => { 
        let subject = "Appearance completed"
        let text = "Your appearances has been completed"
        send.email(req.body.userId, subject, text)
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
            })
              send.email(attorneyEmail, subject, text)
              Logger.log(attorneyEmail + " " + subject)

        return res.status(200).send({ message:'Work finished', status: 200 });
      })
      .catch(err => {
        return res.status(401).send({ message: "unable to update the database", msg: err.message});
      });
    });
},


  getAppearanceByCourt: function(req, res, next){
    appearanceModel.find({"courtHouse": req.body.court, status: "pending"}, function(err, appearance){
      if (err){ return res.status(500).send({message: err.message}) }
      if (!appearance){ return res.status(409).send({message: "Not found"}) }
      
       return res.status(200).send({data: appearance, status: 200})

    })
  }


}





















