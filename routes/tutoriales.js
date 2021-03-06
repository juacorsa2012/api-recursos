const express = require('express');
const {
	obtenerTutoriales, 
	obtenerTutorial, 
	registrarTutorial,
  borrarTutorial,   
  obtenerTutorialesPorPublicado,
  obtenerTutorialesPorTema,
  obtenerTutorialesPorIdioma,
  obtenerTutorialesPorFabricante,
  obtenerTutorialesPorTemaFabricante,
  obtenerTutorialesPorTemaIdioma,
  obtenerTutorialesPorTemaPublicado,
	actualizarTutorial} = require('../controllers/tutoriales');

const Tutorial = require('../models/tutorial');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, isRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.get('/stats/tema', obtenerTutorialesPorTema);
router.get('/stats/publicado', obtenerTutorialesPorPublicado);
router.get('/stats/idioma', obtenerTutorialesPorIdioma);
router.get('/stats/fabricante', obtenerTutorialesPorFabricante);
router.get('/stats/tema/publicado', obtenerTutorialesPorTemaPublicado);
router.get('/stats/tema/fabricante', obtenerTutorialesPorTemaFabricante);
router.get('/stats/tema/idioma', obtenerTutorialesPorTemaIdioma);

router
  .route('/')
  .get(advancedQuery(Tutorial, 'tema idioma fabricante'), obtenerTutoriales)
  .post(registrarTutorial);

router
  .route('/:id')
  .get(obtenerTutorial)
  .delete(borrarTutorial)
  .put(actualizarTutorial);

module.exports = router;
