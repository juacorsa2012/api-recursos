
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

tutorialSchema.statics.obtenerDuracionTutoriales = function() {
  return this.aggregate([
    { $group   : { "_id" : null, duracion : { $sum : "$duracion" } } },
    { $project : { _id: 0, duracion: 1 } } 
  ])
}

tutorialSchema.statics.obtenerTutorialesPorTema = function() {
  return this.aggregate([
    { $lookup  : { from: "temas", localField: "tema", foreignField: "_id", as: "tema" } },  
    { $unwind  : "$tema" },    
    { $group   : { "_id" : "$tema", "duracion" : { "$sum" : "$duracion" }, "count" : { "$sum" : 1 }}},
    { $sort    : { count : -1 } },   
    { $project : { _id : 0, tema : "$_id.nombre", duracion : 1, count : 1 } }
  ])
}

tutorialSchema.statics.obtenerTutorialesPorPublicado = function() {
  return this.aggregate([
    { $group   : { "_id" : "$publicado", "duracion" : { "$sum" : "$duracion" }, "count" : { "$sum" : 1 }}},
    { $sort    : { count : -1 } },    
    { $project : { _id : 0, publicado : "$_id", duracion : 1, count : 1 } }
  ])
}

tutorialSchema.statics.obtenerTutorialesPorIdioma = function() {
  return this.aggregate([
    { $lookup  : { from: "idiomas", localField: "idioma", foreignField: "_id", as: "idioma" } },  
    { $unwind  : "$idioma" },    
    { $group   : { "_id" : "$idioma", "duracion" : { "$sum" : "$duracion" }, "count" : { "$sum" : 1 }}},
    { $sort    : { count : -1 } },   
    { $project : { _id : 0, idioma : "$_id.nombre", duracion : 1, count : 1 } }
  ])
}

tutorialSchema.statics.obtenerTutorialesPorFabricante = function() {
  return this.aggregate([
    { $lookup  : { from: "fabricantes", localField: "fabricante", foreignField: "_id", as: "fabricante" } },  
    { $unwind  : "$fabricante" },    
    { $group   : { "_id" : "$fabricante", "duracion" : { "$sum" : "$duracion" }, "count" : { "$sum" : 1 }}},
    { $sort    : { count : -1 } },   
    { $project : { _id : 0, fabricante : "$_id.nombre", duracion : 1, count : 1 } }
  ])
}






const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;