const distributionController = require('express').Router();

const userMiddleware = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const distributionService = require('../services/distributionService');

distributionController.get('/', async (request, response) => {
    const distributionAll = await distributionService.getAll().lean();

    response.json(distributionAll);
});

distributionController.post('/add', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    const distributionForm = request.body;

    try {
        const createdDistribution = await distributionService.create(request.user._id, distributionForm);

        response.json(createdDistribution);
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

distributionController.get('/:distributionId/details', async (request, response) => {
    const distributionDetails = await distributionService.getOne(request.params.distributionId).lean();
    const distributionPublisherId = distributionDetails.publisher.toString();

    const isPublisher = distributionPublisherId && distributionPublisherId == request.user?._id;

    request.distributionCurrent = distributionDetails;
    
    response.json({ ...distributionDetails, isPublisher});
});

module.exports = distributionController;
