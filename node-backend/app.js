// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./src/routes/users');
const ip = require("ip");
const mongoose = require('mongoose')
const configDB = require('./src/config/database');
const port = 6200;
require('dotenv').config();

// DB Instance
mongoose.connect(configDB.url,{ useNewUrlParser: true, useCreateIndex: true })

// ROUTES
const adminRoutes = require('./src/routes/admin');
// const productRoutes = require('./src/routes/products');
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
app.use('/admin', isvalid.user, adminRoutes);

// Backend status
console.dir ( ip.address())
app.get('/', function(req, res){
    res.json({
    	state: 200,
    	message: "running",
    	host: ip.address() + ':'+ port ,
    })
});


// Execute App
app.listen(process.env.PORT || port)
