const request = require('request-promise');
const { User } = require('../model');
const { config: { getUserUrl } } = require('../util');

module.exports = {
    getUsers,
};

const USER_URL = getUserUrl();

function getUsers() {
    return request(USER_URL).then((response) => {
        const responseJson = JSON.parse(response);
        return responseJson.clients.map(user => new User(user));
    });
}
