const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { saltRounds } = require('../appConfig');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    publications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Publication',
    }]
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, saltRounds)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;