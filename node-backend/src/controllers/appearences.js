const appModel = require('../models/appearences');
const postulationsModel = require('../models/postulations');

module.exports = {

get: function(req, res, next){
  appModel.find(function (err, data){
    if(err){
      console.log(err);
    } else {
      res.json(data);
    }
  }).sort({createdAt:-1}); 
},

create: function(req, res, next){
  const payload = req.body;
  const appearence = new appModel(payload);
      appearence.save()
    .then(appearence => {
    res.json({status:200, message: "appearence created", data:{appearence: appearence}});
    })
    .catch(err => {
      console.log("Unable to save to datbase")
      console.log(appearence)
      res.status(400).send("unable to save to database => "+err);
    });
},
update: function(req, res, next){
     appModel.findById(req.body.id, function(err, appearence) {
    if (!appearence)
      return next(new Error('Could not load Document'));
    else {
      appearence.title = req.body.title;
      appearence.description = req.body.description;
      appearence.status = req.body.status;
      
      appearence.save().then(appearence => {
          return res.json({status: 200, message:'appearence updated', data: appearence});
      })
      .catch(err => {
          return res.status(400).send("unable to update the database");
      });
    }
  });
},
delete: function(req, res, next){
  appModel.findByIdAndRemove({_id: req.body.id},
     function(err, appearence){
      if(err){
       return res.json(err)
      } else if(appearence) {
       return res.json({status:"success", message: "product deleted", data:{appearence: appearence}}) 
      } else {
       return res.json({status:"error", message: "cant find product", data:{appearence: appearence}}) 
      }
  });
},

getAccepted: function(req, res, next){
  appModel.find({ status: 'accepted' }, function(err, result) {
    if(err){
      console.log(err);
    } else {
      res.json(data);
    }
  }).sort({createdAt:-1}); 
},

}

