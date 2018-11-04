const request = require('request-promise');
const { User } = require('../model');
const configService = require('../service/configService');

module.exports = {
    getUsers,
};

const USER_URL = configService.getUserUrl();

function getUsers() {
    return request(USER_URL).then((response) => {
        const responseJson = JSON.parse(response);
        return responseJson.clients.map(user => new User(user));
    });
}
