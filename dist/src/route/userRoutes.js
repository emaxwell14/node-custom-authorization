'use strict';

var express = require('express');

var _require = require('../service'),
    _require$userService = _require.userService,
    getUsersByUsername = _require$userService.getUsersByUsername,
    getUsersById = _require$userService.getUsersById;

module.exports = {
    getRouter: getRouter
};

/**
 * Should filtering be enforced?
    Can user query all? No enforce one filter
    Can user query with both id and username? Confusing enforce one filter
    Handle response generically?
 */
function getUsers(_ref, res) {
    var _ref$query = _ref.query,
        id = _ref$query.id,
        username = _ref$query.username;

    if (id === null && username === null) {
        throw new Error();
    } else if (id) {
        getUsersById(id).then(function (users) {
            return res.send({ users: users });
        });
    } else {
        getUsersByUsername(username).then(function (users) {
            return res.send({ users: users });
        });
    }
}

function getRouter() {
    var router = express.Router();
    router.get('/user/', getUsers);
    return router;
}