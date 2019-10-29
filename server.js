const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const db = require('./config/db');

dotenv.config({ path: './config/.env' });

const temas = require('./routes/temas');
const idiomas = require('./routes/idiomas');
const editoriales = require('./routes/editoriales');
const fabricantes = require('./routes/fabricantes');

db();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/temas', temas);
app.use('/api/v1/editoriales', editoriales);
app.use('/api/v1/idiomas', idiomas);
app.use('/api/v1/fabricantes', fabricantes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`); 
});
