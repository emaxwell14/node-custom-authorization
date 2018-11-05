/**
 * Error message thrown for unauthenticated user
 */
class AuthenticationError extends Error {
    constructor() {
        super();
        this.status = 401;
        this.message = 'User not recognised';
    }
}

module.exports = AuthenticationError;
