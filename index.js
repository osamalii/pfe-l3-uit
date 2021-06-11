if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const expressLyouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const pageFieldsByLang = require('./utilitis/lang');


require('./config/passport')(passport);


mongoose.connect(process.env.mongodb2, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {
        console.log("mongodb connected")})
    .catch((e) => console.log(e));


app.use(expressLyouts);
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

//BodyParser
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret:'asdfghjkpoiuytrewqzxcvbnm',
    resave:true,
    saveUninitialized:true
}));
//passport's
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//global var
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

const moment = require('moment');
moment.locale('fr');
app.locals.moment = moment;


app.use('/', require('./routes/index'));
app.use('/users',  require('./routes/users'));
app.use('/admin', require('./routes/admin'));
app.use('/token', require('./routes/tokens'));
// app.use('/api', require('./routes/api'));
app.use((req, res)=>{
    res.status(404).render('404', {lang:"en",error:pageFieldsByLang("en", "404"), footer:pageFieldsByLang("en", "footer")});
});


module.exports = app;
