const environmentController = require('express').Router();

const userMiddleware = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const environmentService = require('../services/environmentService');

environmentController.get('/', async (request, response) => {
    const environmentAll = await environmentService.getAll().lean();

    response.json(environmentAll);
});

environmentController.post('/add', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    let environmentForm = request.body;

    try {
        //console.log('environmentController add ' + JSON.stringify(request.user));
        const senvironmentCreated = await environmentService.create(request.user._id, environmentForm);
        
        response.json(senvironmentCreated);
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

environmentController.get('/:environmentId/details', async (request, response) => {
    const environmentDetails = await environmentService.getOne(request.params.environmentId).lean();
    const environmentPublisherId = environmentDetails.publisher.toString();

    const isPublisher = environmentPublisherId && environmentPublisherId == request.user?._id;

    request.environmentCurrent = environmentDetails;
    
    response.json({ ...environmentDetails, isPublisher});
});

module.exports = environmentController;
