const appearanceModel = require('../models/appearances');
const userModel = require('../models/users');
const postulationsModel = require('../models/postulations');
const send = require('../services/sendmail');
const Logger = require("cute-logger")

module.exports = {

get: function(req, res, next){
  appearanceModel.find({'status': 'published'},function (err, data){
    if(err){ res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data });
  }).sort({ createdAt:-1 });
},

getRequests: function(req, res, next){ 
  appearanceModel.find({ attorneyId: req.body.userId },function (err, data){
    if(err){ return res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data })
  })
},


getSpecific: function(req, res, next){
  appearanceModel.findById(req.body.appId,function (err, data){
    if(err){ return res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data })
  })
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
update: function(req, res, next){
     appearanceModel.findById(req.body.id, function(err, appearance) {
    if (!appearance)
      return next(new Error('Could not load Document'));
    else {
      appearance.title = req.body.title;
      appearance.description = req.body.description;
      appearance.status = req.body.status;
      
      appearance.save()
      .then(appearance => {
          return res.status(200).send({ message:'appearance updated', data: appearance });
      })
      .catch(err => {
          return res.status(409).send("unable to update the database");
      });
    }
  });
},

updateAll: function(req, res, next){
    appearanceModel.findById(req.body.result._id, function(err, appearance) {
    if (!appearance)return next(new Error('Could not load Document'))
     else {
      appearance.areaOfLaw = req.body.areaOfLaw
      appearance.caseName = req.body.caseName
      appearance.clientPresent = req.body.clientPresent
      appearance.courtHouse = req.body.courtHouse
      appearance.department = req.body.department
      appearance.instructions = req.body.instructions
      appearance.lateCall = req.body.lateCall

      appearance.save()
      .then(appearance => {
          return res.status(200).send({ message:'appearance updated', data: appearance });
      })
      .catch(err => {
          return res.status(409).send("unable to update the database");
      });
    }
  });
},

delete: function(req, res, next){
  appearanceModel.findByIdAndRemove(req.body.id, function(err, appearance){
      if(err){ return res.status(500).send({err: err.message})} 
      if(!appearance) {return res.status(409).send({ message: "cant find product", data:{appearance: appearance}}) }
      if(appearance) { return res.status(200).send({message: "product deleted", data:{appearance: appearance}}) }
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


getAgenda: function(req, res, next){ 
  console.log("get agenda")
  appearanceModel.find({ seekerId: req.body.userId },function (err, data){
    if(err){ return res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data })
  })
},




unsubscribe: function(req, res, next){ 
  console.log(req.body.appId)
  console.log(req.body.userId)
  appearanceModel.findOne({_id: req.body.appId, "subscription.seekerId": req.body.userId}, function(err, result){
    if(err) {return res.status(500).send({message: err.message})}
    if(result && result.subscription.date) {

       validTo = new Date(new Date(result.subscription.date).getTime() + 60 * 60 * 24 * 1000);  // check if appearance is valid or not to cancel

      if (new Date() > validTo){ return res.status(409).send({message: "Can't unsubscribe", validTo: validTo})}
    }

      appearanceModel.updateOne( { "_id": req.body.appId},{$set: {"subscription.seekerId": ""}} ) 
      .then(obj => { return res.status(200).send({message: "Unsubscribed OK"})})
      .catch(err => { console.log('Error: ' + err)}) 
    
  })
},

 subscribe: function(req, res, next){
    appearanceModel.updateOne( { "_id": req.body.appId},{$set: {"subscription.seekerId": req.body.userId, "subscription.date": Date.now()}} ) 
      .then(obj => {
        console.log('Updated - ' + obj);
          return res.status(200).send({message: "Postulated OK", status: 200})
         })
        .catch(err => {
           console.log('Error: ' + err);
      }) 
    }
}