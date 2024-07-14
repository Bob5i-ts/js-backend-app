const express = require('express');
const { static, urlencoded } = require('express');
const cookieParser = require('cookie-parser');

const { initHbs, initDB } = require('./appConfig');
const { auth } = require('./middlewares/authMid');
const routes = require('./routes');

const app = express();

initHbs(app);

app.use('/static', static('public'));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

initDB(app);