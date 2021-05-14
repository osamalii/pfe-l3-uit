const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Token = require('../models/Token');

const bcrypt = require('bcryptjs');
const utilitis = require('../utilitis/cin');
const hashPass = require('../utilitis/hashPass');
const passport = require('passport');
const emailVerification = require("../utilitis/emailVerification");


router.get('/login', (req, res) => res.render('login', {user:null,title:'Login'}));

router.get('/register', (req, res) => res.render('register', {user:null,title:'Register', errors:[]}));

router.post('/register', (req, res) => {
    const { name,lastname,email,password,password2,gender,birthDate,cin} = req.body;
    let errors = [];
    console.log(req.body);
    if(!name || !lastname || !email || !password || !password2 || !gender || !birthDate || !cin) {
       errors.push({msg: 'please fill in all fields'});
    }
    if(password !== password2){
       errors.push({msg: 'passwords do not match'});
    }

    if(password.length < 8){
       errors.push({msg:'password should be at least 8 characters'});
    }
    if(!utilitis.cin2City(cin)){
        errors.push({msg:'invalid CIN'});
    }
    if(errors.length > 0 ){
       console.log(errors);
       res.render('register', {
          errors,
          name,
          lastname,
          email,
           cin,
           title: 'Register'
       });
    }else {
        User.findOne({cin: cin})
            .then(user => {
               if(user ){
                   if( user.isVerified){
                       errors.push({msg: 'CIN Is Already Registered'});
                       res.render('register', {
                           errors,
                           name,
                           lastname,
                           email,
                           title: 'Register'
                       });
                   }else {
                           errors.push({msg: 'Please Verify You Email'});
                           res.render('./partials/verifyYourEmail.ejs');
                           return;
                   }


               }else{ // cin not registred

                   User.findOne({email: email})
                       .then((user)=>{
                           console.log(user);
                           if(user){ // User Already Exists And CIN Not Registered
                               errors.push({msg: 'Email Is Already Registered'});
                               res.render('register', {
                                   errors,
                                   name,
                                   lastname,
                                   email,
                                   cin,
                                   title:'Register'
                               });
                           }else { //user doesnt exist neither cin
                               const newUser = new User({
                                   name,
                                   lastname,
                                   email,
                                   password,
                                   birthDate,
                                   gender,
                                   cin,
                                   AccountType: 'patient'
                               });
                               console.log(newUser);
                               emailVerification(email, newUser._id, req.headers.host, 'verify');

                               //hash password

                               bcrypt.genSalt(10, (err, salt) => {
                                   bcrypt.hash(newUser.password, salt, (err,hash)=>{
                                       if (err)
                                           throw err;
                                       newUser.password = hash;
                                       newUser.save()
                                           .then(user => {
                                               console.log(user);
                                               req.flash('success_msg','Complete registration by verifying your email');
                                               res.redirect('/users/login');
                                           })
                                           .catch(err => console.log(err));
                                   })
                               })
                           }
                       });
               }
            });

    }
});

//login

router.post('/login',(req, res, next)=>{
  passport.authenticate('local', {
      successRedirect :'/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login')
});


router.get('/requestresetpassword', function(req, res){
    res.render('partials/resetPassword');
});

router.post('/requestresetpassword', function(req, res){
    console.log(req.body.email);
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                console.log('user foud in database');
                emailVerification(user.email, user._id, req.headers.host, 'reset');
            }
            res.redirect('/');
        })
});

router.get('/requestresetpassword/:token', function (req, res) {
    console.log(req.params);
    Token.findOne({ token: req.params.token, T_type: 'reset'})
        .then(token => {
            console.log(token);
            if(token){
                res.render('partials/resetPasswordForm', {token: token.token});
            }else {
                res.redirect('/');
            }
        });
});

router.post('/resetpassword', function (req, res) {
    console.log(req.body);
    if(req.body.password1 === req.body.password2){
        Token.findOne({token: req.body.token})
            .then(token => {
                if(token){
                    User.findOne({_id: token._userId})
                        .then(user => {
                            if (user) {
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(req.body.password1, salt, (err, hash) => {
                                        if (err)
                                            throw err;

                                        User.updateOne({_id: token._userId}, {password: hash})
                                            .then(user => {
                                                console.log(user);
                                                req.flash('success_msg','Password changed, log in with your new password');
                                                res.redirect('/users/login');
                                            })
                                    });
                                });

                            }
                        })
                }
            })
    }
});

module.exports = router;
