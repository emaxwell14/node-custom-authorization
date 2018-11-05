const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { LoginError } = require('../error');
const { config: { getJwtSecret } } = require('../util');

module.exports = getRouter();

/**
 * Uses the local strategy to authenticate the username.
 * Once the user is returned, logging into passport and returning
 * a jwt token as the response.
 */
function doLogin(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(400).send(new LoginError());
        }

        return req.login(user, { session: false }, () => {
            const token = jwt.sign(
                {
                    id: req.user.id,
                    username: req.user.username,
                    role: req.user.role,
                },
                getJwtSecret(),
                {
                    expiresIn: '12h',
                },
            );
            return res.json({ data: token });
        });
    })(req, res);
}


function getRouter() {
    const router = express.Router();
    router.post('/', doLogin);
    return router;
}
