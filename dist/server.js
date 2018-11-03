'use strict';

/* eslint-disable no-console */
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var api = require('./src/route');

var app = express();
var router = express.Router();

var _require = require('./src/service'),
    configService = _require.configService;

var port = configService.getServerPort();

// Define middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO remove
router.use(function (req, res, next) {
    console.log(chalk.green('Request Received with path: ', req.originalUrl));
    next();
});

// Define routes
router.use(api.getRouter());

// Error handler
router.use(function (err, req, res, next) {
    console.log(chalk.red('Error handler: '), err);
    res.status(500).send('Server Error');
});

// Add route in app
app.use('/', router);

// Start server
app.listen(port, function (err) {
    if (err) {
        console.log(chalk.red('Server Error: '), err);
    }
    console.log(chalk.blue('Server is listening on ' + port));
});