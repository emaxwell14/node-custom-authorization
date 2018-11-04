const express = require('express');
const { userService, FieldQuery } = require('../service');

module.exports = {
    getRouter,
};

/**
 * Handling user in one endpoint and using query params.
 * Allowing exactly one query param, either name or id.
 * Not allowing no params as do not want clients querying entire list.
 * Not allowing both query params as spec requests two separate enpoints.
 */
function getUser({ params: { id } }, res) {
    userService.getUserByUniqueField(new FieldQuery('id', id)).then(user => res.send({ user }));
}

function getUsersByUsername({ params: { username } }, res) {
    userService.getUserByUniqueField(new FieldQuery('username', username)).then(user => res.send({ user }));
}

function getUsersByPolicyId({ params: { id } }, res) {
    userService.getUsersByPolicyId(id).then(user => res.send({ user }));
}

function getRouter() {
    const router = express.Router();
    router.get('/users/:id', getUser);
    router.get('/users/username/:username', getUsersByUsername);
    router.get('/users/policies/:id', getUsersByPolicyId);
    return router;
}
