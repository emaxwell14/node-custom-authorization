/**
 * Error message thrown when user without correct role tries to access a resource
 */
class AuthorizationError {
    constructor() {
        this.status = 403;
        this.message = 'User does not have access to this resource';
    }
}

module.exports = AuthorizationError;
