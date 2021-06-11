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
const pageFieldsByLang = require('../utilitis/lang');
const City = require('../models/City');
const Appointment = require('../models/Appointment');
const Calendar = require('../models/Calendar');
const moment = require('moment'); // require
const Survey = require('../models/Survey'); // require


router.get('/survey', (req, res, next) => res.redirect('/users/survey/fr'));
router.get('/login', (req, res) => res.redirect('/users/login/fr'));
router.get('/register', (req, res) => res.redirect('/users/register/fr'));

router.get('/login/:lang', (req, res, next) => {
    const lang = req.params.lang;
    console.log(req.params);
    if(lang === 'en' || lang === 'fr' || lang === 'ar' || !lang)
        res.render('loginL', {
            user:req.user,
            title:'Login',
            pageL: pageFieldsByLang(req.params.lang,'login'),
            lang : lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});



router.get('/register/:lang', (req, res,next) => {
    const lang = req.params.lang;
    if(lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('register',{
            user:req.user ,
            title:'register',
            register:pageFieldsByLang(req.params.lang,'register'),
            lang:lang,
            footer:pageFieldsByLang(req.params.lang , 'footer'),
            errors: []
        });
    else next();
});

router.post('/register', (req, res) => {
    let lang = req.body.lang;
    if(lang !== 'en' || lang !== 'fr' || lang !== 'ar') lang = 'en';
    console.log(lang);
    const {name, lastname, email, password, password2, gender, birthDate, cin} = req.body;
    let errors = [];
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
            title: 'Register',
            lang: lang,
            footer: pageFieldsByLang(lang, 'footer'),
            register: pageFieldsByLang(lang, 'register'),
        });
    }
    else {
        let userArr = [
            ['name', name.toUpperCase()],
            ['lastname', lastname.toUpperCase()],
            ['email', email],
            ['password', password],
            ['password2', password2],
            ['birthDate', birthDate],
            ['gender', gender],
            ['cin', cin.toUpperCase()],
            ['AccountType', 'patient']   //temp for automation ... must be patient
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
                    title: 'Register',
                    lang: lang,
                    footer: pageFieldsByLang(lang, 'footer'),
                    register: pageFieldsByLang(lang, 'register'),
                });
            })
    }
});

//login

router.post('/login', (req, res, next) => {
    const lang = req.body.lang || 'en';
    console.log(lang);
    if(lang === 'en' || lang === 'fr' || lang === 'ar'){
        if (process.env.NODE_ENV !== 'dev')
            recaptha(req.body.v3Token)
                .then(captcha => {
                    console.log(captcha);
                    passport.authenticate('local', function (err, user, info) {
                        if (err) {
                            return next(err);
                        }
                        if (!user) {
                            return res.redirect('/users/login/'+lang);
                        }
                        req.logIn(user, function (err) {
                            if (err) {
                                return next(err);
                            }
                            return res.redirect('/dashboard/'+lang);
                        });
                    })(req, res, next);
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/')
                });
        else
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/users/login/'+lang);
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/dashboard/'+lang);
                });
            })(req, res, next);
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
});

// password reset routes
router.get('/requestresetpassword', function (req, res) {
    res.redirect('/requestresetpassword/fr');
});

router.get('/requestresetpassword/:lang', function (req, res, next) {
    const lang = req.params.lang;
    if(lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('partials/resetPassword', {
            resetPassword:pageFieldsByLang(lang, "resetPassword"),
            lang:lang,
            footer: pageFieldsByLang(lang,"footer")
        })
    else next();
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
                res.render('partials/resetPasswordForm', {
                    token: token.token,
                    title: 'request reset password',
                    lang:'en',
                    footer: pageFieldsByLang('en', "footer")
                    });
            } else {
                res.redirect('Page_not_found');
            }
        });
});

