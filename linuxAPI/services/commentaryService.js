const Commentary = require('../models/Commentary');
const System = require('../models/System');
const User = require('../models/User')

exports.getAll = (systemId) => Commentary.find(systemId).populate('userId', 'name');
exports.create = async (content, systemId, userId) => {

    const createdCommentary = await Commentary.create({
        content,
        systemId,
        userId
    });
    
    await User.findByIdAndUpdate(userId, { $push: { publishedCommentary: createdCommentary._id } });
    await System.findByIdAndUpdate(systemId, { $push: { commentary: createdCommentary._id } });

    return createdCommentary;
}
