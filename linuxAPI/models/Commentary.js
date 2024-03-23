const mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        required: true
    },
    content:{
        type: String,
        minlength: 5,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Commentary = mongoose.model('Commentary', commentarySchema);

module.exports = Commentary;
