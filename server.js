const express = require('express');
const config = require('config');
const conectarDB = require('./config/db');

const app = express();

conectarDB();	

require('./up/security')(app);

require('./up/routes')(app);

const server = require('./up/server')(app);

process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`); 
});

module.exports = server;