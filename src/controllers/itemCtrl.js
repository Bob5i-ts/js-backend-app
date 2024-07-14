const router = require('express').Router();

const itemService = require('../services/itemSvc');
const { isAuth } = require('../middlewares/authMid');
const User = require('../models/User');

router.get('/details/:id', async (req, res) => {
    const item = await itemService.getOne(req.params.id).lean();
    const user = req.user;
    const isOwner = item.author == user?._id;
    const isShared = item.shared.toString().includes(user?._id);
    console.log(user, item);
    res.render('publication/details', { item, user, isOwner, isShared });
});

router.get('/:id/share', isAuth, async (req, res) => {
    const item = await itemService.getOne(req.params.id);
    item.shared.push(req.user._id);
    await item.save();
    res.redirect(`/post/details/${item._id}`);
});

router.get('/create', isAuth, (req, res) => {
    res.render('publication/create');
});

router.post('/create', isAuth, async (req, res) => {
    const item = req.body;
    const username = req.user.username;
    const user = await User.findOne({ username });;
    item.username = user.username;
    item.author = user._id;

    try {
        const newPost = await itemService.create(item); console.log(user);
        user.publications.push(newPost._id);
        await user.save();
        res.redirect('/gallery');
    } catch (err) {
        console.log(err);
        res.render('publication/create', {err, ...item});
    }
});

router.get('/:id/edit', isAuth, async (req, res) => {
    const item = await itemService.getOne(req.params.id).lean()

    if (!item || item.author != req.user._id) {
        return res.render('404');
    }

    res.render('publication/edit', item);
});

router.post('/:id/edit', isAuth, async (req, res) => {
    try {
	    const item = await itemService.edit(req.params.id, req.body);
        if (!item || item.author != req.user._id) {
            return res.render('404');
        }
	    res.redirect(`/post/details/${item._id}`);
    } catch (err) {
        res.render('publication/edit', {err})
    }
});

router.get('/:id/delete', isAuth, async (req, res) => {
    await itemService.delete(req.params.id);

    res.redirect('/');
});


module.exports = router;