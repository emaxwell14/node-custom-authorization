const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { userService, FieldQuery } = require('../service');
const { config: { getJwtSecret } } = require('../util');

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'username', // Only require username
    },
    ((username, password, next) => {
        userService.getUserByUniqueField(new FieldQuery('username', username))
            .then((user) => {
                if (!user) {
                    return next(null, false);
                }
                return next(null, user);
            })
            .catch(err => next(err));
    }
    ),
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: getJwtSecret(),
    },
    ((jwtPayload, next) => userService.getUserByUniqueField(new FieldQuery('id', jwtPayload.id))
        .then(user => next(null, user))
        .catch(err => next(err))
    ),
));
