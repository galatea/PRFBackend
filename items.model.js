const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var itemsSchema = new mongoose.Schema({
    name : {type: String, unique: true, required: true, lowercase: true},
    piece: {type: Number, required: true},
    price: {type: Number, required: true},
}, {collection: 'items'});



mongoose.model('items',itemsSchema);