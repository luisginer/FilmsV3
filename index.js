const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const auth = require(__dirname + '/routes/auth');
const peliculas = require(__dirname + '/routes/peliculas');
const public = require(__dirname + '/routes/public');
const directores = require(__dirname + '/routes/directores');

mongoose.connect(
    'mongodb://149.202.43.66:27017/FilmES_v3', {useNewUrlParser: true, useUnifiedTopology: true}
);

let app = express();

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');

app.use(express.json());
app.use(express.urlencoded());

// Middleware para procesar otras peticiones que no sean GET o POST
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));

// Configuración de la sesión en la aplicación
/*
    Es importante poner este middleware ANTES de cargar los enrutadores con app.use,
    para que éstos tengan esta configuración aplicada
*/
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

// Este middleware se emplea para poder acceder a la sesión desde las vistas
// como una variable "session". Es útil para poder mostrar unos contenidos u
// otros en función de los atributos guardados en la sesión. La utilizaremos
// para mostrar el botón de Login o el de Logout en la vista "base.njk"
// según si el usuario está validado o no.
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/', public);
app.use('/admin', peliculas);
app.use('/directores', directores);
app.use('/auth', auth);

app.listen(8080);