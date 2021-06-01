const mongoose = require('mongoose');


const CalendarSchema = new mongoose.Schema({
    day:{
        type: Date,
    },
    _centerId:{
      type: mongoose.Schema.Types.ObjectId
    },
    _cityId:{
        type: mongoose.Schema.Types.ObjectId
    },
    numPatients:{
        type: Number,
    },
    appointments: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

const Calendar = mongoose.model('Calendar', CalendarSchema);

module.exports = Calendar;
