const Appointment = require('../models/Appointment');

const getAppointmentInfo = async (_userId) => {
    return await Appointment.findOne({_userId: _userId}).sort({_id:-1}).limit(1)
        .then(theAppointment =>{
            return theAppointment || false;
        });
};

module.exports = getAppointmentInfo;

