const mongoose = require('mongoose');

let peliculaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },

    sinopsis: {
        type: String,
        minlength: 10,
        required: true
    },

    duracion:{
        type: Number,
        required: true,
        min: 0
    },

    genero: {
        type: String,
        required: true,
        enum: ['comedia', 'terror', 'drama', 'aventura', 'otros']
    },

    valoracion: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        max:  5
    },

    plataforma: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plataforma'
    },

    director: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'director'
    },

    imagen:{
        type: String,
        required: false,
        trim: true
    }
});

let Pelicula = mongoose.model('pelicula', peliculaSchema);
module.exports = Pelicula;