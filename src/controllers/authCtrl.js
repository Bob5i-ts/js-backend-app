const router = require('express').Router();

const authService = require('../services/authSvc');
const { isAuth, isGuest } = require('../middlewares/authMid');
const { sessionName } = require('../appConfig');

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/register', isGuest, async (req, res) => {
    try {
        const user = await authService.register(req.body);
        const token = await authService.genToken(user)
        res.cookie(sessionName, token, { httpOnly: true })

        res.redirect('/');
    } catch (err) {
        res.status(406).render('auth/register', { err });
    }
});

router.post('/login', isGuest, async (req, res) => {
    try {
        const user = await authService.login(req.body);
        const token = await authService.genToken(user)
        if (!token) {
            return res.redirect('/404');
        }
        res.cookie(sessionName, token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(400).render('auth/login', { form: req.body, err })
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
});

module.exports = router;