const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../config/passport') (passport);



//Get Log in and Sign Up
router.get('/login', (req,res) => {
    res.send('This is the login page');
});

router.get('/register', (req, res) => {
    res.send('This is the Sign up page');
});


//Post Log in and Sign up
router.post('/register', (req, res) => {
  
    const {name, email, password, password2} = req.body;
    const errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({msg: 'All fields must be entered'});
    };

    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    };

    if (password.length < 6) {
        errors.push({msg: 'Password must be atleast 6 characters'})
    };

    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
    }  else {
        //validation
        User.findOne({email: email}).exec((err, user) => {

            if (user) {
                errors.push({msg: 'Email has already been registered'});
                res.json({errors: errors});
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });

                const saltRounds = 10;
                const passwordText = newUser.password;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(passwordText, salt, (err, hash) => {
                        if (err) throw err
                        //save password to hash
                        newUser.password = hash;
                        //save user
                        newUser.save()
                        .then((value) => {
                            console.log(value);
                            res.redirect('/users/login');
                        })
                    });
                });

            };
        });
    };


});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        faliureRedirect: '/users/login',
    }) (req, res, next);
});


//Get Log out
router.get('/logout', (req, res) => {

});

module.exports = router;