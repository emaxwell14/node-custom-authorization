const request = require('request-promise');
const { getUserUrl } = require('./configService');

module.exports = {
    getUsersByUsername,
};

const USER_URL = getUserUrl();

function getUsersByUsername(username) {
    return getUsers();
}

function getUsersById(id) {
    // getUsers().then
}

function getUsers() {
    return request(USER_URL);
}
