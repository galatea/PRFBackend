const mongoose = require('mongoose')

const aruSchema = new mongoose.Schema({
    nev: {type: String, unique: true, required: true}, // unique - legyen egyedi 
        // required - ha nincs megadva, ne engedje a beszúrást
    ar: {type: Number, required: true},
    darab: {type: Number, required: true}
},{collection: 'aruk'})

module.exports = aruSchema

