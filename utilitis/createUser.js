const User = require('../models/User');
const hashPass = require('../utilitis/hashPass');


module.exports = async (userInfoArr, isPwd) => {
    let UserInfo = Object.fromEntries(userInfoArr);
    let errors = [];
    if(isPwd)
    if(UserInfo.password !== UserInfo.password2){
        errors.push({msg: 'Passwords do not match'});
    }
    await User.findOne({cin: UserInfo.cin})
        .then(user => {
            if (user) errors.push({msg: 'CIN Is Already Registered'});
        });
    await User.findOne({email: UserInfo.email})
        .then(user => {
            if (user)
               if(!user.isVerified) errors.push({msg: 'Already Registered, Please Verify You Email'});
               else errors.push({msg: 'Email Is Already Registered'});
        });
    if(errors.length > 0) throw errors;

    const  newUser = new User(UserInfo);
    if(isPwd){
        newUser.password = hashPass(UserInfo.password);
    }
    newUser.save()
        .catch(err => console.log(err));
    return newUser;
};
