const appModel = require('../models/appearances');
const postModel = require('../models/postulations');
const userModel = require('../models/users');
const send = require('../services/sendmail');
const Logger = require("cute-logger")
const upload = require('../services/file-upload');
const singleUpload = upload.single('proof')

module.exports = {

create: function(req, res, next){ // Pasar en el body el id de appearance (frontend)
  const payload = req.body;

  appModel.findById(payload.appearanceId, function(err,result){
    if(err){ return res.status(500).send(err) }
    let attorneyId = result.attorneyId;

   postModel.find({appearanceId: payload.appearanceId, seekerId: payload.userId}, function(err, result) {
     if(err){ return res.status(500).send(err) }
     if(result.length > 0){ return res.status(409).send({message: "user is already postulated"}) }
     
     const postulations = new postModel(payload);
     postulations.seekerId = payload.userId;
     postulations.attorneyId = attorneyId;
     const subject = 'New postulation';
     const text = 'test text create postulation';

     postulations.save()
      .then(postulations => {
          userModel.findById(postulations.attorneyId, function(err,user){
            send.email(user.email, subject, text)
          })
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
  postModel.find({}, function(err, result) {
      return res.json({status:200, data: result});
    })
},

getOwn: function(req, res, next){
  postModel.find({ status: 'accepted', seekerId: req.body.userId }, function(err, result) {
      return res.status(200).send({data: result});
    })   
  sort:{ createdAt: -1}
},

uploadProof: function(req, res, next){
  const userId = req.body.userId;
  singleUpload(req, res, function(err, some) {
    if (err) {
      console.error(err);
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }
    console.log(req.file)
    return res.json({status: 200, location: req.file.location, _id: userId})
  });
},

completed: function(req, res, next){ // send postulationId
  const payload = req.body;

  postModel.findById(req.body.postulationId, function(err, postulation){
    if (err){ return res.status(500).send({message: err.message}) }
    if (!postulation){ return res.status(409).send({message: "Not found"}) }
    if (postulation.seekerId !== payload.userId) {return res.status(409).send({message: "Not allowed to update this postulation"})}
     const subject = 'Work done!';
     const text = 'test text postulation completed';
      postulation.status = 'completed';
      postulation.save()
        .then(postulation => {
          Logger.log("POSTULATION CONFIRMED: Sending email")
           userModel.findById(postulation.attorneyId, function(err,attorney){
             send.email(attorney.email, subject, text)
             Logger.log(attorney.email + " " + subject)
           })
           userModel.findById(postulation.seekerId, function(err,seeker){
             send.email(seeker.email, subject, text)
             Logger.log(seeker.email + " " + subject)
           })
        return res.status(200).send({ message:'Work completed', status: postulation.status });
      })
      .catch(err => {
        return res.status(401).send({a: "unable to update the database", msg: err.message});
      });
    });
},

acceptOrReject: function(req, res, next){
  let payload = req.body;
  postModel.findById(payload.postulationId , function(err, postulation) {
    if (err){ return res.status(500).send({message: err.message}) }
    if (!postulation){ return res.status(409).send({message: "Not found"}) }
    if (postulation.attorneyId !== payload.userId) {return res.status(409).send({message: "Not allowed to update this postulation"})}
    
     const subject = 'Accepted or Rejected!';
     const text = 'test text postulation status';
      postulation.status = req.body.status;
      postulation.save()
      .then(postulation => {
         Logger.log("POSTULATION UPDATED: Sending email")
           userModel.findById(postulation.attorneyId, function(err,attorney){
             send.email(attorney.email, subject, text)
             console.log(attorney.email + " " + req.headers.host)
           })
           userModel.findById(postulation.seekerId, function(err,seeker){
             send.email(seeker.email, subject, text)
             console.log(seeker.email + " " + req.headers.host)
           })
        return res.status(200).send({ message:'postulation updated', status: postulation.status });
      })
      .catch(err => {
        return res.status(401).send({a: "unable to update the database", msg: err.message});
      });
    });
},


rateAttorney: function(req, res, next){ // Pass rating number, postulationId, comment
  const payload = req.body;
  postModel.findById(payload.postulationId, function(err, postulation){
    if (err){ return res.status(500).send({message: err.message}) }
    if (!postulation){ return res.status(409).send({message: "Not found"}) }
    if (postulation.seekerId !== payload.userId) {return res.status(409).send({message: "Not allowed to rate"})}
    if (postulation.status !== 'completed'){ return res.status(409).send({ message: "This postulation is not completed" }) }  
     
     const subject = 'You been rated';
     const text = 'this is test rate postulation attorney';

  userModel.findById(postulation.attorneyId, function(err, attorney){
      const reviewNumber = attorney.reviewTotal; console.log(reviewNumber);


      
  userModel.update({_id: attorney._id},
    { "$push": {'reviews': {
            seekerId: postulation.seekerId,
            appearanceId: postulation.appearanceId,
            comment: payload.comment,
            postulationId: postulation._id,
            rating: payload.rating,
            reviewTotal: attorney.reviewTotal + 1
        }
      }
    },
    { upsert:true },
    function(err,numAffected) {
      return res.json(numAffected)
    }
);




      // attorney.save()
      //   .then(attorney => {
      //    Logger.log("YOU BEEN RATED: Sending email")
      //     send.email(attorney.email, subject, text)
      //   return res.status(200).send({ message:'Attorney has been rated', status: attorney });
      // })
      // .catch(err => {
      //   return res.status(401).send({a: "unable to update the database", msg: err.message});
      // });
    });
})
},


rateSeeker: function(req, res, next){
  console.log("re")
},



}