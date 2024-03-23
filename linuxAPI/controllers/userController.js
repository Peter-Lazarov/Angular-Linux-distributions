const userController = require('express').Router();

const { isAuthenticated } = require('../middlewares/userMiddleware');
const userService = require('../services/userService');
const { getErrorMessage } = require('../utility/errorsUtility');

userController.post('/register', async (request, response) => {
    try{
        const userData = request.body;
        //console.log('controler register ' + request.body);
        
        const { _id, email, name, token } = await userService.register(userData);
    
        response.json({
            _id,
            email,
            name,
            accessToken: token
        });
    }catch (error) {
        console.error(error);

        const errorMessage = getErrorMessage(error);

        if (error.name === 'ValidationError') {
            response.status(400).json({ error: errorMessage });
        } else {
            response.status(500).json({ error: errorMessage });
        }
    }
});

userController.post('/login', async (request, response) => {
    try {
        const userData = request.body;
        //console.log('controler register ' + request.body);
        
        const { _id, email, token } = await userService.login(userData);
    
        response.json({
            _id,
            email,
            accessToken: token
        });
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

userController.get('/logout', isAuthenticated, (request, response) => {
    response.json({ ok: true});
});

module.exports = userController;
