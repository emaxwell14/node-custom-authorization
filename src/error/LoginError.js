/**
 * Error thrown when a username is not recognised on login
 */
class LoginError extends Error {
    constructor() {
        super();
        this.status = 400;
        this.message = 'An error occurred when logging in';
    }
}

module.exports = LoginError;
