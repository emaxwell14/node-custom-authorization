'use strict';

var express = require('express');
var userRoutes = require('./userRoutes');

module.exports = {
    getRouter: getRouter
};

function getRouter() {
    var router = express.Router();
    router.use(userRoutes.getRouter());
    return router;
}