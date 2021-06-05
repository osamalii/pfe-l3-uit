const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
       type: String,
   },
    lastname:{
        type: String,
    },
    cin:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
    },
    birthDate:{
       type: Date,
    },
    gender:{
        type: String,
    },
    AccountType: {
        type: String, //patient // responsable  // admin
        required:true
    },
    isVaccinated:{
      type:Number,
        default:0
    },
    isVerified: {
       type: Boolean, default: false
    },
    avis:{
        type: String
    },
    hasAppointment:{
        type: Boolean
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
