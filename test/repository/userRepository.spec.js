/* eslint implicit-arrow-linebreak: 0 */
const { assert } = require('chai');
const mockery = require('mockery');

describe('User Repository', () => {
    let userRepository;

    // Mock data
    const USER_ID = '64cceef9-3a01-49ae-a23b-3761b604800b';
    const USER_NAME = 'Luke Skywalker';
    const USER_EMAIL = 'luke@starwars.com';
    const USER_STRING = `{
        "id": "${USER_ID}",
        "name":"${USER_NAME}",
        "email":"${USER_EMAIL}",
        "role":"admin"
    }
    `;

    before(() => {
        mockery.enable({
        //    warnOnReplace: false,
            useCleanCache: true,
            warnOnUnregistered: false,
        });


        const MOCK_RESPONSE = `
            {
               "clients":[
                 ${USER_STRING}
               ]
            }`;

        const requestMock = () => Promise.resolve(MOCK_RESPONSE);
        mockery.registerMock('request-promise', requestMock);
    });

    beforeEach(() => {
        // For mockery to work, need to require the mocked module after setup
        // eslint-disable-next-line global-require
        userRepository = require('../../src/repository/userRepository');
    });

    after(() => {
        mockery.deregisterMock('request-promise');
        mockery.disable();
    });

    it('get_all_should_parse_response_correctly', () =>
        userRepository.getUsers().then((users) => {
            assert.equal(USER_ID, users[0].id);
            assert.equal(USER_NAME, users[0].name);
            assert.equal(USER_EMAIL, users[0].username);
            assert.equal('ADMIN', users[0].role);
        }));
});
