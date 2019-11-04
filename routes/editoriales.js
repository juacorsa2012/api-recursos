const express = require('express');
const {
	obtenerEditoriales, 
	obtenerEditorial, 
	registrarEditorial, 
	actualizarEditorial} = require('../controllers/editoriales');

const Editorial = require('../models/editorial');
const advancedQuery = require('../middleware/advancedQuery');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(obtenerEditoriales)
  .post(registrarEditorial);

router
  .route('/:id')
  .get(obtenerEditorial)
  .put(actualizarEditorial);

module.exports = router;
