const User = require('../models/User');


async function getUserInfo(_userId) {
    let promise = new Promise((resolve, reject)=>{
        User.findOne({_id:_userId})
            .then(theUser => {
                const info = {
                    name: theUser.name,
                    lastname: theUser.lastname,
                    gender: theUser.gender,
                    cin: theUser.cin,
                    birthDate: theUser.birthDate
                };
                console.log(info);
                if(theUser) resolve(info);
                else reject('User not found');
            })
    });
    return promise;
}

module.exports = getUserInfo;
