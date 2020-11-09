var Account = new Schema({
    
});

var options = {
    errorMessages: {
        UserExistsError: 'Email already exists',
        IncorrectUsernameError: 'Email does not exist',
        IncorrectPasswordError: 'Password is incorrect'
    }
};

Account.plugin(passportLocalMongoose, options);