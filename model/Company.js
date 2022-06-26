const mongoose = require('mongoose');

const Company = mongoose.Schema({
    companyCode:{
        type: String,
        required: true
    } ,
    companyName: {
        type: String,
        required: true
    } ,
    date: {
        type: Date,
        default: Date.UTC
    },
    logo: {
        type: String,
        required: true
    },
    stockPrice: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Company', Company, 'Company');