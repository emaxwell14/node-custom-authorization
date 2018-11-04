const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { userService, FieldQuery } = require('../service');

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'username'
    },
    ((username, password, cb) => {
        console.log('$$$$$$$ in strategy: ', username)
        userService.getUserByUniqueField(new FieldQuery('username', username))
            .then((user) => {
                console.log('$$$$$$$ in strategy RETURNqqq: ', user)
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }
                return cb(null, user, { message: 'Logged In Successfully' });
            })
            .catch(err => cb(err))
    }
    ),
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret',
    },
    ((jwtPayload, cb) => userService.getUserByUniqueField(new FieldQuery('id', jwtPayload.id))
        .then(user => cb(null, user))
        .catch(err => cb(err))
    ),
));
