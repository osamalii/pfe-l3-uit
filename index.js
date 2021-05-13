if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const expressLyouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

require('./config/passport')(passport);

mongoose.connect(process.env.mongodb2, {useNewUrlParser: true})
    .then(() => console.log("mongodb connected"))
    .catch((e) => console.log(e));


app.use(expressLyouts);
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

//BodyParser
app.use(express.urlencoded({extended: false}));

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

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));
app.use('/token', require('./routes/tokens'));
// app.use('/api', require('./routes/api'));
app.use((req, res)=>{
    res.status(404).render('404');
});

module.exports = app;
