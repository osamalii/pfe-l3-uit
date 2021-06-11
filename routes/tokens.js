const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Token = require('../models/Token');
const emailVerification = require("../utilitis/emailVerification");
const pageFieldsByLang = require('../utilitis/lang');


router.get('/confirmation/:token', function(req, res){
    console.log(req.params);
    Token.findOne({ token: req.params.token, T_type: 'verify'}, function (err, token) {
        if (!token) {
            console.log('We were unable to find a valid token. Your token my have expired.');
            req.flash('error_msg','We were unable to find a valid token. Your token my have expired.');
            // return;
        }else { // If we found a token, find a matching user
            User.findOne({ _id: token._userId }, function (err, user) {
                if (!user){
                    console.log('We were unable to find a user for this token.');
                    req.flash('error_msg','We were unable to find a user for this token.');
                    // return;
                }else{
                    if (user.isVerified) {
                        console.log('This user has already been verified.');
                        req.flash('error_msg','This user has already been verified.');
                        // return;
                    }else{
                        // Verify and save the user
                        user.isVerified = true;
                        user.save(function (err) {
                            if (err) {
                                req.flash('success_msg','error saving');
                            }
                        });
                        req.flash('success_msg','verified');
                    }
                }


            });
        }
        res.render("emailVerification",{
            lang:'en',
            footer: pageFieldsByLang('en', 'footer'),
            title:"email verification"
        });
    });
    // res.render('index',{user: req.user, title:'Home'})
});

router.post('/request', function (req, res) {
   console.log(req.body);
   User.findOne({email :req.body.email})
       .then(user => {
           if(user){
               emailVerification(user.email, user._id, 'verify');
           }
       });
   res.redirect("/users/login");
});

module.exports = router;
