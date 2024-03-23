const systemController = require('express').Router();

const { isAuthenticated } = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const systemService = require('../services/systemService');

systemController.get('/', async (request, response) => {
    const systemAll = await systemService.getAll().lean();
    
    response.json(systemAll);

    //response.render('systems/dashboard', { systemAll });
});

systemController.get('/:systemId/details', async (request, response) => {
    const systemDetails = await systemService.getOneWithOwnerAndLikes(request.params.systemId).lean();
    const systemPublisherId = systemDetails.owner._id.toString();

    //const isOwner = systemPublisherId && systemPublisherId == request.user?._id; //optional chaining if there is no ? and the value is undefined it will crash
    //const isLiked = systemDetails.likedList.some(user => user._id.toString() == request.user?._id);

    request.systemCurrent = systemDetails;

    //response.render('systems/details', { ...systemDetails, isOwner, isLiked });
});

async function isSystemOwner(systemId, userId) {
    const system = await systemService.getOne(systemId).lean();
    const ownerId = system.owner.toString();

    if (ownerId && ownerId == userId) {
        return true;
    }
    return false;
};

async function loadsystemInRequest(request, response, next) {
    request.systemCurrent = await systemService.getOne(request.params.systemId).lean();
    next();
};

module.exports = systemController;
