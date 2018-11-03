const request = require('request-promise');
const { getUserUrl } = require('./configService');
const { User } = require('../model');

module.exports = {
    getUsersByUsername,
    getUsersById,
};

const USER_URL = getUserUrl();

function getUsersByUsername(username) {
    return getUsers().then((users) => {
        const filteredUsers = users.filter(user => user.name === username);

        console.log('filteredUsers', filteredUsers);
        return filteredUsers.map(filteredUser => new User(filteredUser));
    });
}

function getUsersById(id) {
    return getUsers().then(users => users.filter(user => user.id === id));
}

function getUsers() {
    return request(USER_URL).then((response) => {
        const responseJson = JSON.parse(response);
        return responseJson.clients;
    });
}
