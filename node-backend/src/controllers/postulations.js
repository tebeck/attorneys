const appModel = require('../models/appearances');
const postModel = require('../models/postulations');
const userModel = require('../models/users');
const send = require('../services/sendmail');
const Logger = require("cute-logger")

module.exports = {

create: function(req, res, next){ // Pasar en el body el id de appearance (frontend)
  const payload = req.body;

  appModel.findById(payload.appearanceId, function(err,result){
    if(err){ return res.status(500).send(err) }
    
      let attorney = result.createdBy;

   postModel.find({appearanceId: payload.appearanceId, createdBy: payload.userId}, function(err, result) {
     if(err){ return res.status(500).send(err) }
     if(result.length > 0){ return res.status(409).send({message: "user is already postulated"}) }
     
     const postulations = new postModel(payload);
     postulations.createdBy = payload.userId;
     postulations.attorney = attorney;
     postulations.save()
      .then(postulations => {
        return res.status(200).send({message: "postulations created", data: {postulations: postulations}});
      })
      .catch(err => {
        return res.status(409).send("unable to save to database => "+err);
      });
     })


  })


},

cancel: function(req, res, next){ // Pasar en el body el id de appearance (frontend)
  payload = req.body;
  postModel.findOne({_id: payload.postulationId, userId: payload.userId}, function(err, result){
    if(err) {return res.status(500).send({message: err.message})}
    if(result && result.createdAt) {
       validTo = new Date(new Date(result.createdAt).getTime() + 60 * 60 * 24 * 1000);  // check if appearance is valid or not to cancel
      if (new Date() < validTo){ return   res.status(409).send({message: "Can't cancel postulation", validTo: validTo})}
        postModel.deleteOne({postulationId: payload.postulationId, userId: payload.userId}, function(err, result){
          if(err) {return res.status(500).send({message: err.message})}
          if(result.deletedCount < 1){return res.status(409).send({message: "No postulation found"})}
            return res.status(200).send({message: "Postulation deleted", deletedCount: result.deletedCount})
      })
    } else {return res.status(409).send({message: "No postulation for this user"}) }
  })
},

get: function(req, res, next){
  postModel.find({ status: 'pending' }, function(err, result) {
      return res.json({status:200, data: result});
    })
},

acceptOrReject: function(req, res, next){
  let payload = req.body;
  postModel.findById(req.body.postulationId, function(err, postulation) {
    if (!postulation){ return next(new Error('Could not load Document')) }
      postulation.status = req.body.status;
      
      postulation.save()
        .then(postulation => {
         Logger.log("POSTULATION: Sending email")
           userModel.findById(postulation.attorney, function(err,attorney){
             send.email(attorney.email, null, req.headers.host)
             console.log(attorney.email + " " + req.headers.host)
           })
           userModel.findById(postulation.createdBy, function(err,seeker){
             send.email(seeker.email, null, req.headers.host)
             console.log(seeker.email + " " + req.headers.host)
           })
        return res.status(200).send({ message:'postulation updated', status: postulation.status });
      })
      .catch(err => {
        return res.status(401).send({a: "unable to update the database", msg: err.message});
      });
    });
},



}