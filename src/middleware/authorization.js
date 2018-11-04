const { AuthorizationError } = require('../error');

module.exports = {
    isAdmin,
    isUser,
};

/**
 * Used to verify that a user has an ADMIN role
 */
function isAdmin({ user: { role } }, res, next) {
    if (role !== 'ADMIN') {
        next(new AuthorizationError());
    }
    next();
}

/**
 * Used to verify that a user has a USER role.
  * ADMIN also has the same priviliges as USER
 */
function isUser({ user: { role } }, res, next) {
    if (!['USER', 'ADMIN'].includes(role)) {
        next(new AuthorizationError());
    }
    next();
}
