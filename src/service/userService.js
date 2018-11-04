const { userRepository } = require('../repository');
const policyService = require('./policyService');
const FieldQuery = require('./FieldQuery');

module.exports = {
    getUserByUniqueField,
    getUsersByPolicyId,
};

/**
 * Get a single user based on a query. Currentl supports id and email
 */
function getUserByUniqueField({ name, value }) {
    return userRepository.getUsers()
        .then(users => users.find(user => user[name] === value));
}

/**
 * Get user by a policy id
 */
function getUsersByPolicyId(id) {
    return policyService.getPolicy(id)
        .then(policy => getUserByUniqueField(new FieldQuery('id', policy.userId)));
}
