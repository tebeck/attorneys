const userModel = require('../models/users');
const stripe = require('stripe')('sk_test_ZGEymtkcwjXSaswUlv4nZJeu002Le9D64P');
const appearanceModel = require('../models/appearances');
const notificationAlerts = require('../alerts/notification.alerts')


module.exports = {

  getStripeInfo: function(req, res, next){
   const request = require('request')
	  request.post('https://connect.stripe.com/oauth/token', 
      { json: 
        { client_secret: 'sk_test_ZGEymtkcwjXSaswUlv4nZJeu002Le9D64P',
		       code: req.body.code,
		       grant_type: 'authorization_code' } }, (error, response, body) => {
      if (error) { console.error(error) }


       userModel.updateOne( { "_id": req.body.userId},
         {$set: { stripe_user_id: response.body.stripe_user_id } } )  	
          .then(obj => {

           return res.status(200).send({message: "Your Stripe ID has been successfully created.", status: 200})
          })
          .catch(err => {
            console.log('Stripe: Error: ' + err);
          })
	  })
  },


  createNewCreditCard: function(req, res, next){
    userModel.findById(req.body.userId, function(err, user){
      if(err){return console.log(err)}
      if(user.stripe_customer_id){
        stripe.customers.createSource(user.stripe_customer_id, {source: req.body.id,});
          userModel.updateOne({"_id": req.body.userId},
           { $push:
             {"cards": { "id": req.body.id,"last4":req.body.card.last4,"brand": req.body.card.brand}}
           })
            .then(obj => {
              console.log('Stripe: New credit card added successfully');
              console.log(obj)
              return res.status(200).send({message: "Credit card added successfully!", status: 200})})
            .catch(err => { console.log('Error: ' + err)})
        } else {
          // create customer
        stripe.customers.create({ email: req.body.email, source: req.body.id, description: "testing..."},
          function(err, customer) {
            userModel.updateOne({ "_id": req.body.userId},
               { $set: {"stripe_customer_id": customer.id},"cards": { "id": req.body.id,"last4":req.body.card.last4,"brand": req.body.card.brand}}) 
            .then(obj => {
               console.log('Stripe: New customer added successfully');
               console.log(obj)
               return res.status(200).send({message: "Stripe: Credit card added!", status: 200})})
             .catch(err => { console.log('Error: ' + err)})
          })}
        })
      },

  setDefaultCard: function(req, res, next){
    userModel.find({"_id":req.body.userId}, function(err, user){
      stripe.customers.update(user[0].stripe_customer_id, {default_source: req.body.defaultCard})
       .then(obj => {
        return res.status(200).send({message: "Stripe: default card updated", status: 200})})
       .catch(err =>console.log("Error: " + err) )
    }
  )},

  retriveCustomer: function(req, res, next){
    userModel.find({"_id":req.body.userId}, function(err, user){
      if(err){console.log(err)}
      
      if(user[0].stripe_customer_id){
        stripe.customers.retrieve(user[0].stripe_customer_id, function(err, customer) {
            if(err){ 
              return res.status(500).send({"error": err})
            }
            return res.status(200).send({"customer": customer, status: 200});
          });
      } else {
        return res.status(200).send({"message": "no customer found"})
      }
     }

      
    
  )},
  
  createCharge: function(req, res, next){

    appearanceModel.findOne({_id: req.body.appId}, function(err, appearance){
      if(err){ return console.log("Stripe: Charge error: " + err) };

        userModel.findOne({_id: appearance.attorneyId}, function(err, attorney){
          if(err){ return console.log("Stripe: Charge error: " + err) };
          let customerId = attorney.stripe_customer_id;
          let attorneyId = attorney._id;
            
          stripe.charges.create({ amount: 7500, currency: "usd", customer: customerId })
              .then(
                function(charge) {
                  userModel.updateOne( { "_id": attorneyId},
                   {$push: { "transactions": { amount: "-$75", type: "Request" },
                            "notifications": { type: notificationAlerts.APPEARANCE_PAYMENT_SUBMITTED, msg: "finished" }
                           }})

                   .then(obj => { console.log('Stripe: Charge from record: '+ attorney.email +' added. Amount: $75') })
                   .catch(err => { console.log('Error: ' + err) })
                }
              )

              userModel.findOne({_id: appearance.subscription.seekerId}, function(err, seeker){
                if(err){ return console.log("Stripe: Charge error: " + err) };
                let appearingAccount = seeker.stripe_user_id;
                let seekerId = seeker._id;

              stripe.transfers.create({ amount: 5000, currency: "usd", destination: appearingAccount })
                .then(function(transfer) {
                    console.log("Stripe: Transfer for "+seeker.email+" completed. Amount: $50")
                       
                        userModel.updateOne( { _id: seekerId}, 
                          { $push:
                           {
                            "transactions": { amount: "+$50", type: "Appearance" },
                            "notifications":{ type: notificationAlerts.APPEARANCE_PAYMENT_RECIVED, msg: "finished" } 
                           }
                          })
                      .then(obj => { console.log('Stripe: All transactions successfully done.'); })
                      .catch(err => { console.log('Error: ' + err)})               
                  })
                })

        })
        
      })
    } // create charge finish

   } // Module exports









