const { AuthorizationError } = require('../error');

module.exports = {
    isAdmin,
    isUser,
};

/**
 * Used to verify that a user has an ADMIN role
 */
function isAdmin({ user }, res, next) {
    if (user && user.role !== 'ADMIN') {
        next(new AuthorizationError());
    }
    next();
}

/**
 * Used to verify that a user has a USER role.
  * ADMIN also has the same priviliges as USER
 */
function isUser({ user }, res, next) {
    if (user && !['USER', 'ADMIN'].includes(user.role)) {
        next(new AuthorizationError());
    }
    next();
}
