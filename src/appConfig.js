const hbs = require('express-handlebars');
const { connect } = require('mongoose');

const port = 3000;
const dbString = 'mongodb://localhost:27017/artGallery';
exports.saltRounds = 10;
exports.secret = 'alsdkjfaposdlfgijhsdaklgjfhaskdl';
exports.sessionName = 'session';

exports.initHbs = (app) => {
    app.engine('hbs', hbs.engine({ extname: 'hbs' }));

    app.set('view engine', 'hbs');
    app.set('views', './src/views');
}

exports.initDB = (app) => connect(dbString)
    .then(() => {
        app.listen(port, () => console.log(`App running on port ${port}`));
    })
    .catch(err => console.log('Cant connect to DB', err));