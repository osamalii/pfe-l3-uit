const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

router.get('/', (req, res) => res.render('index',{user: req.user, title:'Home'}));

router.get('/dashboard', ensureAuthenticated,(req, res) => res.render('dashboard', {user : req.user, title:'Dashboard'}));


module.exports = router;
