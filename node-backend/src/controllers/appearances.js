const appearanceModel = require('../models/appearances');
const postulationsModel = require('../models/postulations');

module.exports = {

get: function(req, res, next){
  appearanceModel.find({'status': 'published'},function (err, data){
    if(err){ res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data });
  }).sort({ createdAt:-1 });
},

getOwn: function(req, res, next){
  const payload = req.body;
  appearanceModel.find({ attorneyId: payload.userId },function (err, data){
    if(err){ return res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: data })
  })
},
create: function(req, res, next){
  console.log(req.body)
  const payload = req.body;
  payload.attorneyId = payload.userId;
  const appearance = new appearanceModel(payload);
      appearance.save()
    .then(appearance => {
    res.status(200).send({message: "Appearance created", data:{appearance: appearance}});
    })
    .catch(err => {
      console.log("Unable to save to datbase")
      res.status(401).send("unable to save to database => "+err);
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

}

