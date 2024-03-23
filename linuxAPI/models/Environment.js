const mongoose = require('mongoose');

const environmentSchema = new mongoose.Schema({
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
        match: /^https?:\/\/.*$/,
        required: true
    },
    // publisher:{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // }
})

const Environment = mongoose.model('Environment', environmentSchema);

module.exports = Environment;
