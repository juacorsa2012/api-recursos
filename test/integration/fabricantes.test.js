const mongoose = require('mongoose');
const { chai, server, should } = require("./config");

const Fabricantes  = require('../../models/fabricante');
const fabricante1 = 'Fabricante 1';
const fabricante2 = 'Fabricante 2';
const api   = '/api/v1/fabricantes';
