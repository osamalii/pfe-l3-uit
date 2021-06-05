const User = require('../models/User');

async function getUserInfoByCin(_userCin) {
    let promise = new Promise((resolve, reject)=>{
        User.findOne({cin:_userCin, AccountType:'patient'})
            .then(theUser => {
                const info = {
                    name: theUser.name,
                    lastname: theUser.lastname,
                    gender: theUser.gender,
                    cin: theUser.cin,
                    birthDate: theUser.birthDate,
                    isVaccinated:theUser.isVaccinated,
                    avis:theUser.avis
                };
                console.log(info);
                if(theUser) resolve(info);
                else reject('User not found');
            })
    });
    return promise;
}

module.exports = getUserInfoByCin;
