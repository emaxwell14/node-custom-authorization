/* eslint implicit-arrow-linebreak: 0 */
const { assert } = require('chai');
const mockery = require('mockery');

describe('Policy Repository', () => {
    let policyRepository;

    // Mock data
    const POLICY_ID_1 = '64cceef9-3a01-49ae-a23b-3761b604800b';
    const POLICY_STRING_1 = `{
        "id": "${POLICY_ID_1}",
        "amountInsured":1825.89,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2016-06-01T03:33:32Z",
        "installmentPayment":true,
        "clientId":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
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
               "policies":[
                 ${POLICY_STRING_1}
               ]
            }`;

        const requestMock = () => Promise.resolve(MOCK_RESPONSE);
        mockery.registerMock('request-promise', requestMock);
    });

    beforeEach(() => {
        // For mockery to work, need to require the mocked module after setup
        // eslint-disable-next-line global-require
        policyRepository = require('../../src/repository/policyRepository');
    });

    after(() => {
        mockery.deregisterMock('../repository');
        mockery.disable();
    });

    it('get_all_should_parse_response_correctly', () =>
        policyRepository.getPolicies().then((policies) => {
            assert.equal(POLICY_ID_1, policies[0].id);
        }));
});
