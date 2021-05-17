const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const City = require('../models/City');
const User = require('../models/User');
const createUser = require('../utilitis/createUser');
const emailVerification = require("../utilitis/emailVerification");


router.get('/addCity/:cityname', ensureAuthenticated,(req,res)=>{
    console.log(req.user);
    if(req.params.cityName){
        if(req.user.AccountType === 'admin'){
            console.log('yep you are ana admin');
            City.findOne({name: cityName})
                .then(city => {
                    if(city){
                        console.log('city already exists');
                    }else {
                        const newCity = new City({
                           name: cityname,
                            director : String,
                            doctors: [],
                            patients : [],
                        });
                    }
                })

        }else{
            res.status(404).render('404',{title: '404 Not Found'});
        }
    }

});

router.post('/AddDoctor', ensureAuthenticated, (req, res)=>{
    if(req.user.AccountType === 'admin'){
        const {email, Cin} = req.body;
        const newUser = [
            ['cin', Cin],
            ['email', email],
            ['AccountType', 'doctor'],
        ];
        createUser(newUser, false)
            .catch(errors=>{
                res.render('dashboard', {
                    errors: errors,
                    title: 'dashboard',
                    user: req.user
                });
            })
            .then(creation => {
                    console.log(creation._id);
                    emailVerification(email, creation._id, 'completeRegistration');
                    req.flash('success_msg', 'You Created An Doctor Account');
                    res.redirect('/dashboard');
            })
    }
});

router.post('/addCenter', ensureAuthenticated, (req, res)=> {
   if(req.user.AccountType === 'admin'){
       const {centerName, city, directorCin} = req.body;
       console.log(directorCin);
       User.findOne({cin:directorCin.toUpperCase()})
           .then(user => {
               if(user){
                   City.findOne({name: city.toUpperCase(),"centers.centerName":centerName.toUpperCase()})
                       .then(theCity => {
                           if(theCity){
                              theCity.centers.push({
                                   centerName:centerName.toUpperCase(),
                                   director : directorCin.toUpperCase(),
                                   doctors: [],
                                   patients : [],
                              });
                              theCity.save()
                                  .then(()=>{
                                      req.flash('success_msg', 'You Added A City');
                                  })
                                  .catch(err => {
                                      req.flash('success_msg', 'Coudnt Add The City');
                                  });
                           }else {
                               const newCity = new City({
                                   name: city.toUpperCase(),
                                   centers:[
                                       {
                                           centerName:centerName.toUpperCase(),
                                           director : directorCin.toUpperCase(),
                                           doctors: [],
                                           patients : [],
                                       }
                                   ]
                               });
                               newCity.save()
                                   .then(()=>{
                                       console.log('city and center saved');
                                       req.flash('success_msg', 'You Added A City And A Center');
                                       res.redirect('/dashboard');
                                   })
                                   .catch(err => console.log(err));
                           }
                       })
               }
           });

   }
});

module.exports = router;
