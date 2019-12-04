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
      }
    },  
    {"$unwind" : "$tema" },    
    {"$group": {"_id" : null, "count" : { "$sum" :1 }, "data" : { "$push":"$$ROOT"}}},       
    {"$unwind" : "$data" },        
    {"$group" : {"_id": "$data.tema.nombre", "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort : { count : -1 } },    
    {"$project" : { "count" : 1, "peso": {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}    
  ])
}

libroSchema.statics.obtenerLibrosPorPublicado = function() {
  return this.aggregate([
    {
      $lookup: {
          from: "temas",
          localField: "tema",
          foreignField: "_id",
          as: "tema"
      }
    },  
    { "$unwind" : "$tema" },    
    {"$group": {"_id" : null, "count" : { "$sum" :1 }, "data" : { "$push":"$$ROOT"}}},       
    {"$unwind" : "$data" },        
    {"$group" : {"_id": "$data.publicado", "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort : { count : -1 } },    
    {"$project" : { "count" : 1, "peso": {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}    
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
      }
    },  
    {"$unwind" : "$editorial" },    
    {"$group": {"_id" : null, "count" : { "$sum" :1 }, "data" : { "$push":"$$ROOT"}}},       
    {"$unwind" : "$data" },        
    {"$group" : {"_id": "$data.editorial.nombre", "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort : { count : -1 } },    
    {"$project" : { "count" : 1, "peso": {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}    
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
    { $unwind  : "$idioma" },    
    { $group   : {"_id" : null, "count" : { "$sum" :1 }, "data" : { "$push":"$$ROOT"}}},       
    { $unwind  : "$data" },        
    { $group   : {"_id": "$data.idioma.nombre", "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort    : { count : -1 } },    
    { $project : { "count" : 1, "peso": {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}    
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
    { $unwind  : "$tema" },    
    { $group   : {"_id" : null, "count" : { "$sum" :1 }, "data" : { "$push":"$$ROOT"}}},       
    { $unwind  : "$data"},        
    { $group   : {"_id": { tema : "$data.tema.nombre", publicado : "$data.publicado" }, "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort    : { count : -1 } },    
    { $project : { "count" : 1, "peso": {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}      
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
    { $unwind  : "$editorial" },    
    { $group   : {"_id" : null, "count" : { "$sum" :1 }, "data" : { "$push":"$$ROOT"}}},       
    { $unwind  : "$data"},        
    { $group   : {"_id": { editorial : "$data.editorial.nombre", publicado : "$data.publicado" }, "count" : {"$sum":1}, "total":{"$first":"$count"}}},
    { $sort    : { count : -1 } },    
    { $project : { "count" : 1, "peso": {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}      
  ])
}

const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;