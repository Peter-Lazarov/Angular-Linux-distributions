const commentaryController = require('express').Router();

const { isAuthenticated } = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const commentaryService = require('../services/commentaryService');

commentaryController.get('/', async (request, response) => {
    const commentaryAll = await commentaryService.getAll().lean();

    response.json(commentaryAll);
});

commentaryController.post('/create', isAuthenticated, async (request, response) => {
    const commentaryForm = request.body;

    try {
        const createdCommentary = await commentaryService.create(request.user._id, commentaryForm);

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
