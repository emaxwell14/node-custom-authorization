const request = require('request-promise');
const { Policy } = require('../model');
const { config: { getPolicyUrl } } = require('../util');

module.exports = {
    getPolicies,
};

const POLICY_URL = getPolicyUrl();

function getPolicies() {
    return request(POLICY_URL).then((response) => {
        const responseJson = JSON.parse(response);
        return responseJson.policies.map(user => new Policy(user));
    });
}
