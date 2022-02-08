const mongoose = require('mongoose');

let plataformaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },

    fecha: {
        required: false,
    },

    cantidad: {
        type: Number,
        default: false,
    }
});

let Plataforma = mongoose.model('plataforma', plataformaSchema);
module.exports = Plataforma;