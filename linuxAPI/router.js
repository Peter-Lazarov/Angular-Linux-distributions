const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const commentaryController = require('./controllers/commentaryController');

const systemController = require('./controllers/systemController');
const distributionController = require('./controllers/distributionController');
const environmentController = require('./controllers/environmentController');

//router.use('/', homeController);
router.use('/system', systemController);
router.use('/distribution', distributionController);
router.use('/environment', environmentController);
router.use('/commentary', commentaryController);
router.use('/user', userController);

router.all('*', (request, response) => {
    response.render('404');
});

module.exports = router;
