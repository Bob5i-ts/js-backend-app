const Publication = require('../models/Publication');

function validateEntry(data) {
    let {title, technique, picture, cert} = data
    if (title.length < 6) throw 'Title must be at least 6 characters'
    if (3 > technique.length || technique.length > 15) throw 'Painting technique must be between 3 and 15 characters'
    if (!/^https?:\/\//i.test(picture)) throw 'Image url must be link'
    if (cert != 'Yes' && cert != 'No') throw 'Certificate text must be `Yes` or `No`'
}

exports.getAll = () => Publication.find();

exports.getOne = (itemId) => Publication.findById(itemId);

exports.create = (itemData) => {
    validateEntry(itemData);
    return Publication.create(itemData);
}

exports.edit = (itemId, itemData) => {
    validateEntry(itemData);
    return Publication.findByIdAndUpdate(itemId, itemData);
}

exports.delete = (itemId) => Publication.findByIdAndDelete(itemId);
