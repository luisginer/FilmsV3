const mongoose = require('mongoose');
const Director = require(__dirname + '/../models/director');

mongoose.connect(
    'mongodb://localhost:27017/FilmES_v3', {useNewUrlParser: true, useUnifiedTopology: true}
);

Director.collection.drop();

let director1 = new Director({
    nombre: 'Stephen King',
    anyo: 1965
});
director1.save();

let director2 = new Director({
    nombre: 'Ridly Scoot',
    anyo: 1996
});
director2.save();

let director3 = new Director({
    nombre: 'Taika Wati',
    anyo: 2019
});
director3.save();

let director4 = new Director({
    nombre: 'Joss Whedon',
    anyo: 2010
});
director4.save();