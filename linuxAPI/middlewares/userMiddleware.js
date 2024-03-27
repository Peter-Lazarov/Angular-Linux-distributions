const jsonwebtoken = require('jsonwebtoken');
const { secretKey } = require('../config');
const { authorisationCookie } = require('../utility/cookie');

exports.userMiddleware = (request, response, next) => {
    const token = request.cookies[authorisationCookie] || '';
    
    if(!token){
       return next();
    }
    
    try {
        const decodedToken = jsonwebtoken.verify(token, secretKey);
        request.user = decodedToken;
        
        next();
    } catch (error) {
        console.log(error);
        response.clearCookie(authorisationCookie).status(204);
        response.redirect('/');
    }
};

exports.isAuthenticated = (request, response, next) => {
    if (!request.user) {
        return response.redirect('/user/login');
    }

    next();
};

exports.isGuest = (request, response, next) => {
    if (request.user) {
        return response.redirect('/');
    }

    next();
};
