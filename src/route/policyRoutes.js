const express = require('express');
const { policyService, FieldQuery } = require('../service');
const { InvalidParamsError } = require('../error');
const { authorization: { isAdmin } } = require('../middleware');

module.exports = {
    getRouter,
    // For unit tests
    getPolicies,
};

/**
 * Get all policies for a given username.
 */
function getPolicies({ query: { username } }, res, next) {
    if (!username) {
        return next(new InvalidParamsError());
    }
    return policyService.getPolicies(new FieldQuery('username', username))
        .then(policies => res.send({ data: policies }));
}

function getRouter() {
    const router = express.Router();
    router.get('/policies/', isAdmin, getPolicies);
    return router;
}
