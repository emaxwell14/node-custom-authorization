/**
 * Error message thrown for unauthenticated user
 */
class AuthenticationError {
    constructor() {
        this.status = 401;
        this.message = 'User not recognised';
    }
}

module.exports = AuthenticationError;
