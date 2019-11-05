
const express = require('express');
const {
	obtenerTemas, 
	obtenerTema, 
	registrarTema, 
	actualizarTema} = require('../controllers/temas');

const Tema = require('../models/tema');
const advancedQuery = require('../middleware/advancedQuery');
const { protect, isRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(advancedQuery(Tema, ''), obtenerTemas)
  .post(protect, isRole('admin'), registrarTema);

router
  .route('/:id')
  .get(obtenerTema)
  .put(protect, isRole('admin'), actualizarTema);

module.exports = router;
