const mongoose = require('mongoose');


const AppointmentSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true,
    },
    _userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dayRange:{
        type: String
    },
    _centerId:{
        type: mongoose.Schema.Types.ObjectId,
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
