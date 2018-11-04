const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = getRouter();

function doLogin(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        // TODO generic
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user,
            });
        }

        req.login(user, { session: false }, (e) => {
            if (e) {
                res.send(err);
            }
            const token = jwt.sign(
                {
                    id: req.user.id,
                    username: req.user.username,
                    role: req.user.role,
                }, 'your_jwt_secret'
            );
            console.log('####################### token: ', token);
            return res.json({ token });
        });
    })(req, res);
}


function getRouter() {
    // app.post(
    //     '/auth',
    //     passport.authenticate(
    //         'local',
    //         {
    //             session: false
    //         }
    //     ),
    //     serialize,
    //     generateToken,
    //     respond
    // );


    const router = express.Router();
    router.post('/', doLogin);
    return router;
}
