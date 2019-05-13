const appModel = require('../models/appearances');
const postModel = require('../models/postulations');
const send = require('../services/sendmail');
const Logger = require("cute-logger")

module.exports = {

create: function(req, res, next){ // Pasar en el body el id de appearance (frontend)
  const payload = req.body;
   console.log(payload)
  postModel.find({ appearanceId: payload.appearanceId, userId: payload.userId }, function(err, result) {
     if(err){
       return res.json(err)
     }

     if(result.length > 0){
      return res.json({status: 400, message: "user is already postulated"})
     } else {
      const postulations = new postModel(payload);
        postulations.save()
    .then(postulations => {
      return res.json({status:200, message: "postulations created", data: {postulations: postulations}});
    })
    .catch(err => {
      return res.status(400).send("unable to save to database => "+err);
    });
     }
  })
},

delete: function(req, res, next){ // Pasar en el body el id de appearance (frontend)
  const payload = req.body;

  
  postModel.deleteOne({ appearanceId: payload.appearanceId, userId: payload.userId }, function(err, result) {
     if(err){ return res.json(err) }
     if(result.deletedCount < 1){ return res.json({status: 400, message: "No postulation found" }) } 

     else {
      return  res.json({status: 200, message: "postulation deleted", deletedCount: result.deletedCount})
     }
  })
},

get: function(req, res, next){
  postModel.find({ status: 'pending' }, function(err, result) {
      return res.json({status:200, data: result});
    })
},

update: function(req, res, next){
  postModel.findById(req.body.postulationId, function(err, postulation) {
    if (!postulation){ return next(new Error('Could not load Document')) }
      postulation.status = req.body.status;
      postulation.save()
        .then(postulation => {
        Logger.log("POSTULATION: Sending email")
        
          let idAttorney = req.body.userId;
          let idSeeker;

        send.email(user.email, null, req.headers.host)
        return res.status(200).send({ message:'postulation updated', status: postulation.status });
      })
      .catch(err => {
        return res.status(401).send("unable to update the database");
      });
    });
},



}