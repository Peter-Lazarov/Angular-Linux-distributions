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
    commentary: [{
        type: mongoose.Types.ObjectId,
        ref: 'Commentary'
    }],
    publisher: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},
{ timestamps: true });

const System = mongoose.model('System', systemSchema);

module.exports = System;
