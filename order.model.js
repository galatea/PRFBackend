const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    contactname : {type: String, unique: true, required: true},
    adress: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    itemId: {type: Number, required: true},
    itemName: {type: String, required: true},
    price: {type: Number, required: true},
    orderDesc : {type: String, required: false}
}, {collection: 'orders'});



mongoose.model('order',orderSchema);