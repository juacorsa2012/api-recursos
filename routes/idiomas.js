
const express = require('express');
const {
	obtenerIdiomas, 
	obtenerIdioma, 
	registrarIdioma, 
	actualizarIdioma} = require('../controllers/idiomas');

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
