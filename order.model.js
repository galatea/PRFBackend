const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    username: {type: String, required: true},
    productId : {type: String, required: true},
    productPrice: {type: Number, required: true},
    productName: {type: String, required: true},
    fullname: {type: String, required: true},
    phonenumber: {type: String, required: true},
    address: {type: String, required: true},
    description : {type: String, required: false}
}, {collection: 'orders'});



mongoose.model('order',orderSchema);