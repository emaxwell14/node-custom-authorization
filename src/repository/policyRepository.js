const request = require('request-promise');
const { Policy } = require('../model');
const configService = require('../service/configService');

module.exports = {
    getPolicies,
};

const POLICY_URL = configService.getPolicyUrl();

function getPolicies() {
    return request(POLICY_URL).then((response) => {
        const responseJson = JSON.parse(response);
        return responseJson.policies.map(user => new Policy(user));
    });
}
