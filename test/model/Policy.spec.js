const { assert } = require('chai');
const { Policy } = require('../../src/model');

describe('Policy model', () => {
    it('policy_date_string_should_be_parsed_correctl', () => {
        const DATE_STRING = '1995-12-17T03:24:00';
        const DATE = Date.parse(DATE_STRING);

        const policyWithDate = new Policy({ inceptionDate: DATE_STRING });
        assert.equal(policyWithDate.inceptionDate, DATE);
    });

    it('values_should_be_set_correctly', () => {
        const ID = 'testID12345';
        const AMOUNT = 12345;
        const EMAIL = 'Eoghan@email.com';
        const DATE_STRING = '1995-12-17T03:24:00';
        const DATE = Date.parse(DATE_STRING);
        const INSTALLMENT = 4567;
        const USER_ID = 'userID123';

        const user = new Policy({
            id: ID,
            amountInsured: AMOUNT,
            email: EMAIL,
            inceptionDate: DATE_STRING,
            installmentPayment: INSTALLMENT,
            clientId: USER_ID,
        });
        assert.equal(user.id, ID);
        assert.equal(user.amountInsured, AMOUNT);
        assert.equal(user.username, EMAIL);
        assert.equal(user.inceptionDate, DATE);
        assert.equal(user.userId, USER_ID);
    });
});
