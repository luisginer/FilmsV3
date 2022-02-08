const express = require('express');

let autenticacion = require(__dirname + '/../utils/auth.js');
let Director = require(__dirname + '/../models/director.js');
//let Plataforma = require (__dirname + '/../models/plataforma.js');
//let Pelicula = require(__dirname + '/../models/pelicula.js');

let router = express.Router();

//Servicio renderizar lista de directores
router.get('/', autenticacion, (req, res) => {
    Director.find().then(resultado => {
        res.render('admin_directores', { directores: resultado });
    }).catch(error => {
        res.render('admin_error');
    });
});

//Servicio renderizar vista del forulario de añadir Directores
router.get('/nuevo', autenticacion, (req, res) => {   
    res.render('admin_directores_form');
});

//Servicio para añadir un nuevo Director
router.post('/', autenticacion, (req, res) => {
    let nuevoDirector = new Director({
        nombre: req.body.nombre,
        anyo: req.body.anyo
    })
    nuevoDirector.save().then(resultado => {
        if(resultado)
            res.redirect(req.baseUrl);
        else
            res.render('admin_error', {error: 'Fallo Insertando Director'});
    }).catch(error => {
        res.render('admin_error');
    });
});

//Servicio renderizar vista del formulario de editar un Director
router.get('/editar/:id', autenticacion, (req, res) => {
    Director.findById(req.params.id).then(resultado =>{
        if(resultado)
            res.render('admin_directores_form', {director: resultado});
        else
            res.render('admin_error', {error: 'Director no encontrado'});
    }).catch(error =>{
        res.render('admin_error');
    })
});

//Servicio para modificar directores
router.put('/:id', autenticacion, (req,res) =>{
    Director.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            anyo: req.body.anyo
        }
    }, {new: true}).then(resultado => {
        console.log(req.body.nombre);
        res.redirect(req.baseUrl);
    }).catch(error =>{
        res.render('admin_error');
    });
});

// Servicio para borrar Directores
router.delete('/:id', autenticacion, (req, res) => {
    Director.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error');
    });
});

module.exports = router;