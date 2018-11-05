const { assert } = require('chai');
const { User } = require('../../src/model');

describe('User model', () => {
    it('normal_user_should_be_assigned_user_role', () => {
        const normalUser = new User({ role: 'user' });
        assert.equal(normalUser.role, 'USER');
    });

    it('admin_user_should_be_assigned_admin_role', () => {
        const adminUser = new User({ role: 'admin' });
        assert.equal(adminUser.role, 'ADMIN');
    });

    it('invalid_user_type_should_be_assigned_user_role', () => {
        const invalidUser = new User({ role: 'blabla' });
        assert.equal(invalidUser.role, 'USER');
    });

    it('values_should_be_set_correctly', () => {
        const ID = 'testID12345';
        const EMAIL = 'test@email.com';
        const NAME = 'Eoghan';

        const user = new User({
            role: 'admin',
            id: ID,
            email: EMAIL,
            name: NAME,
        });
        assert.equal(user.role, 'ADMIN');
        assert.equal(user.id, ID);
        assert.equal(user.username, EMAIL);
        assert.equal(user.name, NAME);
    });
});
