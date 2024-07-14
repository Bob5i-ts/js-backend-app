const jwt = require('jsonwebtoken');

const { sessionName, secret } = require('../appConfig');

exports.auth = async (req, res, next) => {
    const token = req.cookies[sessionName];

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.clearCookie(sessionName);
                return res.redirect('/auth/login');
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next()
        });
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
};

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }

    next();
};