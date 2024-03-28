const System = require('../models/System');
const User = require('../models/User')


exports.getAll = () => System.find();

exports.create = async (userId, systemData) => {
    const systemCreated = await System.create({
        publisher: userId,
        ...systemData
    });

    await User.findByIdAndUpdate(userId, { $push: { publishedSystems: systemCreated._id } });

    return systemCreated;
}


// exports.getOneWithOwnerAndLikes = (distributionId) => Distribution.findById(distributionId).populate('owner').populate('likedList');
// exports.like = async (distributionId, userId) => {
//     await Distribution.findByIdAndUpdate(distributionId, { $push: { likedList: userId } });
//     await User.findByIdAndUpdate(userId, { $push: { likedStones: distributionId } });
// };
// exports.delete = (distributionId) => Distribution.findByIdAndDelete(distributionId);
// exports.edit = (distributionId, distributionData) => Distribution.findByIdAndUpdate(distributionId, distributionData, { runValidators: true });
// exports.getOne = (distributionId) => Distribution.findById(distributionId);
// exports.getLastThree = () => Distribution.find().sort({createdAt: -1}).limit(3);
