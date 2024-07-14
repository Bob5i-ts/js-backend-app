const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { secret } = require('../appConfig');

exports.register = (data) => {
    let { username, password, rePass, address } = data;
    if (username.length < 4) throw 'Username must be at least 4 characters'
    if (password.length < 3) throw 'Password must be at least 3 characters'
    if (password != rePass) throw 'Passwords don`t match'
    if (address.length < 5 || address.length > 20) throw 'Address must be between 5 and 20 characters'
    return User.create(data);
};

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    let isValid;

    if (user) {
	    isValid = await bcrypt.compare(password, user.password);
    }
    if (!user || !isValid) {
        throw  'Invalid username or password';
    }
    return user
};

exports.genToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { _id: user._id, username: user.username },
            secret,
            { expiresIn: '2d' },
            (err, token) => {
                if (err) {
                    return reject(err);
                }
                resolve(token);
            }
        );
    });
}