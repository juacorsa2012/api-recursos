const express = require('express');
const cors = require('cors');
const temas = require('./routes/temas');
const idiomas = require('./routes/idiomas');
const editoriales = require('./routes/editoriales');
const fabricantes = require('./routes/fabricantes');
const enlaces = require('./routes/enlaces');
const libros = require('./routes/libros');
const tutoriales = require('./routes/tutoriales');
const auth = require('./routes/auth');
const errorHandler = require('./middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.use('/api/v1/temas', temas);
  app.use('/api/v1/editoriales', editoriales);
  app.use('/api/v1/idiomas', idiomas);
  app.use('/api/v1/fabricantes', fabricantes);
  app.use('/api/v1/enlaces', enlaces);
  app.use('/api/v1/libros', libros);
  app.use('/api/v1/tutoriales', tutoriales);
  app.use('/api/v1/auth', auth);
  app.use(errorHandler);
}