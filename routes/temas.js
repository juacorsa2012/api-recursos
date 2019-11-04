
const express = require('express');
const {
	obtenerTemas, 
	obtenerTema, 
	registrarTema, 
	actualizarTema} = require('../controllers/temas');

const Tema = require('../models/tema');
const advancedQuery = require('../middleware/advancedQuery');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(advancedQuery(Tema, ''), obtenerTemas)
  .post(registrarTema);

router
  .route('/:id')
  .get(obtenerTema)
  .put(actualizarTema);

module.exports = router;
