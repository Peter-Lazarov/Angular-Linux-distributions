const express = require('express');
const routes = require('./router');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const { userMiddleware } = require('./middlewares/userMiddleware');
const path = require('path');

const server = express();

// server.use('/static', express.static(path.join(__dirname, 'static')));
// //console.log(path.join(__dirname, 'static'));
// server.use(express.urlencoded({ extended: false }));
// server.use(cookieParser());
// server.set('view engine', 'hbs');
// server.engine('hbs', handlebars.engine({
//     extname: 'hbs',
// }));
server.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-authorization");
    next();
});

server.use(express.json());
//server.use(userMiddleware);

server.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/linuxDistributions');
mongoose.connection.on('connected', () => console.log('Database connected'));
mongoose.connection.on('disconnected', () => console.log('Database disconnected'));
mongoose.connection.on('error', (error) => console.log(error));

// server.get('/', (request, response) => {
//     response.send('Hello');
// });

server.listen(3000);
