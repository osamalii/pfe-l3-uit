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

router.get('/', (req, res) => res.redirect("/en"));
router.get('/facts' , (req,res)=>res.redirect("/facts/en"));
router.get('/AboutUs' , (req,res)=>res.redirect("/AboutUs/en"));
router.get('/Ressource' , (req,res)=>res.redirect("/Ressource/en"));
router.get('/Qstn' , (req,res)=>res.redirect("/Qstn/en"));
router.get('/importance' , (req,res)=>res.redirect("/importance/en"));
router.get('/Safety' , (req,res)=>res.redirect("/Safety/en"));
router.get('/targetPopulation' , (req,res)=>res.redirect("/targetPopulation/en"));
router.get('/Mechanism' , (req,res)=>res.redirect("/targetPopulation/en"));


router.get('/:lang', function (req, res, next) {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('indexL', {
            user: req.user,
            title: 'Home',
            pageL: pageFieldsByLang(req.params.lang, 'home'),
            lang: lang,
            footer: pageFieldsByLang(req.params.lang, 'footer')
        });
    else next();
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

router.get('/Safety/:lang', (req, res, next) => {
    const lang = req.params.lang;
    if (lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('Safety', {
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

router.get('/dashboard', ensureAuthenticated,(req, res) => {
    if (req.user.AccountType === 'admin'){
        City.find({})
            .then(cities => {
                res.render('dashboard', {user: req.user, title: 'Dashboard', cities:cities});
            });
    }
    else if(req.user.AccountType === 'patient'){
      getAppointmentInfo(req.user._id)
          .then(theAppointment => {
              theAppointment.date = moment(theAppointment.date).format("dddd, MMMM Do YYYY");
              Calendar.findOne({"appointments": theAppointment._id})
                  .then(theCalendar=>{
                      if(!theCalendar) return res.render('dashboard', { title: "Dashboard" , user: req.user});
                      // console.log('theClendar =  ' +theCalendar);
                     City.findOne({"centers._id":theCalendar._centerId})
                         .then(theCity=>{
                             res.render('dashboard', { title: "Dashboard" ,
                                 user: req.user,
                                 appointment:{
                                     date:theAppointment.date ,
                                     center: findTheCenter(theCity,theCalendar._centerId).centerName
                                 }
                             })
                         })
                  });
          });
    }else if (req.user.AccountType === 'doctor'){
        findTheCenterDoc(req.user.cin)
            .then((theCenter =>{
                console.log(theCenter._id);
              Appointment.find({_centerId:mongoose.Types.ObjectId(theCenter._id)}).sort({'day': -1})
                  .then(async appointments => {
                      let arr = [];
                      let date = moment('2021-07-02');
                      for (let i = 0; i < appointments.length; i++){
                              const info = await getUserInfo(appointments[i]._userId).then(info => info).catch(err => false);
                              console.log("info == " + info);
                               arr.push({
                                  _id:appointments[i]._id,
                                  date:appointments[i].date,
                                  _userId:appointments[i]._userId,
                                  dayRange:appointments[i].dayRange,
                                  _centerId:appointments[i]._centerId,
                                  userInfo:{
                                      name: info.name,
                                      lastname: info.lastname,
                                      gender: info.gender,
                                      cin: info.cin,
                                      birthDate: info.birthDate
                                  }
                              });
                      }
                      console.log("Arr == "+ arr[0].userInfo);
                     res.render('dashboard', {user: req.user, title: 'Dashboard', appointments:arr, day:date})
                  })
        }));
    }
});

router.get('/getUserInfo/:user', ensureAuthenticated, async (req, res) => {
    const _userId = req.params.user;
    if(req.user.AccountType === 'doctor'){
       const userInfo = await getUserInfo(_userId);
       console.log(userInfo);
       res.send(userInfo);
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
    const promise = new Promise((resolve, reject)=>{
        City.find({})
            .then(cities => {
                for (let i = 0; i < cities.length; i++){
                    let centers = cities[i].centers;
                    for (let z = 0; z < centers.length; z++){
                        let doctors = centers[z].doctors;
                        for (let j = 0; j < doctors.length; j++){
                            // console.log(doctors[j] == cin);
                            if (doctors[j] == cin){
                                console.log(centers[z]);
                                resolve(centers[z]);
                            }
                        }
                    }
                }
            })
    });
    return promise;
}

