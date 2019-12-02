const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema(
{
	titulo: {
    type: String,
    required: [true, 'El título del libro es un dato requerido'],      
    trim: true
  },

  observaciones: String, 

  tema: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tema',
    required: [true, 'El tema del libro es un dato requerido']
  },

  editorial: {
    type: mongoose.Schema.ObjectId,
    ref: 'Editorial',
    required: [true, 'La editorial del libro es un dato requerido']
  },

  idioma: {
    type: mongoose.Schema.ObjectId,
    ref: 'Idioma',
    required: [true, 'El idioma del libro es un dato requerido']
  },

  paginas: {
    type: Number,
    required: [true, 'El número de páginas es un dato requerido'],
    min: [1, 'El número de páginas debe ser como mínimo de uno']
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
  collection: 'libros',
});

libroSchema.statics.obtenerLibrosPorTema = function() {
  return this.aggregate([
  {
    $lookup: {
        from: "temas",
        localField: "tema",
        foreignField: "_id",
        as: "tema"
    }},  
    { $unwind: "$tema" },     
    { $group : { _id : "$tema.nombre", total : { $sum : 1 } } },
    { $sort : { total : -1 } }
  ])
}

libroSchema.statics.obtenerLibrosPorPublicado = function() {
  return this.aggregate([  
    { $group : { _id :  "$publicado", total : { $sum : 1 } } },  
    { $sort : { total : -1 } }    
  ])
}

libroSchema.statics.obtenerLibrosPorEditorial = function() {
  return this.aggregate([
  {
    $lookup: {
        from: "editoriales",
        localField: "editorial",
        foreignField: "_id",
        as: "editorial"
    }},  
    { $unwind: "$editorial" },     
    { $group : { _id : "$editorial.nombre", total : { $sum : 1 } } },
    { $sort : { total : -1 } }
  ])
}

libroSchema.statics.obtenerLibrosPorIdioma = function() {
  return this.aggregate([
  {
    $lookup: {
        from: "idiomas",
        localField: "idioma",
        foreignField: "_id",
        as: "idioma"
    }},  
    { $unwind: "$idioma" },     
    { $group : { _id : "$idioma.nombre", total : { $sum : 1 } } },
    { $sort : { total : -1 } }
  ])
}

libroSchema.statics.obtenerLibrosPorTemaPublicado = function() {
  return this.aggregate([
  {
    $lookup: {
        from: "temas",
        localField: "tema",
        foreignField: "_id",
        as: "tema"
    }},  
    { $unwind: "$tema" },     
    { $group : { _id : { tema: "$tema.nombre", publicado: "$publicado" }, total : { $sum : 1 } } },  
    { $sort : { total : -1 } }
  ])
}

libroSchema.statics.obtenerLibrosPorEditorialPublicado = function() {
  return this.aggregate([
  {
    $lookup: {
        from: "editoriales",
        localField: "editorial",
        foreignField: "_id",
        as: "editorial"
    }},  
    { $unwind: "$editorial" },     
    { $group : { _id : {editorial: "$editorial.nombre", publicado: "$publicado" }, total : { $sum : 1 } } },  
    { $sort : { total : -1 } }
  ])
}




const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;

