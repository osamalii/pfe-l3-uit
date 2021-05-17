const bcrypt = require('bcryptjs');

module.exports = (password) => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};



