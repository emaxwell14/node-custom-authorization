const { policyRepository } = require('../repository');

module.exports = {
    getPolicy,
    getPolicies,
};

/**
 * Get policy by id
 */
function getPolicy(id) {
    return getPolicies().then(policies => policies.find(policy => policy.id === id));
}

/**
 * Get all policies or filter all based on a query
 */
function getPolicies(query) {
    return policyRepository.getPolicies().then((policies) => {
        if (query) {
            return policies.filter(policy => policy[query.name] === query.value);
        }
        return policies;
    });
}
