const express = require('express');
const { userService: { getUsersByUsername, getUsersById } } = require('../service');

module.exports = {
    getRouter,
};

/**
 * Should filtering be enforced?
    Can user query all? No enforce one filter
    Can user query with both id and username? Confusing enforce one filter
    Handle response generically?
 */
function getUsers({ query: { id, username } }, res) {
    if (id === null && username === null) {
        throw new Error();
    } else if (id) {
        getUsersById(id).then(users => res.send({ users }));
    } else {
        getUsersByUsername(username).then(users => res.send({ users }));
    }
}

function getRouter() {
    const router = express.Router();
    router.get('/user/', getUsers);
    return router;
}
