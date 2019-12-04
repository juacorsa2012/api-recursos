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
      trim: true,
      match: [/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 'La url no es válida']
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

enlaceSchema.statics.obtenerEnlacesPorTema = function() {
  return this.aggregate([
    {
      $lookup: {
          from: "temas",
          localField: "tema",
          foreignField: "_id",
          as: "tema"
      }},  

    { "$unwind" : "$tema" },
    
    {"$group": {"_id" : null, "count" : { "$sum" :1 }, "data" : { "$push":"$$ROOT"}}},    
   
    {"$unwind" : "$data" },    
    
    {"$group" : {"_id": "$data.tema.nombre", "count" : {"$sum":1}, "total":{"$first":"$count"}}},

    { $sort : { count : -1 } },
    
    {"$project" : { "count" : 1, "peso": {"$multiply":[{"$divide":[100,"$total"]},"$count"]}}}    
  ])
}

const Enlace = mongoose.model('Enlace', enlaceSchema);

module.exports = Enlace;