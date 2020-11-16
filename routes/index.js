const express = require('express');
const router = express.Router();
const checkLogin = require('../middleware/checklogin')


//Log in
router.get('/home', (req,res) => {
    res.send('This is the Welcome page');
});


//Register
router.get('/register', (req, res) => {
    res.send('This is the Sign up page');
});


module.exports = router;
//Dashboard
router.get('/dashboard', checkLogin,(req, res) => {
    res.send('Dashboard');
})

