const { assert } = require('chai');
const {
    AuthenticationError, AuthorizationError, InvalidParamsError, LoginError, NotFoundError,
} = require('../../src/error');

describe('Error types', () => {
    it('authentication_error_should_have_unauthorized_status', () => {
        assert.equal(new AuthenticationError().status, 401);
    });

    it('authorization_error_should_have_forbidden_status', () => {
        assert.equal(new AuthorizationError().status, 403);
    });

    it('invalid_params_error_should_have_bad_request_status', () => {
        assert.equal(new InvalidParamsError().status, 400);
    });

    it('login_error_should_have_bad_request_status', () => {
        assert.equal(new LoginError().status, 400);
    });

    it('not_found_error_should_have_not_found_status', () => {
        assert.equal(new NotFoundError().status, 404);
    });
});
