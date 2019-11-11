const express = require('express');
const {
	registrarEnlace,
	actualizarEnlace,
	borrarEnlace,
	contarEnlaces,
	contarEnlacesPorTema,
	obtenerEnlaces,
	obtenerEnlace
	} = require('../controllers/enlaces');

const Enlace = require('../models/enlace');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, isRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.get('/count', contarEnlaces);
router.get('/count/:id', contarEnlacesPorTema);

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