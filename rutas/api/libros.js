const express = require("express")
const ControllerLibro = require('../../controllers/libros')
const RepositorioLibro = require('../../database/RepositorioLibro')
const controlador = new ControllerLibro(new RepositorioLibro());
const router = express.Router();

/** Consulta todos los libros */
router.get('/',async (req,res) =>{
    controlador.obtenerLibros()
    .then((libros) => res.json(libros)) 
});

/** Consulta un libro por id */
router.get('/:id',async (req,res) =>{
    console.log("Llega al router:", req.params)
    controlador.obtenerLibroPorId(req.params.id)
    .then((libros) => res.json(libros)) 
});

/** Guarda un libro */
router.post('/',async (req,res) => {
    controlador.agregarLibro(req.body)
    res.status(200)
    res.json({ message : "Add successfully."})
});

/** Actualiza un libro */
router.put('/',async (req,res) => {
    controlador.actualizarLibro(req.body)
    res.status(200)
    res.json({ message : "Update successfully."})
});

/** Elimina un libro */
router.delete('/:id',async (req,res) => {
    controlador.eliminarLibro(req.params.id)
    res.status(200)
    res.json({ message : "Deleted successfully."})
});


module.exports = router;