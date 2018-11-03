'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(_ref) {
    var id = _ref.id,
        name = _ref.name,
        email = _ref.email,
        role = _ref.role;

    _classCallCheck(this, User);

    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role === 'admin' ? 'ADMIN' : 'USER';
};

module.exports = User;