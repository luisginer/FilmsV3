const express = require('express');
const multer = require('multer');

let autenticacion = require(__dirname + '/../utils/auth.js');
let Pelicula = require(__dirname + '/../models/pelicula.js');
let Director = require(__dirname + '/../models/director.js');
let Plataforma = require (__dirname + '/../models/plataforma.js');

let router = express.Router();

//Middleware para la subida de las fotos en el servidor
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

let upload = multer({ storage: storage });

//Servicio renderizar lista de peliculas
router.get('/', autenticacion, (req, res) => {
    Pelicula.find().populate('director').then(resultado => {
        res.render('admin_peliculas', { peliculas: resultado });
    }).catch(error => {
        res.render('admin_error');
    });
});

//Servicio renderizar vista del forulario de añadir Peliculas
router.get('/nuevo', autenticacion, (req, res) => {   
    Director.find().then(director =>{
        Plataforma.find().then(plataforma =>{
            res.render('admin_peliculas_form', {directores: director, plataformas: plataforma});
        })
    })
});

//Servicio renderizar vista del formulario de editar una Pelicula
router.get('/editar/:id', autenticacion, (req, res) => {
    Director.find().then(director =>{
        Plataforma.find().then(plataforma => {
            Pelicula.findById(req.params.id).then(resultado => {
                if (resultado)
                    res.render('admin_peliculas_form', { directores: director, plataformas: plataforma, pelicula: resultado, });
                else
                    res.render('admin_error', { error: 'Pelicula no encontrada' });
            }).catch(error => {
                res.render('admin_error');
            })
        })
    })  
});

//Servicio para añadir peliculas
router.post('/', autenticacion, upload.single('imagen'), (req, res) => {
    if((req.body.genero != "comedia") && (req.body.genero != "terror") && 
        (req.body.genero != "drama") && (req.body.genero != "aventura"))
    {
        Director.find().then(director => {
            Plataforma.find().then(plataforma =>{
                res.render('admin_peliculas_form', {directores: director, plataformas: plataforma, error: 'Genero no permitido(comedia, terror, drama, aventuro, otros)'});
            });
        });
    }
    else{
        let nuevaPelicula = new Pelicula({
            titulo: req.body.titulo,
            sinopsis: req.body.sinopsis,
            duracion: req.body.duracion,
            genero: req.body.genero,
            valoracion: req.body.valoracion,
            plataforma: req.body.plataforma,
            director: req.body.director
        });
        if (typeof req.file === 'undefined')
            nuevaPelicula.imagen = "pelicula.jpg";
        else
            nuevaPelicula.imagen = req.file.filename;
        nuevaPelicula.save().then(resultado => {
            res.redirect(req.baseUrl);
        }).catch(error => {
            res.render('admin_error');
        });
    }
});

// Servicio para modificar peliculas
router.post('/:id', autenticacion, upload.single('imagen'), (req, res) => {
    if (typeof req.file !== 'undefined') {
        Pelicula.findByIdAndUpdate(req.params.id, {
            $set: {
                titulo: req.body.titulo,
                sinopsis: req.body.sinopsis,
                duracion: req.body.duracion,
                genero: req.body.genero,
                valoracion: req.body.valoracion,
                plataforma: req.body.plataforma,
                director: req.body.director,
                imagen: req.file.filename
            }
        }, { new: true }).then(resultado => {
            res.redirect(req.baseUrl);
        }).catch(error => {
            res.render('admin_error');
        });
    } else {
        Pelicula.findByIdAndUpdate(req.params.id, {
            $set: {
                titulo: req.body.titulo,
                sinopsis: req.body.sinopsis,
                duracion: req.body.duracion,
                genero: req.body.genero,
                valoracion: req.body.valoracion,
                plataforma: req.body.plataforma,
                director: req.body.director,
            }
        }, { new: true }).then(resultado => {
            res.redirect(req.baseUrl);
        }).catch(error => {
            res.render('admin_error');
        });
    }
});

// Servicio para borrar peliculas
router.delete('/:id', autenticacion, (req, res) => {
    Pelicula.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado)
            res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error');
    });
});
module.exports = router;