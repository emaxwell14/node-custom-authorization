'use strict';

var request = require('request-promise');

var _require = require('./configService'),
    getUserUrl = _require.getUserUrl;

var _require2 = require('../model'),
    User = _require2.User;

module.exports = {
    getUsersByUsername: getUsersByUsername,
    getUsersById: getUsersById
};

var USER_URL = getUserUrl();

function getUsersByUsername(username) {
    return getUsers().then(function (users) {
        var filteredUsers = users.filter(function (user) {
            return user.name === username;
        });

        console.log('filteredUsers', filteredUsers);
        return filteredUsers.map(function (filteredUser) {
            return new User(filteredUser);
        });
    });
}

function getUsersById(id) {
    return getUsers().then(function (users) {
        return users.filter(function (user) {
            return user.id === id;
        });
    });
}

function getUsers() {
    return request(USER_URL).then(function (response) {
        var responseJson = JSON.parse(response);
        return responseJson.clients;
    });
}