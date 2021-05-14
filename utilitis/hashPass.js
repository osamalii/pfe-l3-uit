const bcrypt = require('bcryptjs');

const hashPass = async (password) => {
    return await bcrypt.genSalt(10, (err, salt) => {
        return bcrypt.hash(password, salt, (err,hash)=>{
            if (err)
                throw err;
            return hash;
        })
    });
};

module.exports = hashPass;



