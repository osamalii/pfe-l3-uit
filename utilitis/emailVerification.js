const sgMail = require('@sendgrid/mail');
const Token = require('../models/Token');
sgMail.setApiKey(process.env.sendGd);
const crypto = require('crypto');
const emailBuilder = require('./emailTemplate');


const emailVerfication = (userEmail, _userId, type)=>{
    let token = new Token({ _userId: _userId, token: crypto.randomBytes(16).toString('hex'), T_type: type });
    console.log(token);
    token.save(function (err) {
        if (err)
            throw err;

        var   url = 'http://'+ process.env.host + '/token/confirmation/'+token.token;
        var template = emailBuilder.verifyEmailBuilder(url);
        if(token.T_type === 'reset'){
            url = `http://${process.env.host}/users/requestresetpassword/${token.token}`;
            template = emailBuilder.ResetEmailBuilder(url)
        }else if(token.T_type === 'completeRegistration'){
            url = `http://${process.env.host}/users/completeRegistration/${token.token}`;
            template = emailBuilder.completeRegistrationEmailBuilder(url)
        }
        console.log(url);
        const msg = {
            to: userEmail,
            from: 'oussama.aouli@uit.ac.ma',
            subject: 'Email verification',
            // text: 'and easy to do anywhere, even with Node.js',
            html: template
        };
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })


    });


};





module.exports = emailVerfication;
