
const mongoose = require('mongoose');

const temaSchema = new mongoose.Schema(
{
	nombre: {
      type: String,
      required: [true, 'El nombre es un campo requerido'],
      unique: true,
      trim: true,
      maxlength: [60, 'El tema debe tener como máximo 60 caracteres'],
      minlength: [3, 'El tema debe tener al menos 3 caracteres']      
    },
  created_at: {
      type: Date,
      default: Date.now(),
      select: false
    }
},
{
  collection: 'temas',
});

const Tema = mongoose.model('Tema', temaSchema);

module.exports = Tema;