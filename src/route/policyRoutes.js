const express = require('express');
const { policyService: { getPoliciesWithFilter }, userService: { getUsersWithFilter } } = require('../service');

module.exports = {
    getRouter,
};

/**
 * Handling policy in one endpoint and using query params.
 * Allowing exactly one query param, either user name or policy id.
 * Not allowing no params as do not want clients querying entire list.
 * Not allowing both query params as spec requests two separate enpoints.
 */
function getPolicies({ query: { id, username } }, res) {
    if (id === null && username === null) {
        throw new Error('Must query by policy id or user name');
    } else if (id && username) {
        throw new Error('Can only query by one field');
    }

    if (id) {
        getPoliciesWithFilter({ queryField: 'id', queryValue: id }).then(users => res.send({ users }));
    } else {
        getUsersWithFilter({ queryField: 'name', queryValue: username })
            .then((users) => {
                if (users.length) {
                    return getPoliciesWithFilter({ queryField: 'clientId', queryValue: users[0].id });
                }
                return [];
            })
            .then(policies => res.send({ policies }));
    }
}

function getRouter() {
    const router = express.Router();
    router.get('/policy/', getPolicies);
    return router;
}
