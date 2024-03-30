const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    environment:{
        type: mongoose.Types.ObjectId,
        ref: 'Environment'
    },
    distribution:{
        type: mongoose.Types.ObjectId,
        ref: 'Distribution'
    },
    commentaries: [{
        type: mongoose.Types.ObjectId,
        ref: 'Commentar'
    }],
    publisher: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const System = mongoose.model('System', systemSchema);

module.exports = System;
