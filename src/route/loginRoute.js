const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
/* POST login. */
module.exports = router.post('/login', bodyParser.urlencoded({ extended: false }), (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('####################### in login route, error: ', info);
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({ user, token });
        });
    })(req, res);
});
