const fetch = require('isomorphic-fetch');

module.exports = async (token) => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.private_secret_recaptcha}&response=${token}`;
    const captcha = await fetch(url, {
        method: 'post'
    })
        .then(response => {
           return response.json()
        })
        .then(google_response => google_response)
        .catch(error => error);
    if(!captcha.success)
        throw new Error('Captcha Error');
    else
        return captcha;
};
