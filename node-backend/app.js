const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./src/routes/users');
const stripe = require('./src/routes/stripe');
const ip = require("ip");
const mongoose = require('mongoose')
const isvalid = require('./src/middlewares/isvalid');
const app = express();
const port = 6200;
var request = require('request')
const appearanceModel = require('./src/models/appearances');
const send = require('./src/services/sendmail');
const userModel = require('./src/models/users');

var cron = require('node-cron');


require('dotenv').config();

// DB INSTANCE
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useCreateIndex: true })

const filesRoute = require('./src/routes/files');
const adminRoutes = require('./src/routes/admins');
const appearancesRoutes = require('./src/routes/appearances');
const notificationsRoutes = require('./src/routes/notifications');

const whitelist = [
 'https://esquired-frontend.herokuapp.com',
 'http://localhost:3000',
 'https://esquired-frontend.herokuapp.com',
 "http://172.22.15.246:3000",
 "http://172.22.15.246:6000"
 ]
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log("not allowed")
      callback(new Error('Not allowed by CORS'))
    }
  }
}



 // '*/10 * * * * *'
 // '* * * * *'
cron.schedule('* * 18 * *', () => {
  console.log("Sending reminder emails 18hs")
  appearanceModel.find({}, function(err, app){

    if(app){
      app.map(function(app) {

      if(app.attorneyId && app.subscription.seekerId && app.status == "completed"){
        if(app.subscription.verdictDocs === null || app.subscription.information === ""){
        userModel.find({_id: app.subscription.seekerId}, function(err, seeker){
          var subject = "Reminder upload verdict"
          var text = "Please you need to upload your verdict for appearance " + app.caseName
          send.email(seeker[0].email, subject, text)  
            userModel.updateOne({_id: app.subscription.seekerId},
              { $push:{ "notifications": {"type": "You need to fill you verdict" }} }, function(err, user){
                console.log(user)
                console.log(err)
              })
          console.log("MAIL SENT-> " + subject + " - to: " + seeker[0].email)
        })
        }
        }
      })
    }
  })
});


// MIDDLEWARES
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTES
app.use('/users', users);
app.use('/stripe', stripe);
app.use('/files', filesRoute);
// app.use('/admins', isvalid.admin, adminRoutes);
app.use('/admins', adminRoutes); // AGREGAR EL ISVALID.ADMIN PARA PROD!!
app.use('/appearances',isvalid.user ,appearancesRoutes);
app.use('/notifications',isvalid.user ,notificationsRoutes);


// BACKEND CHECK
app.get('/', function(req, res){ res.json({
    state: 200,
    message: "running",
    host: ip.address() + ':'+ process.env.PORT || port ,
    stage:  process.env.NODE_ENV
    })
});

console.log("Running");

// EXECUTE
app.listen(process.env.PORT || port)
