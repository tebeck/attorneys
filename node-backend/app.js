const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./src/routes/users');
const ip = require("ip");
const mongoose = require('mongoose')
const isvalid = require('./src/middlewares/isvalid');
const app = express();
const port = 6200;
require('dotenv').config();

// DB INSTANCE
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useCreateIndex: true })

const filesRoute = require('./src/routes/files');
const adminRoutes = require('./src/routes/admins');
const appearancesRoutes = require('./src/routes/appearances');
const postulationsRoutes = require('./src/routes/postulations');
const notificationsRoutes = require('./src/routes/notifications');

// MIDDLEWARES
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTES
app.use('/users', users);
app.use('/files', filesRoute);
app.use('/admins', isvalid.admin, adminRoutes);
app.use('/appearances',isvalid.user ,appearancesRoutes);
app.use('/postulations',isvalid.user ,postulationsRoutes);
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
