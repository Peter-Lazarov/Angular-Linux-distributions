const environmentController = require('express').Router();

const { isAuthenticated } = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const environmentService = require('../services/environmentService');

environmentController.get('/', async (request, response) => {
    const environmentAll = await environmentService.getAll().lean();

    response.json(environmentAll);
});

environmentController.post('/create', async (request, response) => {
    const environmentForm = request.body;
    console.log('request ' + JSON.stringify(request.body));
    console.log('environmentForm' + JSON.stringify(environmentForm));
    //request.user._id
    try {
        const createdEnvironment = await environmentService.create("123", environmentForm);

        response.json(createdEnvironment);
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

module.exports = environmentController;
