const express = require('express');
const {
	obtenerLibros, 
	obtenerLibro, 
	registrarLibro,
  borrarLibro, 
  contarLibros,
  obtenerLibrosPorTema,
  obtenerLibrosPorPublicado,
  obtenerLibrosPorEditorial,
  obtenerLibrosPorIdioma,
  obtenerLibrosPorTemaPublicado,
  obtenerLibrosPorEditorialPublicado,
	actualizarLibro} = require('../controllers/libros');

const Libro = require('../models/libro');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, isRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.get('/stats/count', contarLibros);
router.get('/stats/tema', obtenerLibrosPorTema);
router.get('/stats/publicado', obtenerLibrosPorPublicado);
router.get('/stats/editorial', obtenerLibrosPorEditorial);
router.get('/stats/idioma', obtenerLibrosPorIdioma);
router.get('/stats/tema/publicado', obtenerLibrosPorTemaPublicado);
router.get('/stats/editorial/publicado', obtenerLibrosPorEditorialPublicado);

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
