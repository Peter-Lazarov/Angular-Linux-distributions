const Commentary = require('../models/Distribution');
const User = require('../models/User')

exports.getAll = () => Commentary.find();
exports.create = async (userId, commentaryData) => {
    const createdCommentary = await Commentary.create({
        publisher: userId,
        ...commentaryData
    });

    await User.findByIdAndUpdate(userId, { $push: { publishedCommentary: createdCommentary._id } });

    return createdCommentary;
}
