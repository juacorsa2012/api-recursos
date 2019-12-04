const express = require('express');
const {
	registrarEnlace,
	actualizarEnlace,
	borrarEnlace,
	contarEnlaces,
	obtenerEnlaces,
	obtenerEnlace,
	obtenerEnlacesPorTemas
	} = require('../controllers/enlaces');

const Enlace = require('../models/enlace');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, isRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.get('/stats/count', contarEnlaces);
router.get('/stats/temas', obtenerEnlacesPorTemas);

router
  .route('/')
  .get(advancedQuery(Enlace, 'tema'), obtenerEnlaces)
  .post(registrarEnlace);

router
  .route('/:id')
  .get(obtenerEnlace)
  .delete(borrarEnlace)  
  .put(actualizarEnlace);

module.exports = router;