const { userRepository } = require('../repository');
const policyService = require('./policyService');
const FieldQuery = require('./FieldQuery');

module.exports = {
    getUserByUniqueField,
    getUsersByPolicyId,
};

function getUserByUniqueField({ name, value }) {
    return userRepository.getUsers()
        .then(users => users.find(user => user[name] === value));
}

function getUsersByPolicyId(id) {
    return policyService.getPolicy(id)
        .then(policy => getUserByUniqueField(new FieldQuery('id', policy.userId)));
}
