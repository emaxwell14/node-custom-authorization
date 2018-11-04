const { policyRepository } = require('../repository');

module.exports = {
    getPolicy,
};

function getPolicy(id) {
    return getPolicies().then(policies => policies.filter(policy => policy.id === id));
}

function getPolicies(query) {
    return policyRepository.getPolicies().then((policies) => {
        if (query) {
            return policies.filter(policy => policy[query.name] === query.value);
        }
        return policies;
    });
}
