const Distribution = require('../models/Distribution');
const User = require('../models/User')

exports.getAll = () => Distribution.find();
exports.create = async (userId, distributionData) => {
    const createdDistribution = await Distribution.create({
        publisher: userId,
        ...distributionData
    });

    await User.findByIdAndUpdate(userId, { $push: { publishedDistributions: createdDistribution._id } });

    return createdDistribution;
}
exports.getOne = (distributionId) => Distribution.findById(distributionId);
