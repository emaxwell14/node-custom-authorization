/**
 * Error thrown when an invalid path is requested
 */
class NotFoundError extends Error {
    constructor() {
        super();
        this.status = 404;
        this.message = 'Requested resource not found';
    }
}

module.exports = NotFoundError;
