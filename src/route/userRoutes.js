const express = require('express');
const { userService: { getUsersByUsername } } = require('../service');

module.exports = {
    getRouter,
};

/**
 * Should filtering be enforced?
    Can user query all? No enforce one filter
    Can user query with both id and username? Why not?
 */
function getUsers({ query: { id, username } }, res) {
    console.log(id);
    console.log(username);
    if (id === null && username === null) {
        throw new Error();
    }
    getUsersByUsername().then(users => res.send({ users, id, username }));
}

function getRouter() {
    const router = express.Router();
    router.get('/user/', getUsers);
    return router;
}
