var express = require('express');
var cors = require('cors');
var app = express();
const bodyParser = require('body-parser');
const users = require('./src/routes/users');
const stripe = require('./src/routes/stripe');
const ip = require("ip");
const mongoose = require('mongoose')
const isvalid = require('./src/middlewares/isvalid');
const port = 6200;
var request = require('request')
const appearanceModel = require('./src/models/appearances');
const send = require('./src/services/sendmail');
const notificationsController = require('./src/controllers/notifications');
const userModel = require('./src/models/users');
const stripee = require('stripe')('sk_test_ZGEymtkcwjXSaswUlv4nZJeu002Le9D64P');

app.use(cors())
app.options('*', cors()) // include before other routes

var cron = require('node-cron');


require('dotenv').config();

// DB INSTANCE
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })

const filesRoute = require('./src/routes/files');
const adminRoutes = require('./src/routes/admins');
const appearancesRoutes = require('./src/routes/appearances');


cron.schedule(process.env.CRON_REMINDERS_TIME, () => { app.listen(notificationsController.runReminders()) })
cron.schedule(process.env.CRON_PAYMENTS_TIME, () => { app.listen(notificationsController.runPayments()) })

// MIDDLEWARES
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTES
app.use('/users', users);
app.use('/stripe', stripe);
app.use('/files', filesRoute);
// app.use('/admins', isvalid.admin, adminRoutes);
app.use('/admins', adminRoutes); // AGREGAR EL ISVALID.ADMIN PARA PROD!!
app.use('/appearances',isvalid.user ,appearancesRoutes);


// BACKEND CHECK
app.get('/', function(req, res){ 
  // res.json({
  //   state: 200,
  //   message: "running",
  //   host: ip.address() + ':'+ process.env.PORT || port ,
  //   stage:  process.env.NODE_ENV
  //   })

function amount(item){
  return item.reviews;
}

function sum(prev, next){
  console.log(prev[0].rating)
  return Number(prev.rating) + Number(next.rating);
}


	userModel.find({}, function(err, user){
		var ratings = user.map(amount).reduce(sum);		
		console.log(ratings)
 	})
})


console.log("Running");

// EXECUTE
app.listen(process.env.PORT || port)
