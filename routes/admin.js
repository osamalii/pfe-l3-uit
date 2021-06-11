const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const City = require('../models/City');
const User = require('../models/User');
const createUser = require('../utilitis/createUser');
const emailVerification = require("../utilitis/emailVerification");
const pageFieldsByLang = require('../utilitis/lang');

async function GetUseIdByCin(cin){
   return await User.findOne({cin:cin, AccountType: 'responsable'})
        .then(user => {
            if(user)
                return user._id;
            return null;
        })
}

function addCenter(cityId, center) {
    City.findOne({_id: cityId})
        .then(theCity =>{
            theCity.centers.push({
                centerName: center.centerName,
                responsables: center.responsables,
                patients: [],
            });
            theCity.save();
        });

}


router.post('/addCity', ensureAuthenticated, (req, res) => {
    const cityName = req.body.cityName;
        if (cityName) {
            if (req.user.AccountType === 'admin') {
                console.log('yep you are ana admin');
                City.findOne({name: cityName})
                    .then(city => {
                        if (city) {
                            console.log('city already exists');
                        } else {
                            const newCity = new City({
                                name: cityName.toUpperCase(),
                                capacity:0,
                                responsables: [],
                                patients: [],
                            });
                            newCity.save(function (err) {
                                console.log(err);
                            });
                        }
                    })

            } else {
                res.status(404).render('404', {title: '404 Not Found'});
            }
        }
});

router.post('/AddResponsable', ensureAuthenticated, (req, res) => {
    if (req.user.AccountType === 'admin') {
        const {email, Cin} = req.body;
        const newUser = [
            ['cin', Cin],
            ['email', email],
            ['AccountType', 'responsable'],
        ];
        createUser(newUser, false)
            .catch(errors => {
                res.render('dashboard', {
                    errors: errors,
                    title: 'dashboard',
                    user: req.user,
                    footer:pageFieldsByLang('en', 'footer'),
                    lang:'en'
                });
            })
            .then(creation => {
                console.log(creation._id);
                emailVerification(email, creation._id, 'completeRegistration');
                req.flash('success_msg', 'You Created A Responsable Account');
                res.redirect('/dashboard/en');
            })
    }
});

router.post('/addCenter', ensureAuthenticated, async (req, res) => {
    if (req.user.AccountType === 'admin') {
        const {centerName, _cityId, responsables, capacity} = req.body;
        City.findOne({_id: _cityId})
            .then(theCity => {
                let ex = true;
                theCity.centers.find(e => e === centerName.toUpperCase());
                for (let i = 0; i < theCity.centers.length; i++) {
                    if (theCity.centers[i].centerName === centerName) {
                        ex = false;
                        break;
                    }
                }
                if(ex){
                    theCity.centers.push({
                        centerName: centerName.toUpperCase(),
                        responsables: responsables.split(',').map(el => GetUseIdByCin(el)).filter(e => e),
                        patients: [],
                        capacity:capacity
                    });
                    theCity.save()
                        .then(() => {
                            console.log('center ');
                            req.flash('success_msg', 'You Added A Center');
                            res.redirect('/dashboard');
                        })
                        .catch(err => {
                            console.log(err);
                            req.flash('success_msg', 'Could not Add This Center');
                        });
                }
            });
    }
});


router.post('/autoAddCenter',  (req, res)=>{
    let {centers, cityName, responsables, capacities} = req.body;
    console.log(centers);
    centers=centers.split('--');
    responsables=responsables.split('--');
    capacities=capacities.split('--');
    const newCity = new City({
        name: cityName.toUpperCase(),
        centers:[]
    });
    for (let i = 0; i < centers.length; i++){
        newCity.centers.push(
            {
                centerName: centers[i].toUpperCase(),
                responsables: responsables[i],
                capacity: capacities[i],
                patients: []
            });
    }
    newCity.save(function (err) {
        console.log(err);
    });


});

// City.collection.remove();




module.exports = router;
