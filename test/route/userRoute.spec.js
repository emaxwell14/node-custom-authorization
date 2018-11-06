/* eslint implicit-arrow-linebreak: 0 */
const { assert } = require('chai');
const mockery = require('mockery');
const httpMocks = require('node-mocks-http');
const { FieldQuery } = require('../../src/service');

describe('User Route', () => {
    let userRoutes;
    let res;
    const req = { params: {} };

    before(() => {
        // Setup require mocking
        mockery.enable({
            warnOnReplace: false,
            useCleanCache: true,
            warnOnUnregistered: false,
        });

        // Create mock for userService
        const serviceMock = {
            userService: {
                getUserByUniqueField: () => Promise.resolve(),
                getUsersByPolicyId: () => Promise.resolve(),
            },
            FieldQuery,
        };
        mockery.registerMock('../service', serviceMock);
    });

    beforeEach(() => {
        res = httpMocks.createResponse();

        // For mockery to work, need to require the mocked module after setup
        // eslint-disable-next-line global-require
        userRoutes = require('../../src/route/userRoutes');
    });

    after(() => {
        mockery.deregisterMock('../service');
        mockery.disable();
    });

    it('get_by_id_should_return_success_response_when_service_returns_data', () => {
        req.params.id = 'idString';
        userRoutes.getUser(req, res);
        assert.equal(200, res.statusCode);
    });

    it('get_by_username_should_return_success_response_when_service_returns_data', () => {
        req.params.username = 'usernameString';
        userRoutes.getUsersByUsername(req, res);
        assert.equal(200, res.statusCode);
    });

    it('get_by_username_should_return_success_response_when_service_returns_data', () => {
        req.params.id = 'idString';
        userRoutes.getUsersByPolicyId(req, res);
        assert.equal(200, res.statusCode);
    });
});
