const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
   name:{
       type: String,
       required: true
   },
    lastname:{
        type: String,
        required: true
    },
    cin:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    birthDate:{
       type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    AccountType: {
        type: String, //patient // doctor // director // admin
        required:true
    },
    isVerified: {
       type: Boolean, default: false
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
