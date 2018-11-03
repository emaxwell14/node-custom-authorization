/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const api = require('./src/route');

const app = express();
const router = express.Router();
const configService = require('./src/service/configService');

const port = configService.getServerPort();

// Define middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO remove
router.use((req, res, next) => {
    console.log(chalk.green('Request Received with path: ', req.originalUrl));
    next();
});

// Define routes
router.use(api.getRouter());

// Error handler
router.use((err, req, res, next) => {
    console.log(chalk.red('Error handler: '), err);
    res.status(500).send('Server Error');
});

// Add route in app
app.use('/', router);

// Start server
app.listen(port, (err) => {
    if (err) {
        console.log(chalk.red('Server Error: '), err);
    }
    console.log(chalk.blue(`Server is listening on ${port}`));
});
