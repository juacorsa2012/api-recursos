const express = require('express');
const {
	obtenerTutoriales, 
	obtenerTutorial, 
	registrarTutorial,
  borrarTutorial,   
	actualizarTutorial} = require('../controllers/tutoriales');

const Tutorial = require('../models/tutorial');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, isRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

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
