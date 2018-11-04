class LoginError {
    constructor() {
        this.status = 400;
        this.message = 'An error occurred when logging in';
    }
}

module.exports = LoginError;
