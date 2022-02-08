const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
const SHA256 = require('crypto-js/sha256');

mongoose.connect(
    'mongodb://149.202.43.66:27017:27017/FilmES_v3', {useNewUrlParser: true, useUnifiedTopology: true}
);

Usuario.collection.drop();

let usu1 = new Usuario({
    login: 'admin',
    password: SHA256('12345678')
});
usu1.save();
    
let usu2 = new Usuario({
    login: 'usuario',
    password: SHA256('87654321')
});
usu2.save();