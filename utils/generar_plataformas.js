const mongoose = require('mongoose');
const Plataforma = require(__dirname + '/../models/plataforma');

mongoose.connect(
    'mongodb://localhost:27017/FilmES_v3', {useNewUrlParser: true, useUnifiedTopology: true}
);

Plataforma.collection.drop();

let plataforma1 = new Plataforma({
    nombre: 'Amazon',
});
plataforma1.save();

let plataforma2 = new Plataforma({
    nombre: 'Disney+',
});
plataforma2.save();

let plataforma3 = new Plataforma({
    nombre: 'HBO',
});
plataforma3.save();

let plataforma4 = new Plataforma({
    nombre: 'Netflix',
});
plataforma4.save();