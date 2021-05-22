const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const pageFieldsByLang = require('../utilitis/lang');

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
    const lang = req.params.lang;
    if(lang === 'en' || lang === 'fr' || lang === 'ar')
        res.render('factsL', {title:'Vaccine Safety Facts', factsL: pageFieldsByLang(req.params.lang, 'facts')});
    else next();
});
router.get('/dashboard', ensureAuthenticated,(req, res) => res.render('dashboard', {user : req.user, title:'Dashboard'}));


module.exports = router;
