const systemController = require('express').Router();

const userMiddleware = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const systemService = require('../services/systemService');

systemController.get('/', async (request, response) => {
    const systemAll = await systemService.getAll();

    response.json(systemAll);

    //response.render('systems/dashboard', { systemAll });
});

systemController.get('/:systemId/details', async (request, response) => {
    const systemDetails = await systemService.getOneWithCommentariesAndPublisher(request.params.systemId).lean();
    const systemPublisherId = systemDetails.publisher._id.toString();

    const isPublisher = systemPublisherId && systemPublisherId == request.user?._id; //optional chaining if there is no ? and the value is undefined it will crash
    //const isLiked = systemDetails.likedList.some(user => user._id.toString() == request.user?._id);

    request.systemCurrent = systemDetails;

    response.json({ ...systemDetails, isPublisher });
});

systemController.post('/add', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    let systemForm = request.body;

    try {
        //console.log('systemController add ' + JSON.stringify(request.user));
        const systemCreated = await systemService.create(request.user._id, systemForm);

        response.json(systemCreated);
    } catch (error) {
        console.error(error);

        const errorMessage = getErrorMessage(error);

        if (error.name === 'ValidationError') {
            response.status(400).json({ error: errorMessage });
        } else {
            response.status(500).json({ error: errorMessage });
        }
    }
});

systemController.put('/:systemId/update', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    //console.log('request.params.systemId ' + request.params.systemId);
    if (isSystemPublisher(request.params.systemId, request.user?._id)) {
        const courseEditForm = request.body;

        try {
            await systemService.edit(request.params.systemId, courseEditForm);
            //response.redirect(`/system/${request.params.systemId}/details`);
            //response.json(systemCreated);
        } catch (error) {
            console.error(error);

            const errorMessage = getErrorMessage(error);

            if (error.name === 'ValidationError') {
                response.status(400).json({ error: errorMessage });
            } else {
                response.status(500).json({ error: errorMessage });
            }
        }
    } else {
        response.redirect('/system');
    }
});

systemController.delete('/:systemId/delete', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    if (isSystemPublisher(request.params.systemId, request.user?._id)) {

        try {
            const deletedSystem = await systemService.delete(request.params.systemId, request.user._id);
            //response.redirect('/system');
            response.json(deletedSystem);
        } catch (error) {
            console.error(error);

            const errorMessage = getErrorMessage(error);

            if (error.name === 'ValidationError') {
                response.status(400).json({ error: errorMessage });
            } else {
                response.status(500).json({ error: errorMessage });
            }
        }
    }else {
        response.status(403).json({ error: "User is not the publisher of the system." });
    }
});

async function isSystemPublisher(systemId, userId) {
    const system = await systemService.getOneWithCommentariesAndPublisher(systemId).lean();
    //console.log(system);
    const publisherId = system.publisher.toString();

    if (publisherId && publisherId == userId) {
        return true;
    }
    return false;
};

async function loadsystemInRequest(request, response, next) {
    request.systemCurrent = await systemService.getOne(request.params.systemId).lean();
    next();
};

module.exports = systemController;
