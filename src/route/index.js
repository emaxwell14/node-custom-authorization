const express = require('express');
const userRoutes = require('./userRoutes');
const policyRoutes = require('./policyRoutes');

module.exports = {
    getRouter,
};

function getRouter() {
    const router = express.Router();
    router.use(userRoutes.getRouter());
    router.use(policyRoutes.getRouter());
    return router;
}
