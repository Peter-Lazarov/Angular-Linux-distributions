const commentaryController = require('express').Router();

const userMiddleware = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const commentaryService = require('../services/commentaryService');

commentaryController.get('/:systemId', async (request, response) => {
    const systemId = request.params.systemId;

    try {
        const commentaryAll = await commentaryService.getAllForSystem(systemId).lean();
        response.json(commentaryAll);
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

commentaryController.post('/:systemId/add', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {

    try {
        const { content, systemId, userId } = request.body;

        const createdCommentary = await commentaryService.create(content, systemId, userId);
        response.json(createdCommentary);
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

module.exports = commentaryController;
