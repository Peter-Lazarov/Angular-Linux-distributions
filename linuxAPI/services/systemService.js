const System = require('../models/System');
const User = require('../models/User')


exports.getAll = () => System.find().populate('environment').populate('distribution');

exports.create = async (userId, systemData) => {
    const systemCreated = await System.create({
        publisher: userId,
        ...systemData
    });

    await User.findByIdAndUpdate(userId, { $push: { publishedSystems: systemCreated._id } });

    return systemCreated;
}

exports.getOneWithCommentariesAndPublisher = (systemId) => System.findById(systemId).populate('environment').populate('distribution').populate('commentary').populate('publisher');
exports.edit = (systemId, systemData) => System.findByIdAndUpdate(systemId, systemData, { runValidators: true });
exports.delete = async (systemId, userId) => {
    const systemDeleted = await System.findOneAndDelete({ _id: systemId, publisher: userId });
    await User.findOneAndUpdate({ _id: userId}, { $pull: { publishedSystems: systemId }});

    return systemDeleted;
}
