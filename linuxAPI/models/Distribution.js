const mongoose = require('mongoose');

const distributionSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    description:{
        type: String,
        minlength: 2,
        required: true
    },
    image: {
        type: String,
        //match: /^https?:\/\/.*$/,
        required: false
    },
    publisher:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Distribution = mongoose.model('Distribution', distributionSchema);

module.exports = Distribution;
