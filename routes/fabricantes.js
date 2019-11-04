
const express = require('express');
const {
	obtenerFabricantes, 
	obtenerFabricante, 
	registrarFabricante, 
	actualizarFabricante} = require('../controllers/fabricantes');

const Fabricante = require('../models/fabricante');
const advancedQuery = require('../middleware/advancedQuery');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(obtenerFabricantes)
  .post(registrarFabricante);

router
  .route('/:id')
  .get(obtenerFabricante)
  .put(actualizarFabricante);

module.exports = router;
