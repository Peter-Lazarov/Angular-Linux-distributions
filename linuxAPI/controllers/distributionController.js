const distributionController = require('express').Router();

const { isAuthenticated } = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const distributionService = require('../services/distributionService');

distributionController.get('/', async (request, response) => {
    const distributionAll = await distributionService.getAll().lean();

    response.json(distributionAll);
});

distributionController.post('/create', isAuthenticated, async (request, response) => {
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

module.exports = distributionController;
