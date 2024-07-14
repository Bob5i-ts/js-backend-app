const express = require('express');

const homeController = require('./controllers/homeCtrl');
const authController = require('./controllers/authCtrl');
const postController = require('./controllers/itemCtrl');

const router = express.Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/post', postController);
router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;