const path = require('path');
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const config = require('config');
const cors = require('cors');
const db = require('./config/db');
const temas = require('./routes/temas');
const idiomas = require('./routes/idiomas');
const editoriales = require('./routes/editoriales');
const fabricantes = require('./routes/fabricantes');
const enlaces = require('./routes/enlaces');
const libros = require('./routes/libros');
const tutoriales = require('./routes/tutoriales');
const auth = require('./routes/auth');

db();

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/temas', temas);
app.use('/api/v1/editoriales', editoriales);
app.use('/api/v1/idiomas', idiomas);
app.use('/api/v1/fabricantes', fabricantes);
app.use('/api/v1/enlaces', enlaces);
app.use('/api/v1/libros', libros);
app.use('/api/v1/tutoriales', tutoriales);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = config.get('port');

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`); 
});

module.exports = server;