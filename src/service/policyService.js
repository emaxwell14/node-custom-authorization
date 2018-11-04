const request = require('request-promise');
const { getPolicyUrl } = require('./configService');
const { Policy } = require('../model');

module.exports = {
    getPoliciesWithFilter,
};

const POLICY_URL = getPolicyUrl();

/**
 * Getting list of all policies and then filtering them based on a certain field.
 * Returning a list of Policy Model objets.
 */
function getPoliciesWithFilter({ queryField, queryValue }) {
    return getPolicies().then((policies) => {
        const filteredPolicies = policies.filter(policy => policy[queryField] === queryValue);
        return filteredPolicies.map(policy => new Policy(policy));
    });
}

/**
 * Getting list of all policies
 * Returning a list of policies parsed to JSON.
 */
function getPolicies() {
    return request(POLICY_URL).then((response) => {
        const responseJson = JSON.parse(response);
        return responseJson.policies;
    });
}
