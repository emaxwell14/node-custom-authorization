class AuthorizationError {
    constructor() {
        this.status = 401;
        this.message = 'User does not have access to this resource.';
    }
}

module.exports = AuthorizationError;
