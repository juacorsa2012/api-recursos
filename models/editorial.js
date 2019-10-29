
const mongoose = require('mongoose');

const editorialSchema = new mongoose.Schema(
{
	nombre: {
      type: String,
      required: [true, 'El nombre es un campo requerido'],
      unique: true,
      trim: true,
      maxlength: [60, 'El nombre debe tener como máximo 60 caracteres'],
      minlength: [3, 'El nombre debe tener al menos 3 caracteres']      
    },
  created_at: {
      type: Date,
      default: Date.now(),
      select: false
    }
},
{
  collection: 'editoriales'
});

const Editorial = mongoose.model('Editorial', editorialSchema);

module.exports = Editorial;