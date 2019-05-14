// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./src/routes/users');
const ip = require("ip");
const mongoose = require('mongoose')
const port = 6200;
require('dotenv').config();

// DB Instance
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useCreateIndex: true })

// ROUTES
const adminRoutes = require('./src/routes/admins');
const appearancesRoutes = require('./src/routes/appearances');
const postulationsRoutes = require('./src/routes/postulations');
// const filesRoute = require('./src/routes/files');

// MIDDLEWARES
const isvalid = require('./src/middlewares/isvalid');

// App Instance
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use('/products',validate.user ,productRoutes);
// app.use('/users/admin', validate.user, users)
// app.use('/files', filesRoute);
app.use('/users', users);
app.use('/admins', isvalid.admin, adminRoutes); // isvalid.admin 
app.use('/appearances',isvalid.user ,appearancesRoutes);
app.use('/postulations',isvalid.user ,postulationsRoutes);

// Backend status
app.get('/', function(req, res){
    res.json({
    	state: 200,
    	message: "running",
    	host: ip.address() + ':'+ port ,
    })
});

console.log("Running in: "  + process.env.NODE_ENV);

// Execute App
app.listen(process.env.PORT || port)
