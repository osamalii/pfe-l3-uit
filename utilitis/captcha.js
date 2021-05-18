const fetch = require('isomorphic-fetch');

module.exports = async (token) => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.private_secret_recaptcha}&response=${token}`;
    await fetch(url, {
        method: 'post'
    })
        .then(response => {
           return response.json()
        })
        .then(google_response =>  {
           console.log(google_response);
            return google_response
        } )
        .catch(error => {
            console.log(error);
        return  error
        });
};
