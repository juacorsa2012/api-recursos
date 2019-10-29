
const express = require('express');
const {
	obtenerTemas, 
	obtenerTema, 
	registrarTema, 
	actualizarTema} = require('../controllers/temas');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(obtenerTemas)
  .post(registrarTema);

router
  .route('/:id')
  .get(obtenerTema)
  .put(actualizarTema);

module.exports = router;
