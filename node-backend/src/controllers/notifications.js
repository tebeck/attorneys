const appearanceModel = require('../models/appearances');


module.exports = {

	// Reminders :
		//Notification for: APPEARING / to: Upload verdict appearing attorney.
		//Notification for: APPEARING / to: Rate attorney of record.
		//Notification for: RECORD / to: Rate appearing attorney.
		//Notification for: RECORD / to: Mark as finished appearance.

 runReminders: function(req, res, next){
  console.log("CRON REMINDERS: Start.")
  
  appearanceModel.find({}, function(err, app){	
  	if(app){
      app.map(function(app) {
      
	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();
	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;
	    return [year, month, day].join('-');
	}
    
    var date = new Date().toString();
    var formatted = date.split(' ').slice(1, 4).join(' ');

    // reminder upload verdict appearing attorney

      if(app.status === "accepted" && app.hearingDate < formatDate(formatted) ){

        userModel.find({_id: app.subscription.seekerId}, function(err, seeker){
          var subject = "Reminder upload verdict"
          var text = "Please you need to upload your verdict for appearance " + app.caseName
          send.email(seeker[0].email, subject, text)  
            userModel.updateOne({_id: app.subscription.seekerId},
              { $push:{ "notifications": {"type": "Please don't forget to upload the verdict about the appearance called: " + app.caseName  }} }, function(err, user){
                console.log(user)
                console.log(err)
              })
          console.log("MAIL SENT-> " + subject + " to: " + seeker[0].email + "<- must be the appearing")
        })


        }

         // notification attorney of record rate

        if(app.status === "completed"){
          userModel.find({_id: app.attorneyId}, function(err, attorney){
          
          if(app.status === "completed" &&  app.subscription.attorneyRate === null){
              userModel.updateOne({_id: app.attorneyId},
                { $push:{ "notifications": {"type": "Don't forget to rate "+ attorney.firstName +" for the work done in "+ app.caseName+"." }} }, function(err, user){
                  var subject = "Reminder rate attorney of record"
                  var text = "Don't forget to rate "+ attorney.firstName +" for the work done in "+ app.caseName+"."
                  send.email(user.email, subject, text)  
                  
                  console.log("MAIL-SENT-> "+subject+" to -> " + user.email)
                })
          }
         })

        }
            // notification appearing attorney rate

         if(app.status === "completed" && app.subscription.seekerRate === null){
             userModel.find({_id: app.seekerId}, function(err, seeker){
              userModel.updateOne({_id: app.attorneyId},
                { $push:{ "notifications": {"type": "Don't forget to rate "+ seeker.firstName +" for the work done in "+ app.caseName+"." }} },
                 function(err, user){
                  var subject = "Reminder rate appearing attorney"
                  var text = "Don't forget to rate "+ seeker.firstName +" for the work done in "+ app.caseName+"."
                  send.email(user.email, subject, text)  

                  console.log("MAIL-SENT-> "+subject+" to -> " + user.email)
                })
          })}


        
        

        // reminder mark as finished attorney of record

        if(app.status === "completed" && app.subscription.information){
           userModel.updateOne({_id: app.attorneyId},
            { $push:{ "notifications": {"type": "Don't forget to mark as finished the appearance: "+ app.caseName+"." }} })   

           .then( 
              userModel.findOne({_id: app.attorneyId},function(err, user){
                var subject = "Reminder mark as finished"
                var text = "Don't forget to mark as finished the appearance: "+ app.caseName+"."
                send.email(user.email, subject, text)  
                console.log("MAIL-SENT-> "+subject+" to -> " + user.email)
              })
          )}
    })
  }

})
console.log("CRON REMINDERS: End.")
},


  // Payments :
    //Notification for: APPEARING / to: Upload verdict appearing attorney.
    //Notification for: APPEARING / to: Rate attorney of record.
    //Notification for: RECORD / to: Rate appearing attorney.
    //Notification for: RECORD / to: Mark as finished appearance.


runPayments: function(err, res, next){

  console.log("CRON PAYMENTS: Start")
  
  appearanceModel.find({}, function(err, app){



      for (var i =0 ; i <= app.length; i++) {
          
      if(app[i] && app[i].subscription && app[i].subscription.completedDay){
      
      var today = app[i].subscription.completedDay
      var ms = app[i].subscription.completedDay.getTime() + 86400000;
      var tomorrow = new Date(ms);
      

      if(app[i].status === "completed" && today < tomorrow ){

        console.log("transf")

            if(err){ return console.log("Stripe: Charge error: " + err) };
              

            console.log("STRIPE: Creating record charge (75usd)")
              userModel.findOne({_id: app[i].attorneyId}, function(err, attorney){
                if(err){ return console.log("Stripe: Charge error: " + err) };
                let customerId = attorney.stripe_customer_id;
                let attorneyId = attorney._id;
                  
                  stripee.charges.create({
                    amount: 7500,
                    currency: "usd",
                    customer: customerId
                    ,})
                    .then(
                      function(charge) {
                       console.log("Stripe: Charge completed. Details below:")
                       userModel.updateOne( { "_id": attorneyId}, {
                        $push: {
                          "transactions":{amount: "-$75", type: "Request"} }
                        }) 
                       .then(obj => {
                         console.log('Stripe: Charge added successfully to database');
                         // return res.status(200).send({message: "Stripe: Update OK", status: 200})
                       })
                       .catch(err => { console.log('Error: ' + err)
                       })
                    })
             
                console.log("Stripe: Creating appearing transfer from Esquired (75usd)")
                 
                 if(app[i] && app[i].subscription){

                 userModel.findOne({_id: app[i].subscription.seekerId}, function(err, seeker){
                  if(err){ return console.log("Stripe: Charge error: " + err) };
                  let appearingAccount = seeker.stripe_user_id;
                  let seekerId = seeker._id;

                    stripee.transfers.create({
                      amount: 5000,
                      currency: "usd",
                      destination: appearingAccount,
                      transfer_group: "{ORDER11}",
                    }).then(function(transfer) {
                        console.log("Stripe: Transfer completed. Details below:")

                         userModel.updateOne( { _id: seekerId}, { 
                          $push: {
                           "transactions":{amount: "+$50", type: "Appearance"} }
                          }) 
                          .then(obj => {
                            console.log(obj)
                            console.log('Stripe: Transfer added successfully to database');
                            // return res.status(200).send({message: "Stripe: Update OK", status: 200})
                          })
                          .catch(err => { console.log('Error: ' + err)})               
                      })

                })}


           })

    }
  }

      }
       })

  console.log("CRON PAYMENTS: End.")
  }



}




