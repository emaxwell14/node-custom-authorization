const { assert } = require('chai');
const sinon = require('sinon');
const { authorization: { isAdmin, isUser } } = require('../../src/middleware');
const { AuthorizationError } = require('../../src/error');

describe('Authorization middleware', () => {
    let next;
    beforeEach(() => {
        next = sinon.spy();
    });

    /* BASIC USER AUTH */

    it('normal_user_should_continue_as_normal_when_using_basic_user_middleware', () => {
        const res = { user: { role: 'USER' } };

        isUser(res, null, next);
        assert(next.calledWith());
    });

    it('admin_user_should_continue_as_normal_when_using_basic_user_middleware', () => {
        const res = { user: { role: 'ADMIN' } };

        isUser(res, null, next);
        assert(next.calledWith());
    });

    it('invalid_user_should_throw_error_when_using_basic_user_middleware', () => {
        const res = { user: { role: 'blabla' } };

        isUser(res, null, next);
        assert(next.calledWith(sinon.match.instanceOf(AuthorizationError)));
    });

    it('user_with_no_role_should_throw_error_when_using_basic_user_middleware', () => {
        const res = { user: {} };

        isUser(res, null, next);
        assert(next.calledWith(sinon.match.instanceOf(AuthorizationError)));
    });

    /* ADMIN USER AUTH */

    it('normal_user_should_throw_error_when_using_admin_user_middleware', () => {
        const res = { user: { role: 'USER' } };

        isAdmin(res, null, next);
        assert(next.calledWith(sinon.match.instanceOf(AuthorizationError)));
    });

    it('admin_user_should_continue_as_normal_when_using_admin_user_middleware', () => {
        const res = { user: { role: 'ADMIN' } };

        isAdmin(res, null, next);
        assert(next.calledWith());
    });

    it('invalid_user_should_throw_error_when_using_basic_user_middleware', () => {
        const res = { user: { role: 'blabla' } };

        isAdmin(res, null, next);
        assert(next.calledWith(sinon.match.instanceOf(AuthorizationError)));
    });

    it('user_with_no_role_should_throw_error_when_using_basic_user_middleware', () => {
        const res = { user: {} };

        isAdmin(res, null, next);
        assert(next.calledWith(sinon.match.instanceOf(AuthorizationError)));
    });
});
