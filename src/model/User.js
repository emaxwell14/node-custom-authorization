class User {
    constructor({ id, name, email, role }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = (role === 'admin') ? 'ADMIN' : 'USER';
    }
}

module.exports = User;
