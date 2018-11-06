/* eslint implicit-arrow-linebreak: 0 */
const { assert } = require('chai');
const mockery = require('mockery');
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const { FieldQuery } = require('../../src/service');

describe('Policy Route', () => {
    let policyRoutes;
    let res;
    let next;
    const req = { query: {} };

    before(() => {
        // Setup require mocking
        mockery.enable({
            warnOnReplace: false,
            useCleanCache: true,
            warnOnUnregistered: false,
        });

        // Create mock for policyService
        const serviceMock = {
            policyService: {
                getPolicies: () => Promise.resolve(),
            },
            FieldQuery,
        };
        mockery.registerMock('../service', serviceMock);
    });

    beforeEach(() => {
        res = httpMocks.createResponse();
        next = sinon.spy();

        // For mockery to work, need to require the mocked module after setup
        // eslint-disable-next-line global-require
        policyRoutes = require('../../src/route/policyRoutes');
    });

    after(() => {
        mockery.deregisterMock('../service');
        mockery.disable();
    });

    it('get_all_should_return_error_response_when_there_is_no_username', () => {
        policyRoutes.getPolicies(req, res, next);
        assert(next.calledOnce);
    });

    it('get_all_should_return_correct_response_when_there_is_a_username', () => {
        req.query.username = 'testusername';

        policyRoutes.getPolicies(req, res, next);
        assert(next.notCalled);
        assert.equal(200, res.statusCode);
    });
});
