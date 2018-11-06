const express = require('express');
const { userService, FieldQuery } = require('../service');
const { authorization: { isAdmin, isUser } } = require('../middleware');

module.exports = {
    getRouter,
    // For unit tests
    getUser,
    getUsersByUsername,
    getUsersByPolicyId,
};

/**
 * Get user by id
 */
function getUser({ params: { id } }, res) {
    return userService.getUserByUniqueField(new FieldQuery('id', id)).then(user => res.send({ data: user }));
}

/**
 * Get user by username
 */
function getUsersByUsername({ params: { username } }, res) {
    return userService.getUserByUniqueField(new FieldQuery('username', username)).then(user => res.send({ data: user }));
}

/**
 * Get user by a policy id
 */
function getUsersByPolicyId({ params: { id } }, res) {
    return userService.getUsersByPolicyId(id).then(user => res.send({ data: user }));
}

function getRouter() {
    const router = express.Router();
    router.get('/users/:id', isUser, getUser);
    router.get('/users/username/:username', isUser, getUsersByUsername);
    router.get('/users/policies/:id', isAdmin, getUsersByPolicyId);
    return router;
}
