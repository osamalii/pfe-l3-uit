const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const City = require('../models/City');
const createUser = require('../utilitis/createUser');

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

router.post('/addDirector', ensureAuthenticated, (req, res)=>{
    if(req.user.AccountType === 'admin'){
        console.log('yep you are ana admin');
        const {directorEmail, directorPassword} = req.body;
        createUser({email: directorEmail, password: directorPassword, name:'xxx',lastname:'xxx',cin:'G706890',birthDate: Date.now(),gender:'Homme'})
            .then(creation => {
                if(Array.isArray(creation)){ // Array of errors
                    res.render('dashboard', {
                        errors: creation,
                        title: 'dashboard',
                        user: req.user
                    });
                }else { // user object
                    req.flash('success_msg', 'You Created An Admin Account');
                    res.redirect('/dashboard');
                }

            })
            .catch(err=>console.log(err));
    }
});

module.exports = router;
