/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const passport = require('passport');
const api = require('./src/route');
const loginRoute = require('./src/route/loginRoute');
const { config } = require('./src/util');

const app = express();
const router = express.Router();
const port = config.getServerPort();

// Define middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./src/middleware/authentication');

// Define routes
router.use(api.getRouter());

// Add routes in app and authenticate all but login
app.use('/login', loginRoute);
app.use('/', passport.authenticate('jwt', { session: false }), router);

// Error handler
app.use((error, req, res, next) => {
    console.log(chalk.red('Error handler: '), error);
    res.status(error.status).send({ error });
    next();
});

// Start server
app.listen(port, (err) => {
    if (err) {
        console.log(chalk.red('Server Error: '), err);
    }
    console.log(chalk.blue(`Server is listening on ${port}`));
});
