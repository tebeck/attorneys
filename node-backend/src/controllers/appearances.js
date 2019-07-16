const appearanceModel = require('../models/appearances');
const userModel = require('../models/users');
const postulationsModel = require('../models/postulations');
const send = require('../services/sendmail');
const Logger = require("cute-logger")

module.exports = {

get: function(req, res, next){
  appearanceModel.find({'status': 'published'} ,function (err, data){
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
  appearanceModel.findOneAndDelete({_id: req.body.appId}, function(err, appearance){
      if(err){ return res.status(500).send({err: err.message})} 
      if(!appearance) {return res.status(409).send({ message: "cant find appearance", data:{appearance: appearance}}) }
        if(appearance){console.log("deleted")}
      if(appearance) { return res.status(200).send({message: "appearance deleted", data:{appearance: appearance}}) }
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
          documents: req.body.documents
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
  appearanceModel.find({"attorneyId": { $ne: req.body.userId } }  ,function (err, data){
    if(err){ console.log(err) }
      return res.status(200).send({ data: data });
  }).sort({ createdAt:-1 });
},

getAgendaTab: function(req, res, next){
  appearanceModel.find({$or: [ { 'attorneyId': req.body.userId, $and: [{'status': 'accepted', 'status': 'finished' }]}, { 'subscription.seekerId': req.body.userId } ] } ,function (err, data){
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
  appearanceModel.find({ attorneyId: req.body.userId },function (err, data){
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

       validTo = new Date(new Date(result.subscription.date).getTime() + 60 * 60 * 24 * 1000);  // check if appearance is valid or not to cancel

      if (new Date() > validTo){ return res.status(409).send({message: "Can't unsubscribe", validTo: validTo})}
    }

      appearanceModel.updateOne( { "_id": req.body.appId},{$set: {"subscription.seekerId": ""}} ) 
      .then(obj => { 
        send.email(req.body.userId, subject, text)
        send.email(result.attorneyId, subject, text)
        return res.status(200).send({message: "Unsubscribed OK", status: 200})
      })
      .catch(err => { console.log('Error: ' + err)}) 
    
  })
},

 subscribe: function(req, res, next){
    appearanceModel.updateOne( { "_id": req.body.appId},{$set: {"subscription.seekerId": req.body.userId, "subscription.date": Date.now(), status: "pending", "subscription.status": "pending"}} ) 
      .then(obj => {
        console.log('Updated - ' + obj);
          return res.status(200).send({message: "Postulated OK", status: 200})
         })
        .catch(err => {
           console.log('Error: ' + err);
      }) 
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



completed: function(req, res, next){ 
  let seekerEmail = req.body.email
  console.log(seekerEmail)
  appearanceModel.findById({_id: req.body.appId, "subscription.seekerId": req.body.userId}, function(err, appearance){
    if (err){ return res.status(500).send({message: err.message}) }
    if (!appearance){ return res.status(409).send({message: "Not found"}) }
     
     const subject = 'Work done!';
     const text = 'test text appearance completed';
      appearance.status = 'completed';
      appearance.save()
        .then(appearance => {
          Logger.log("SUBSCRIPTION COMPLETED: Sending email")
            userModel.findById(appearance.attorneyId, function(err,attorney){
              send.email(attorney.email, subject, text)
              Logger.log(attorney.email + " " + subject)
            })
              send.email(seekerEmail, subject, text)
              Logger.log(seekerEmail + " " + subject)

        return res.status(200).send({ message:'Work completed', status: 200 });
      })
      .catch(err => {
        return res.status(401).send({ message: "unable to update the database", msg: err.message});
      });
    });
}



}





















