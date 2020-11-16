const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = function(passport) {
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done) => {
            
            //Check email

            User.findOne({email: email})
            .then((user) => {
                if(!user) {
                    return done(null, false, {message: 'Email is not Registered'})
                }
                //Check Password match
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                       const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        }, 
                        process.env.JWT_KEY, 
                        {
                            expiresIn: "2h"
                        })
                        return done(null, user, {token: token});
                    } else {
                        return done(null, false, {message: 'Password is incorrect'});
                    }
                })
            })
            .catch((err) => console.log(err))
        })
    )
    passport.serializeUser((user, done) => {
       return done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
            done(err, user)
        });
    });
};