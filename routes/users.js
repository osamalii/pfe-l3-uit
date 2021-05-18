const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Token = require('../models/Token');
const cin2City = require('../utilitis/cin');
const hashPass = require('../utilitis/hashPass');
const createUser = require('../utilitis/createUser');
const passport = require('passport');
const emailVerification = require("../utilitis/emailVerification");
const recaptha = require("../utilitis/captcha");
const {ensureAuthenticated} = require('../config/auth');


router.get('/login', (req, res) => res.render('login', {user: null, title: 'Login'}));

router.get('/register', (req, res) => res.render('register', {user: null, title: 'Register', errors: []}));

router.post('/register', (req, res) => {

    const {name, lastname, email, password, password2, gender, birthDate, cin} = req.body;
    let errors = [];
    console.log(req.body);
    if (!name || !lastname || !email || !password || !password2 || !gender || !birthDate || !cin) {
        errors.push({msg: 'please fill in all fields'});
    }
    if (password.length < 8) {
        errors.push({msg: 'password should be at least 8 characters'});
    }
    if (!cin2City(cin)) {
        errors.push({msg: 'invalid CIN'});
    }
    if (errors.length > 0) {
        console.log(errors);
        res.render('register', {
            errors,
            name,
            lastname,
            email,
            cin,
            title: 'Register'
        });
    } else {
        let userArr = [
            ['name', name],
            ['lastname', lastname],
            ['email', email],
            ['password', password],
            ['password2', password2],
            ['birthDate', birthDate],
            ['gender', gender],
            ['cin', cin],
            ['AccountType', 'patient']
        ];
        createUser(userArr, true)
            .then(creation => {
                console.log(creation);
                emailVerification(creation.email, creation._id, 'verify');
                req.flash('success_msg', 'Complete registration by verifying your email');
                res.redirect('/users/login');
            })
            .catch(errors => {
                console.log(errors);
                res.render('register', {
                    errors,
                    name,
                    lastname,
                    email,
                    cin,
                    title: 'Register'
                });
            })
    }
});

//login

router.post('/login', (req, res, next) => {
    recaptha(req.body.v3Token)
        .then(captcha => {
            if(captcha)
                passport.authenticate('local', {
                    successRedirect: '/dashboard',
                    failureRedirect: '/users/login',
                    failureFlash: true
                })(req, res, next);
        })
        .catch(res.redirect('/'));
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
});

// password reset routes

router.get('/requestresetpassword', function (req, res) {
    res.render('partials/resetPassword');
});

router.post('/requestresetpassword', function (req, res) {
    console.log(req.body.email);
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                console.log('user foud in database');
                emailVerification(user.email, user._id, 'reset');
            }
            res.redirect('/');
        })
});

router.get('/requestresetpassword/:token', function (req, res) {
    console.log(req.params);
    Token.findOne({token: req.params.token, T_type: 'reset'})
        .then(token => {
            console.log(token);
            if (token) {
                res.render('partials/resetPasswordForm', {token: token.token});
            } else {
                res.redirect('/');
            }
        });
});

router.post('/resetpassword', async (req, res) => {
    let errors = [];
    await Token.findOne({token: req.body.token})
        .then(token => {
            if(token) errors.push({msg: 'Token does not exists'})
        });
    if(req.body.password1 !== req.body.password2)
        errors.push({msg: 'Passwords dont match'});

    if (errors.length > 0) {
        res.render('partials/resetPassword', {errors});
        return;
    }
    await Token.findOne({token: req.body.token})
        .then(token => {
                User.findOne({_id: token._userId})
                    .then(user => {
                        if (user) {
                            User.updateOne({_id: token._userId}, {password: hashPass(req.body.password1)})
                                .then(() => {
                                    Token.deleteOne({_userId: user._id}).catch(err => console.log(err));
                                    req.flash('success_msg', 'Password changed, log in with your new password');
                                    res.redirect('/users/login');
                                })
                        }
                    })
        });
});

// Doctor complete registration routes

router.get('/completeRegistration/:token', (req, res) => {
    const token = req.params.token;
    console.log(req.params.token);
    Token.findOne({token: token})
        .then(token => {
            if (token) {
                User.findOne({_id: token._userId})
                    .then(user => {
                        if (user) {
                            res.render('doctor/doctorRegistration', {_userId: user._id});
                        }
                    });
            }
        })
});

router.post('/registeradoctor', (req, res) => {
    let errors = [];
    const {_userId, name, lastname, password, password2, gender, birthDate} = req.body;
    if (!_userId || !name || !lastname || !password || !password2 || !gender || !birthDate) {
        errors.push({msg: 'please fill in all fields'});
    }
    if (password !== password2) {
        errors.push({msg: 'passwords do not match'});
    }
    if (password.length < 8) {
        errors.push({msg: 'password should be at least 8 characters'});
    }
    if (errors.length > 0) {
        res.render('doctor/doctorRegistration', {_userId: _userId, errors});
        return;
    }
    User.findOne({_id: _userId})
        .then(user => {
            if (user) {
                User.updateOne({_id: _userId}, {
                        name,
                        lastname,
                        password: hashPass(password),
                        gender,
                        birthDate,
                        isVerified: true
                    })
                    .then(completedUser => {
                        req.flash('success_msg', 'Registration Completed, you can LogIn');
                        res.redirect('/users/login');
                        Token.deleteOne({_userId: _userId}).catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            }
        })
});

// demander rendez-vous

let cities = [
    {
        name:'KENITRA',
        centers: [
            {
                name:'CROISSANT ROUGE MAROCAON OULAD OUJIH',
                capacity: 50
            },
            {
                name:'OULED OUUJIH II',
                capacity: 20
            }
        ]
    },
    {
        name: '',
        centers: []
    }
];

let rendez_vous = [
    {
        date: null,
        _userId: '1234567890',
        center: null
    },
    {
        date: null,
        _userId: '1234567891',
        center: null
    }
];

router.post('/demander_rendez-vous', ensureAuthenticated, (req, res)=>{
    let _userId = req.body._userId;
    if(_userId == req.user._id && req.user.AccountType === 'patient') { //later ensure that he's not vaccinated yet or he's asking for 2 rendez-vous
        const city = cin2City(req.user.cin);
        const center = cities.filter(cityCenters => {
            if (city === cityCenters.name) return cityCenters.centers[1]
        });
        if(center){

        }
    }
});



module.exports = router;
