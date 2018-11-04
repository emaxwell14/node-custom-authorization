const request = require('request-promise');
const { User } = require('../model');
const { config: { getUserUrl } } = require('../util');

module.exports = {
    getUsers,
};

const USER_URL = getUserUrl();

/**
 * Get all users from the datasouce and return them as an array od
 * domain objects
 */
function getUsers() {
    return request(USER_URL).then((response) => {
        const responseJson = JSON.parse(response);
        return responseJson.clients.map(user => new User(user));
    });
}
