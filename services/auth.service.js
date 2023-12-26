const bcrypt = require('bcrypt');

exports.hashPassword = async (plainPassword) => {
    const rounds = parseInt(process.env.SALT_ROUNDS, 10);
    return bcrypt.hash(plainPassword, rounds);
};

exports.verifyPassword = async (candidate, hash) => {
    return bcrypt.compare(candidate, hash);
};
