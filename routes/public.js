const express = require('express');

let router = express.Router();
let Pelicula = require(__dirname + '/../models/pelicula.js');
let Director = require(__dirname + '/../models/director.js');
let Plataforma = require(__dirname + '/../models/plataforma.js');

// Servicio renderizar la pagina principal
router.get('/', (req, res) => {
    Pelicula.find().then(resultado => {
        res.render('public_index');
    }).catch(error => {
        res.render('public_error');
    });
});

// Servicio renderizar vista peliculas buscadas
router.get('/buscar', (req, res) => {
    if (req.query.buscar.length > 0) {
        Pelicula.find({ titulo: new RegExp(req.query.buscar, 'i') }).then(resultado => {
            if (resultado.length > 0)
                res.render('public_index', { peliculas: resultado });
            else
                res.render('public_index', { error: "No se encontro ninguna Pelicula" });
        }).catch(error => {
            res.render('public_error');
        });
    }
    else
        res.redirect('/');
});

// Servicio renderizar una pelicula
router.get('/pelicula/:id', (req, res) => {
    Pelicula.findById(req.params.id).populate('director').populate('plataforma').then(resultado =>   {
        if (resultado)
            res.render('public_pelicula', { pelicula: resultado });
        else
            res.render('public_error', { error: 'Pelicula no encontrada' });
    }).catch(error => {
        res.render('public_error');
    });
});

module.exports = router;