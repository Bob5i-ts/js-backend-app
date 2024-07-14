const router = require('express').Router();
const User = require('../models/User');
const itemService = require('../services/itemSvc');
const { isAuth } = require('../middlewares/authMid');

router.get('/', async (req, res) => {
    const posts = await itemService.getAll().lean();
    res.render('home', { posts });
});

router.get('/gallery', async (req, res) => {
    const posts = await itemService.getAll().lean();
    res.render('gallery', { posts });
});

router.get('/profile', isAuth, async (req, res) => {
    const username = req.user.username;
    const user = await User.findOne({ username });
    res.render('profile', user);
});

module.exports = router