const mongoose = require('mongoose');

const enlaceSchema = new mongoose.Schema(
{
	titulo: {
      type: String,
      required: [true, 'El título del enlace es un campo requerido'],      
      trim: true
    },
  url: {
      type: String,
      required: [true, 'La url del enlace es un campo requerido'],      
      trim: true
    },
  comentario: String, 
  tema: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tema',
    required: [true, 'El tema del enlace es un campo requerido']
  },
  created_at: {
      type: Date,
      default: Date.now(),
      select: false
    }
},
{
  collection: 'enlaces',
});

const Enlace = mongoose.model('Enlace', enlaceSchema);

module.exports = Enlace;