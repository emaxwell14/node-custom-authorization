/* eslint implicit-arrow-linebreak: 0 */
const { assert } = require('chai');
const mockery = require('mockery');
const { Policy } = require('../../src/model');
const { FieldQuery } = require('../../src/service');

describe('Policy Service', () => {
    let policyService;

    const MATCHING_USER_NAME = 'matchingUser@test.ie';
    const MATCHING_USER_ID = '12345';

    before(() => {
        // Mock Data
        const policyMatchingQuery = new Policy({
            email: MATCHING_USER_NAME,
            id: MATCHING_USER_ID,
        });
        const policyNotMatchingQuery = new Policy({
            email: 'blabla',
            id: 'rubbish',
        });
        const mockPolicies = [policyMatchingQuery, policyNotMatchingQuery];

        // Setup mocking
        mockery.enable({
            warnOnReplace: false,
            useCleanCache: true,
            warnOnUnregistered: false,
        });

        // Create mock for policyRepo which returns mock data
        const repoMock = {
            policyRepository: {
                getPolicies: () => Promise.resolve(mockPolicies),
            },
        };
        mockery.registerMock('../repository', repoMock);
    });

    beforeEach(() => {
        // For mockery to work, need to require the mocked module after setup
        // eslint-disable-next-line global-require
        policyService = require('../../src/service/policyService');
    });

    after(() => {
        mockery.deregisterMock('../repository');
        mockery.disable();
    });

    it('get_all_should_return_all_when_there_is_no_query', () =>
        policyService.getPolicies().then((policies) => {
            assert.equal(policies.length, 2);
        }));

    it('get_all_should_return_matching_policy_when_there_is_a_query', () => {
        const query = new FieldQuery('username', MATCHING_USER_NAME);
        return policyService.getPolicies(query).then((policies) => {
            assert.equal(policies.length, 1);
            assert.equal(policies[0].username, MATCHING_USER_NAME);
        });
    });

    it('get_one_should_return_policy_when_id_matches_a_policy', () =>
        policyService.getPolicy(MATCHING_USER_ID).then((policy) => {
            assert.equal(policy.id, MATCHING_USER_ID);
        }));

    it('get_one_should_return_null_when_the_id_doesnt_mach_a_policy', () =>
        policyService.getPolicy('not an id').then((policy) => {
            assert.isUndefined(policy);
        }));
});
