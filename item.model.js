const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    name : {type: String, unique: true, required: true, lowercase: true},
    piece: {type: Number, required: true},
    price: {type: Number, required: true},
    description : {type: String, required: true},
    picture: {type: String, required:true}
}, {collection: 'items'});



mongoose.model('item',itemSchema);