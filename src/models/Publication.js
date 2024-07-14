const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    technique: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    cert: {
        type: String,
        required: true,
    },
    shared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        required: true,
    }
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;