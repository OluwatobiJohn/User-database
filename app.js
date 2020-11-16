const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport') (passport);
require('dotenv/config');


// Mongoose Connection
mongoose.connect( process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('MongoDB connected');
});


//Body Parser Middle ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
// Import Routes
const notesRoute = require('./routes/notes');
app.use('/notes', notesRoute)

//Port Listen
app.listen(3000, () => {
    console.log('App is listening on Port 3000');
});