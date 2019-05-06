const appModel = require('../models/appearences');
const postModel = require('../models/postulations');

module.exports = {

postulate: function(req, res, next){ // Pasar en el body el id de appearence (frontend)
  const payload = req.body;
  
  postModel.find({ appearenceId: payload.appearenceId, userId: payload.userId }, function(err, result) {
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
      console.log("Unable to save to datbase")
      console.log(postulations)
      return res.status(400).send("unable to save to database => "+err);
    });
     }
  })
},

delete: function(req, res, next){ // Pasar en el body el id de appearence (frontend)
  const payload = req.body;

  
  postModel.deleteOne({ appearenceId: payload.appearenceId, userId: payload.userId }, function(err, result) {
     if(err){
       return res.json(err)
     } else if(result.deletedCount < 1){
       res.json({status: 400, message: "No postulation found" })
     } 
     else {
      return  res.json({status: 200, message: "postulation deleted", deletedCount: result.deletedCount})
     }
  })
},

get: function(req, res, next){
  const payload = req.body;

  postModel.find({ appearenceId: payload.appearenceId, userId: payload.userId }, function(err, result) {
      return res.json({status:200, data: result});
    })

},



}