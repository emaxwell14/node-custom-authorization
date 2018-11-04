const express = require('express');
const { policyService, FieldQuery } = require('../service');

module.exports = {
    getRouter,
};


function getPolicies({ query: { username } }, res) {
    return policyService.getPolicies(new FieldQuery('username', username))
        .then(policies => res.send({ policies }));
}

function getRouter() {
    const router = express.Router();
    router.get('/policies/', getPolicies);
    return router;
}
