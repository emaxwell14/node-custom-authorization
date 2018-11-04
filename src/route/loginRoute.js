const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { LoginError } = require('../error');
const { config: { getJwtSecret } } = require('../util');

module.exports = getRouter();

function doLogin(req, res, next) {
    return passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            next(new LoginError());
        }

        req.login(user, { session: false }, () => {
            const token = jwt.sign(
                {
                    id: req.user.id,
                    username: req.user.username,
                    role: req.user.role,
                }, getJwtSecret(),
            );
            return res.json({ token });
        });
    })(req, res);
}


function getRouter() {
    const router = express.Router();
    router.post('/', doLogin);
    return router;
}
