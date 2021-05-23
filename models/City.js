const mongoose = require('mongoose');


const CitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    centers:[{
        centerName: String,
        capacity:Number,
        doctors: Array,
        patients : Array,
    }]
});

const City = mongoose.model('City', CitySchema);

module.exports = City;
