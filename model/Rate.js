const mongoose = require('mongoose');
const RateSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

const Rate = module.exports = mongoose.model('Rate',RateSchema);