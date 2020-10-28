const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');


// Mongoose Connection
mongoose.connect( process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('MongoDB connected');
});


//Body Parser Middle ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


//Port Listen
app.listen(3000, () => {
    console.log('App is listening on Port 3000');
});