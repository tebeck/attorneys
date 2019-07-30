const userModel = require('../models/users');
const stripe = require('stripe')('sk_test_ZGEymtkcwjXSaswUlv4nZJeu002Le9D64P');
const appearanceModel = require('../models/appearances');

module.exports = {

  getStripeInfo: function(req, res, next){
   const request = require('request')

	request.post('https://connect.stripe.com/oauth/token', {
	  json: { client_secret: 'sk_test_ZGEymtkcwjXSaswUlv4nZJeu002Le9D64P',
		      code: req.body.code,
		      grant_type: 'authorization_code'}
	    }, (error, response, body) => {
    if (error) { console.error(error) }
    userModel.updateOne( { "_id": req.body.userId},{$set: {
	     // access_token: response.body.access_token,
	     // refresh_token: response.body.refresh_token,
	     // stripe_publishable_key: response.body.stripe_publishable_key,
	     stripe_user_id: response.body.stripe_user_id
 		}
 		})  	
      .then(obj => {
        console.log('Updated - ' + obj);
          return res.status(200).send({message: "Update OK", status: 200})
         })
        .catch(err => {
           console.log('Error: ' + err);
      })
	})
  },

  storeToken: function(req, res, next){
    userModel.updateOne( { "_id": req.body.userId},{$set: {stripe_token_id: req.body.id,}})    
      .then(obj => {
        console.log('Updated - ' + obj);
        return res.status(200).send({message: "Update OK", status: 200})})
      .catch(err => { console.log('Error: ' + err)})
  },



  createCharge: function(req, res, next){
    console.log("Creating charges to: Appearing Attorney + Esquired")

    appearanceModel.findOne({_id: req.body.appId}, function(err, appearance){
      if(err){return console.log(err)};
       
       userModel.findOne({_id: appearance.subscription.seekerId}, function(err, seeker){
          if(err){return console.log(err)};
          let appearingAccount = seeker.stripe_user_id;
       })
       userModel.findOne({_id: appearance.attorneyId}, function(err, attorney){
          if(err){return console.log(err)};
          let recordAccount = attorney.stripe_token_id;
       })
    })

      stripe.charges.create({
        amount: 10000,
        currency: "usd",
        source: recordAccount,
        transfer_group: "{ORDER11}",
      }).then(function(charge) {
          console.log("finished charge")
          console.log(charge)
      });

      stripe.transfers.create({
        amount: 7500,
        currency: "usd",
        destination: appearingAccount,
        transfer_group: "{ORDER11}",
      }).then(function(transfer) {
          console.log("finished transfer to appearing")
          console.log(transfer)
      });


  }



}









