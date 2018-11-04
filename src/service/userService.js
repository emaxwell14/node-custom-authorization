const request = require('request-promise');
const { getUserUrl } = require('./configService');
const { User } = require('../model');

module.exports = {
    getUsersWithFilter,
};

const USER_URL = getUserUrl();

/**
 * Getting list of all users and then filtering them based on a certain field.
 * Returning a list of User Model objets.
 */
function getUsersWithFilter({ queryField, queryValue }) {
    return getUsers().then((users) => {
        const filteredUsers = users.filter(user => user[queryField] === queryValue);
        return filteredUsers.map(user => new User(user));
    });
}

/**
 * Getting list of all users
 * Returning a list of users parsed to JSON.
 */
function getUsers() {
    return request(USER_URL).then((response) => {
        const responseJson = JSON.parse(response);
        return responseJson.clients;
    });
}
