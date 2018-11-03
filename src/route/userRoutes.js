const express = require('express');

module.exports = {
    getRouter,
};

function getUsers(req, res) {
    res.send({ text: 'Hello from express' });
}

function getRouter() {
    const router = express.Router();
    router.get('/users', getUsers);
    return router;
}
