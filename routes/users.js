const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const utilitis = require('../utilitis/cin');
const passport = require('passport');

router.get('/login', (req, res) => res.render('login', {title:'Login'}));

router.get('/register', (req, res) => res.render('register', {title:'Register'}));

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
               if(user){
                   errors.push({msg: 'CIN Is Already Registred'});
                   res.render('register', {
                       errors,
                       name,
                       lastname,
                       email,
                       title: 'Register'
                   });
               }else{ // cin not registred
                   User.findOne({email: email})
                       .then((user)=>{
                           console.log(user);
                           if(user){ //user already exists and cin not registred
                               errors.push({msg: 'Email Is Already Registred'});
                               res.render('register', {
                                   errors,
                                   name,
                                   lastname,
                                   email,
                                   cin,
                                   title:'Register'
                               });
                           }else { //user doesnt exxist neither cin
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
                               //hash password
                               bcrypt.genSalt(10, (err, salt) => {
                                   bcrypt.hash(newUser.password, salt, (err,hash)=>{
                                       if (err)
                                           throw err;
                                       newUser.password = hash;
                                       newUser.save()
                                           .then(user => {
                                               console.log(user);
                                               req.flash('success_msg','You are now register , you can login');
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
    console.log(req.body);
  passport.authenticate('local', {
      successRedirect : '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login')
});


module.exports = router;
