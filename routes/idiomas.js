
const express = require('express');
const {
	obtenerIdiomas, 
	obtenerIdioma, 
	registrarIdioma, 
	actualizarIdioma} = require('../controllers/idiomas');

const Idioma = require('../models/idioma');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, isRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(obtenerIdiomas)
  .post(registrarIdioma);

router
  .route('/:id')
  .get(obtenerIdioma)
  .put(actualizarIdioma);

module.exports = router;
