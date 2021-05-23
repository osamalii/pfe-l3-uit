const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const pageFieldsByLang = require('../utilitis/lang');
const City = require('../models/City');

router.get('/', function(req, res){
    res.render('indexL',{user: req.user, title:'Home', pageL:pageFieldsByLang('en','home')})
});


router.get('/:lang', function(req, res, next){
    const lang = req.params.lang;
    if(lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('indexL',{user: req.user, title:'Home', pageL:pageFieldsByLang(req.params.lang, 'home')});
    else next();
});

router.get('/facts/:lang', (req, res, next) => {
    console.log(req);
    const lang = req.params.lang;
    if(lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('factsL', {title:'Vaccine Safety Facts', factsL: pageFieldsByLang(req.params.lang, 'facts')});
    else next();
});
router.get('/dashboard', ensureAuthenticated,(req, res) => {
    if (req.user.AccountType === 'admin'){
        City.find({})
            .then(cities => {
                res.render('dashboard', {user: req.user, title: 'Dashboard', cities:cities});
            });

    }
    else {
        res.render('dashboard', {user: req.user, title: 'Dashboard'})
    }
});


module.exports = router;
