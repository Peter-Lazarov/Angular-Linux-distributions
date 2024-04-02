const Environment = require('../models/Environment');
const User = require('../models/User')

exports.getAll = () => Environment.find();
exports.create = async (userId, environmentData) => {
    const createdEnvironment = await Environment.create({
        publisher: userId,
        ...environmentData
    });
    
    await User.findByIdAndUpdate(userId, { $push: { publishedEnvironments: createdEnvironment._id } });

    return createdEnvironment;
}
exports.getOne = (environmentId) => Environment.findById(environmentId);
