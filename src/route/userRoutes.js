const express = require('express');
const { userService, FieldQuery } = require('../service');
const { authorization: { isAdmin, isUser } } = require('../middleware');

module.exports = {
    getRouter,
};

function getUser({ params: { id } }, res) {
    return userService.getUserByUniqueField(new FieldQuery('id', id)).then(user => res.send({ user }));
}

function getUsersByUsername({ params: { username } }, res) {
    return userService.getUserByUniqueField(new FieldQuery('username', username)).then(user => res.send({ user }));
}

function getUsersByPolicyId({ params: { id } }, res) {
    return userService.getUsersByPolicyId(id).then(user => res.send({ user }));
}

function getRouter() {
    const router = express.Router();
    router.get('/users/:id', isUser, getUser);
    router.get('/users/username/:username', isUser, getUsersByUsername);
    router.get('/users/policies/:id', isAdmin, getUsersByPolicyId);
    return router;
}
