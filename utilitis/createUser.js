const User = require('../models/User');
const bcrypt = require('bcryptjs');


module.exports = async (UserInfo) => {
    return await User.findOne({cin: UserInfo.cin})
        .then(userByCin => {
            var errors = [];
            if (userByCin) {
                errors.push({msg: 'CIN Is Already Registred'});
                return errors;
            } else { // cin not registred
                return User.findOne({email: UserInfo.email})
                    .then((user) => {
                        console.log(user);
                        if (user) { //user already exists and cin not registred
                            errors.push({msg: 'Email Is Already Registred'});
                            return errors;
                        } else { // user doesnt exist neither cin
                            const newUser = new User({
                                name: UserInfo.name,
                                lastname: UserInfo.lastname,
                                email: UserInfo.email,
                                password: UserInfo.password,
                                birthDate: UserInfo.birthDate,
                                gender: UserInfo.gender,
                                cin: UserInfo.cin,
                                AccountType: UserInfo.AccountType
                            });
                            console.log(newUser);
                            //hash password
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err)
                                        throw err;
                                     newUser.password = hash;
                                     newUser.save()
                                        .then(user => {
                                            console.log(user);
                                        })
                                        .catch(err => console.log(err));
                                })
                            })
                        }
                    });
            }
        });

};
