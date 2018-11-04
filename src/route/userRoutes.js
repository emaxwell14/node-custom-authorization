const express = require('express');
const { userService: { getUsersWithFilter } } = require('../service');

module.exports = {
    getRouter,
};

/**
 * Handling user in one endpoint and using query params.
 * Allowing exactly one query param, either name or id.
 * Not allowing no params as do not want users queying entire list.
 * Not allowing both query params as spec requests two separate enpoints.
 */
function getUsers({ query: { id, name } }, res) {
    if (id === null && name === null) {
        throw new Error('Must query by id or name');
    } else if (id && name) {
        throw new Error('Can only query by one field');
    }

    const queryField = id ? 'id' : 'name';
    const queryValue = id || name;

    getUsersWithFilter({ queryField, queryValue }).then(users => res.send({ users }));
}

function getRouter() {
    const router = express.Router();
    router.get('/user/', getUsers);
    return router;
}