router.post('/resetpassword', async (req, res) => {
    console.log('rest', req.body);
    let errors = [];
    await Token.findOne({token: req.body.token})
        .then(token => {
            if (!token) errors.push({msg: 'Token does not exists'})
        });
    if (req.body.password1 !== req.body.password2)
        errors.push({msg: 'Passwords dont match'});
    console.log("errors",errors);
    if (errors.length > 0) {
        res.render('partials/resetPassword', {errors, lang:"en",resetPassword: pageFieldsByLang('en', 'resetPassword'),footer:pageFieldsByLang("en", "footer") ,title: 'reset password'});
        return;
    }
    console.log('after errors')
    await Token.findOne({token: req.body.token})
        .then(token => {
            User.findOne({_id: token._userId})
                .then(user => {
                    console.log(user);
                    if (user)
                    {
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
                            res.render('responsable/responsableRegistration', {
                                _userId: user._id,
                                title: 'Responsable registration',
                                footer: pageFieldsByLang('en', 'footer'),
                                lang: 'en'
                            });
                        }
                    });
            }
        })
});

router.post('/registeraresponsable', (req, res) => {
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
        res.render('responsable/responsableRegistration', {_userId: _userId, errors, footer: pageFieldsByLang('en', 'footer'),lang:'en',title: 'responsable registration'});
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
//  Appointment.collection.remove();
// Calendar.collection.remove();

// City.find({}).then(cities => {
//     for(let i = 0; i < cities.length; i++){
//         let centers = cities[i].centers;
//         for (let j = 0; j < centers.length; j++)
//            createNewDayInTheCalendar(centers[j]._id, cities[i]._id ,new Date(2021,6,0))
//                .then(()=>console.log("calendar added"));
//     }
// });

// Calendar.updateMany({}, {appointments : [], numPatients:0});


router.post('/demander_rendez-vous', ensureAuthenticated, (req, res) => {
    let _userId = req.body._userId;
    console.log('asking for appointment');
    if (_userId == req.user._id.toString() && !req.user.isVaccinated && req.user.AccountType === 'patient') { //later ensure that he's not vaccinated yet or he's asking for 2 rendez-vous
        const city = cin2City(req.user.cin);
        Appointment.remove({_userId: _userId});
        City.findOne({name: city.toUpperCase()})
            .then(async theCity => {
                    if (theCity) {
                        const calendar = await Calendar.find({_cityId: theCity._id})
                            .then(async theCalendar => {
                                let sorted = await getLastDays(theCalendar.sort((a, b) => new moment(b.day).format('YYYYMMDD') - new moment(a.day).format('YYYYMMDD'))).then(r => r);
                                sorted = sorted.sort((a, b) => a.numPatients - b.numPatients).sort((a, b) => new moment(a.day).format('YYYYMMDD') - new moment(b.day).format('YYYYMMDD'));
                                const center = await getTheCenter(theCity, sorted[0]._centerId);
                                if (sorted[0].numPatients >= 100) {
                                    console.log(center._id, theCity._id, sorted[0].day);
                                    return await createNewDayInTheCalendar(center._id, theCity._id, sorted[0].day)
                                } else
                                    return sorted[0];
                            });
                        const center = await getTheCenter(theCity._id, calendar._centerId);
                        const rendez_vous = new Appointment({
                            date: calendar.day,
                            _userId: _userId,
                            dayRange: (calendar.numPatients < center.capacity / 2) ? 'am' : 'pm',
                            _centerId: center._id
                        });
                        rendez_vous.save()
                            .then(async () => {
                                await Calendar.findOne({_id: calendar._id})
                                    .then(cal => {
                                        cal.appointments.push(rendez_vous._id);
                                        cal.set('numPatients', parseFloat(calendar.numPatients + (100 / center.capacity)));
                                        cal.save()
                                            .then(async () => {
                                                User.updateOne({_id:_userId},{hasAppointment :true});
                                                res.redirect('/dashboard');
                                            });
                                    });
                            });
                    }
                }
            );
    }else res.redirect('Page_Not_Found');
});

router.post('/vaccinate_patient', ensureAuthenticated, (req, res)=>{
    if(req.user.AccountType === 'responsable'){
           User.findOne({cin:req.body._userCin})
               .then(user => {
                   if(!user) res.redirect('Page_not_foud');
                   else {
                       user.isVaccinated = true;
                       user.avis = req.body.avis;
                       user.save().then(()=> console.log("Patient is marked as vaccinated now"));
                       res.redirect('/dashboard/en');
                   }
               })
    }else {
        res.redirect('Page_Not_Found');
    }
});

router.get('/survey/:lang',ensureAuthenticated, (req, res, next) => {
    const lang = req.params.lang;
    if((req.user.AccountType === 'patient') && (lang === 'en' || lang === 'fr' || lang === 'ar')){
        Survey.findOne({_userId:req.user._id})
            .then(survey => {
                console.log(survey);
               if(survey) res.redirect('/dashboard/'+lang);
                else {
                   res.render('survey', {
                       title: 'survey',
                       fields: pageFieldsByLang(lang, 'survey'),
                       lang: lang,
                       footer: pageFieldsByLang(lang, 'footer')
                   });
               }
            });
    }
    else {
        res.redirect('/Page_Not_found');
    }
});

router.post('/survey', ensureAuthenticated,(req, res, next) => {
    if(req.user.AccountType === 'patient')
    {
        const {
            fever, feverRate, Pain, Redness, Swelling, Itching, SymptomsNone, Chills, Headache, Fatigue, Joint, Nausea, Vomiting, Diarrhea, AbdominalRash,
            SymptomsNone2, workcheck, activitiescheck, professionalcheck, SymptomsNone3
        } = req.body;
        let survey = {
            _userId: req.user._id
        };
        if (fever !== '-1') survey.feverRate = parseInt(feverRate) || 0;
        else survey.feverRate = 0;
        if (!('SymptomsNone' in req.body)) {
            survey.pain = parseInt(Pain) || 0;
            survey.redness = parseInt(Redness) || 0;
            survey.Swelling = parseInt(Swelling) || 0;
            survey.Itching = parseInt(Itching) || 0;
        }
        if (!('SymptomsNone2' in req.body)) {
            survey.Chills = parseInt(Chills) || 0;
            survey.Headache = parseInt(Headache) || 0;
            survey.Fatigue = parseInt(Fatigue) || 0;
            survey.Joint = parseInt(Joint) || 0;
            survey.Nausea = parseInt(Nausea) || 0;
            survey.Vomiting = parseInt(Vomiting) || 0;
            survey.Diarrhea = parseInt(Diarrhea) || 0;
            survey.AbdominalRash = parseInt(AbdominalRash) || 0;
        }
        if (!('SymptomsNone3' in req.body)) {
            survey.workcheck = (workcheck && (workcheck === 'on' ? 1 : 0)) || 0;
            survey.activitiescheck = (activitiescheck && (activitiescheck === 'on' ? 1 : 0)) || 0;
            survey.professionalcheck = (professionalcheck && (professionalcheck === 'on' ? 1 : 0)) || 0;
        }
        let newSurvey = new Survey(survey);
        console.log(newSurvey);
        newSurvey.save()
            .then(() => {
                res.status(200).redirect('/');
            })
            .catch(err => console.log(err));
    }
    else
    {
        res.redirect('/Page_not_found');
    }

});

async function createNewDayInTheCalendar(_centerId, _cityId, date) {
    const calendar = new Calendar({
        numPatients: 0,
        _centerId: _centerId,
        _cityId: _cityId,
        Appointment: [],
        day: moment(date).add(1, 'day').format()
    });
    await calendar.save()
        .then(() => {
            Calendar.findOne({_id: calendar._id}).then((c) => console.log("the new calendar " + c));
            console.log('new day created in the calendar ' + moment(date).add(1, 'day').format());
        });
    return calendar;
}

async function getTheCenter(_cityId, _centerId) {
    return await City.findOne({_id: _cityId})
        .then(theCity => {
            if (theCity) {
                for (let i = 0; i < theCity.centers.length; i++) {
                    let center = theCity.centers[i];
                    if (center._id.toString() == _centerId.toString()) {
                        return center;
                    }
                }
            }
        });
}

async function getLastDays(calendar) {
    let ids = [];
    let centers = [];
    for (let i = 0; i < calendar.length; i++) {
        console.log(centers.indexOf(calendar[i]._centerId));
        console.log((calendar[i]._centerId));
        console.log(centers.indexOf(calendar[i]._centerId.toString()) === -1);
        if (centers.indexOf(calendar[i]._centerId.toString()) === -1) {
            ids.push(calendar[i]._id);
            centers.push(calendar[i]._centerId.toString());
        }
    }
    return new Promise((resolve, reject) => {
        Calendar.find({_id: {$in: ids}}, (err, docs) => {
            resolve(docs);
        });
    });
}


module.exports = router;

