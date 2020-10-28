const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = function(passport) {
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done) => {
            
            //Check email

            User.findOne({email: email})
            .then((user) => {
                if(!user) {
                    return done(null, false, {message: 'email is not registered'})
                }
                //Check Password match
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Password is Incorrect'});
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