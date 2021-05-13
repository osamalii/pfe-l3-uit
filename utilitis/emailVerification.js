const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.sendGd);


const emailVerfication = (userEmail, token, host)=>{
console.log(token);
    const msg = {
        to: userEmail, // Change to your recipient
        from: 'oussama.aouli@uit.ac.ma', // Change to your verified sender
        subject: 'Email verification',
        // text: 'and easy to do anywhere, even with Node.js',
        html: 'Hello, \n' + `Please verify your account by clicking the link: \n http://${host}/token/confirmation/${token.token}`,
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
};

module.exports = emailVerfication;
