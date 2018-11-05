/* eslint implicit-arrow-linebreak: 0 */
const { assert } = require('chai');
const mockery = require('mockery');
const { Policy, User } = require('../../src/model');
const { FieldQuery } = require('../../src/service');

describe('User Service', () => {
    const MATCHING_USER_NAME = 'matchingUser@test.ie';
    const MATCHING_USER_ID = '12345';
    const MATCHING_POLICY_ID = 'abced';

    let userService;

    before(() => {
        // Mock Data
        const userMatchingQuery = new User({
            email: MATCHING_USER_NAME,
            id: MATCHING_USER_ID,
        });
        const userNotMatchingQuery = new Policy({
            email: 'blabla',
            id: 'rubbish',
        });
        const mockUsers = [userMatchingQuery, userNotMatchingQuery];

        const policyMatchingQuery = new Policy({
            id: MATCHING_POLICY_ID,
            clientId: MATCHING_USER_ID,
        });

        // Setup mocking
        mockery.enable({
            warnOnReplace: false,
            useCleanCache: true,
            warnOnUnregistered: false,
        });

        // Create mock for policyRepo which returns mock data
        const repoMock = {
            userRepository: {
                getUsers: () => Promise.resolve(mockUsers),
            },
        };

        const policyServiceMock = {
            getPolicy: () => Promise.resolve(policyMatchingQuery),
        };

        mockery.registerMock('../repository', repoMock);
        mockery.registerMock('./policyService', policyServiceMock);
    });

    beforeEach(() => {
        // For mockery to work, need to require the mocked module after setup
        // eslint-disable-next-line global-require
        userService = require('../../src/service/userService');
    });

    after(() => {
        mockery.deregisterMock('../repository');
        mockery.disable();
    });

    it('get_one_should_return_correct_user_when_queried_by_id', () => {
        const query = new FieldQuery('id', MATCHING_USER_ID);
        return userService.getUserByUniqueField(query).then((user) => {
            assert.equal(user.id, MATCHING_USER_ID);
        });
    });

    it('get_one_should_return_correct_user_when_queried_by_username', () => {
        const query = new FieldQuery('username', MATCHING_USER_NAME);
        return userService.getUserByUniqueField(query).then((user) => {
            assert.equal(user.username, MATCHING_USER_NAME);
        });
    });

    it('get_one_should_return_no_user_when_queried_incorrectly', () => {
        const query = new FieldQuery('username', 'doesnt exist');
        return userService.getUserByUniqueField(query).then((user) => {
            assert.isUndefined(user);
        });
    });

    it('get_by_policy_id_should_return_user_when_policy_matches', () =>
        userService.getUsersByPolicyId(MATCHING_POLICY_ID).then((user) => {
            assert.equal(user.username, MATCHING_USER_NAME);
        }));
});
