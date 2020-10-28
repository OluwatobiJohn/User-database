const express = require('express');
const router = express.Router();


//Log in
router.get('/', (req,res) => {
    res.send('This is the Welcome page');
});


//Register
router.get('/register', (req, res) => {
    res.send('This is the Sign up page');
});

module.exports = router;