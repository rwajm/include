const express = require("express");
const router = express.Router();
const admin = require('../model/admin');
const passport = require('passport');
const local = require('../auth/localStrategy');
//html
// router.get('/sigin', async(req, res) => {
//     res.render('signin/login');
// })

// http://localhost:8080/login
router.post('/login', passport.authenticate('local', {
    //html
    // successRedirect : '/',
    // failureRedirect : '/signin'

    //react
    successFlash : 1,
    failureFlash : 0
}));

// http://localhost:8080/logout
router.post('/logout', (req, res, next) => {
    req.logOut((err) => {
        if(err)
            return next(err);
    })
    //html
    //res.redirect('/');

    //react에서는?
})

module.exports = router;