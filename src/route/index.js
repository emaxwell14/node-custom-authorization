const express = require('express');
const userRoutes = require("./userRoutes");

module.exports = {
    getRouter,
};

function getRouter() {
    const router = express.Router();
    router.use(userRoutes.getRouter());
    return router;
}
