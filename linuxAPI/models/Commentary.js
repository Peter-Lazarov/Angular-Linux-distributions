const mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
    content:{
        type: String,
        minlength: 5,
        required: true
    },
    systemId:{
        type: mongoose.Types.ObjectId,
        ref: 'System'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Commentary = mongoose.model('Commentary', commentarySchema);

module.exports = Commentary;
