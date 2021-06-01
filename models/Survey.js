const mongoose = require('mongoose');


const SurveySchema = new mongoose.Schema({
    _userId:{
        type: mongoose.Types.ObjectId
    },
    feverRate:{
        type: Number
    },
    pain: {
        type: Number
    },
    redness: {
        type: Number
    },
    Swelling: {
        type: Number
    },
    Itching: {
        type: Number
    },
    Chills: {
        type: Number
    },
    Headache: {
        type: Number
    },
    Fatigue: {
        type: Number
    },
    Joint: {
        type: Number
    },
    Nausea: {
        type: Number
    },
    Vomiting: {
        type: Number
    },
    Diarrhea: {
        type: Number
    },
    AbdominalRash: {
        type: Number
    },
    workcheck: {
        type: Number
    },
    activitiescheck: {
        type: Number
    },
    professionalcheck: {
        type: Number
    }

});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;
