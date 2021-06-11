const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const pageFieldsByLang = require('../utilitis/lang');
const City = require('../models/City');
const Calendar = require('../models/Calendar');
const getAppointmentInfo = require('../utilitis/getAppointmentInfo');
const moment = require('moment');
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const getUserInfo = require('../utilitis/getUserInfo');
const getUserInfoByCin = require('../utilitis/getUserInfoByCin');


router.get('/', (req, res) => res.redirect("/fr"));
router.get('/facts' , (req,res)=>res.redirect("/facts/fr"));
router.get('/AboutUs' , (req,res)=>res.redirect("/AboutUs/fr"));
router.get('/Ressource' , (req,res)=>res.redirect("/Ressource/fr"));
router.get('/Qstn' , (req,res)=>res.redirect("/Qstn/fr"));
router.get('/importance' , (req,res)=>res.redirect("/importance/fr"));
router.get('/safety' , (req,res)=>res.redirect("/Safety/fr"));
router.get('/targetPopulation' , (req,res)=>res.redirect("/targetPopulation/fr"));
router.get('/Mechanism' , (req,res)=>res.redirect("/targetPopulation/fr"));
router.get('/dashboard', ensureAuthenticated, (req, res)=> res.redirect('/dashboard/fr'));

router.get('/:lang', function (req, res, next) {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('indexL', {
            user: req.user,
            title: 'Acceuil',
            pageL: pageFieldsByLang(req.params.lang, 'home'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else res.status(404).render('404', {lang:"en",error:pageFieldsByLang("en", "404"), footer:pageFieldsByLang("en", "footer")});
});

router.get('/facts/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('factsL', {
            title: 'Vaccine Safety Facts',
            factsL: pageFieldsByLang(req.params.lang, 'facts'),
            lang: lang ,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

router.get('/AboutUs/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('AboutUs', {
            title: 'AboutUs',
            AboutUs: pageFieldsByLang(req.params.lang, 'AboutUs'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

router.get('/Qstn/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('Qstn', {
            title: 'Qstn',
            Qstn: pageFieldsByLang(req.params.lang, 'Qstn'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

router.get('/importance/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('importance', {
            title: 'importance',
            importance: pageFieldsByLang(req.params.lang, 'importance'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

router.get('/safety/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('safety', {
            title: 'Safety',
            Safety: pageFieldsByLang(req.params.lang, 'Safety'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

router.get('/targetPopulation/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('targetPopulation', {
            title: 'targetPopulation',
            targetPopulation: pageFieldsByLang(req.params.lang, 'targetPopulation'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

router.get('/dashboard/:lang', ensureAuthenticated,(req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar'){
        if(req.user.AccountType === 'patient')
        getAppointmentInfo(req.user._id)
            .then(theAppointment => {
                theAppointment.date = moment(theAppointment.date).format("dddd, MMMM Do YYYY");
                Calendar.findOne({"appointments": theAppointment._id})
                    .then(theCalendar=>{
                        if(!theCalendar) return res.render('dashboardL', {
                            lang:lang,
                            footer:pageFieldsByLang(lang, 'footer'),
                            title: "Dashboard",
                            user: req.user,
                            dashboard:pageFieldsByLang(lang, 'patientDashboard')
                        });
                        City.findOne({"centers._id":theCalendar._centerId})
                            .then(theCity=>{
                                res.render('dashboardL', {
                                    title: "Dashboard" ,
                                    user: req.user,
                                    appointment:{
                                        date:theAppointment.date ,
                                        dayRange:theAppointment.dayRange,
                                        center: findTheCenter(theCity,theCalendar._centerId).centerName
                                    },
                                    dashboard:pageFieldsByLang(lang, 'patientDashboard'),
                                    lang:lang,
                                    footer:pageFieldsByLang(lang, 'footer')
                                })
                            })
                    });
            });
        else if (req.user.AccountType === 'admin')
            City.find({})
                .then(cities => {
                    res.render('dashboard', {
                        user: req.user,
                        title: 'Dashboard',
                        cities:cities,
                        lang:'en',footer:pageFieldsByLang("en", "footer")});
                });
        else if (req.user.AccountType === 'responsable')
            findTheCenterDoc(req.user.cin)
                .then((theCenter =>{
                    Appointment.find({_centerId:mongoose.Types.ObjectId(theCenter._id)}).sort({'day': -1})
                        .then(async appointments => {
                            let arr = [];
                            let date = moment('2021-07-02');
                            for (let i = 0; i < appointments.length; i++){
                                const info = await getUserInfo(appointments[i]._userId).then(info => info).catch(() => false);
                                arr.push({
                                    _id:appointments[i]._id,
                                    date:appointments[i].date,
                                    _userId:appointments[i]._userId,
                                    dayRange:appointments[i].dayRange,
                                    _centerId:appointments[i]._centerId,
                                    userInfo:info
                                });
                            }
                            res.render('dashboard', {
                                user: req.user,
                                title: 'Dashboard',
                                appointments:arr,
                                day:date, lang:"en",
                                footer:pageFieldsByLang("en", "footer")
                            })
                        })
                }));
    }

    console.log("addddmmmiinn");
});

router.get('/getUserInfo/:user', ensureAuthenticated, async (req, res) => {
    const _userId = req.params.user;
    if(req.user.AccountType === 'responsable'){
       const userInfo = await getUserInfo(_userId);
       res.send(userInfo);
    }else {
        res.redirect('Page_not_found');
    }
});

router.get('/getUserInfoByCin/:cin', ensureAuthenticated, async (req, res) => {
    const _userCin = req.params.cin;
    if(req.user.AccountType === 'responsable'){
        const userInfo = await getUserInfoByCin(_userCin);
        res.send(userInfo);
    }else {
        res.redirect('Page_not_found');
    }
});

router.get('/Mechanism/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('Mechanism', {
            title: 'Mechanism',
            Mechanism: pageFieldsByLang(req.params.lang, 'Mechanism'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

router.get('/privacy/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('privacy', {
            title: 'privacy',
            privacy: pageFieldsByLang(req.params.lang, 'privacy'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

router.get('/terms/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('terms', {
            title: 'terms',
            terms: pageFieldsByLang(req.params.lang, 'terms'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

router.get('/Ressource/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('Ressource', {
            title: 'Ressource',
            Ressource: pageFieldsByLang(req.params.lang, 'Ressource'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
});

module.exports = router;


function findTheCenter(theCity,centerId){
    let center;
    for(let i =0; i < theCity.centers.length; i++){
        if(theCity.centers[i]._id == centerId.toString()){
           center = theCity.centers[i];
        }
    }
    return center;
}

async function findTheCenterDoc(cin){
    return  promise = new Promise((resolve, reject)=>{
        City.find({})
            .then(cities => {
                for (let i = 0; i < cities.length; i++){
                    let centers = cities[i].centers;
                    for (let z = 0; z < centers.length; z++){
                        let responsables = centers[z].doctors;
                        for (let j = 0; j < responsables.length; j++){
                            if (responsables[j] === cin){
                                resolve(centers[z]);
                            }
                        }
                    }
                }
            })
    });
}

