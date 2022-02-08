const mongoose = require('mongoose');

let directorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 5
    },

    anyo: {
        type: Number,
        required: false
    }
});

let Director = mongoose.model('director', directorSchema);
module.exports = Director;