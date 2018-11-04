class User {
    constructor({ id, name, email, role }) {
        this.id = id;
        this.name = name;
        this.username = email; // username in this domain
        this.role = (role === 'admin') ? 'ADMIN' : 'USER';
    }
}

module.exports = User;
