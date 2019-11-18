
const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema(
{
	titulo: {
    type: String,
    required: [true, 'El título del tutorial es un dato requerido'],      
    trim: true
  },

  observaciones: String, 

  tema: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tema',
    required: [true, 'El tema del tutorial es un dato requerido']
  },

  fabricante: {
    type: mongoose.Schema.ObjectId,
    ref: 'Fabricante',
    required: [true, 'El fabricante del tutorial es un dato requerido']
  },

  idioma: {
    type: mongoose.Schema.ObjectId,
    ref: 'Idioma',
    required: [true, 'El idioma del tutorial es un dato requerido']
  },

  duracion: {
    type: Number,
    required: [true, 'La duración del tutorial es un dato requerido'],
    min: [1, 'La duración debe ser como mínimo de un minuto']
  },

  publicado: {
    type: Number,
    required: [true, 'El año de publicación es un dato requerido'],
    min: [2010, 'El año de publicación no puede ser anterior a 2010']
  },

  created_at: {
    type: Date,
    default: Date.now(),
    select: false
  }
},
{
  collection: 'tutoriales',
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;
