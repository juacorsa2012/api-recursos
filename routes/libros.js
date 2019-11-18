const express = require('express');
const {
	obtenerLibros, 
	obtenerLibro, 
	registrarLibro,
  borrarLibro, 
  contarLibros,
	actualizarLibro} = require('../controllers/libros');

const Libro = require('../models/libro');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, isRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.get('/count', contarLibros);

router
  .route('/')
  .get(advancedQuery(Libro, 'tema idioma editorial'), obtenerLibros)
  .post(registrarLibro);

router
  .route('/:id')
  .get(obtenerLibro)
  .delete(borrarLibro)
  .put(actualizarLibro);

module.exports = router;
