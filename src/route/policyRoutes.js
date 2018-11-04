const express = require('express');
const { policyService, FieldQuery } = require('../service');
const { authorization: { isAdmin } } = require('../middleware');

module.exports = {
    getRouter,
};

/**
 * Get all policies with a query paramete. Currenly username is the only
 * query paramter supported
 */
function getPolicies({ query: { username } }, res) {
    return policyService.getPolicies(new FieldQuery('username', username))
        .then(policies => res.send({ policies }));
}

function getRouter() {
    const router = express.Router();
    router.get('/policies/', isAdmin, getPolicies);
    return router;
}
