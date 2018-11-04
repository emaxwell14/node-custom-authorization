const { AuthorizationError } = require('../error');

module.exports = {
    isAdmin,
    isUser,
};

function isAdmin({ user: { role } }, res, next) {
    if (role !== 'ADMIN') {
        next(new AuthorizationError());
    }
    next();
}

function isUser({ user: { role } }, res, next) {
    if (!['USER', 'ADMIN'].includes(role)) {
        next(new AuthorizationError());
    }
    next();
}
