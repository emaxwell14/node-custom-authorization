/**
 * Error thrown when username is not provided as a query param
 */
class InvalidParamsError extends Error {
    constructor() {
        super();
        this.status = 400;
        this.message = 'Query parameter username not provided';
    }
}

module.exports = InvalidParamsError;
