const express = require('express');
const config = require('config');
const db = require('./config/db');

const app = express();

db();

require('./routes')(app);

const PORT = config.get('port');

const server = app.listen(
  PORT,
  console.log(`Servidor iniciado en modo ${process.env.NODE_ENV} en el puerto ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`); 
});

module.exports = server;