const fs = require('fs');
const mongoose = require('mongoose');

const Tema = require('.././models/tema');
const Editorial = require('.././models/editorial');
const Idioma = require('.././models/idioma');
const Fabricante = require('.././models/fabricante');

const MONGO_URI = 'mongodb://localhost:27017/recursos';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const temas = JSON.parse(fs.readFileSync('./temas.json', 'utf-8'));
const idiomas = JSON.parse(fs.readFileSync('idiomas.json', 'utf-8'));
const editoriales = JSON.parse(fs.readFileSync('editoriales.json', 'utf-8'));
const fabricantes = JSON.parse(fs.readFileSync('fabricantes.json', 'utf-8'));


const importarDatos = async () => {
  try {
    await Tema.create(temas);
    //await Course.create(courses);
    //await User.create(users);
    //await Review.create(reviews);
    console.log('Datos importados...');    
  } catch (err) {
    console.error(err);
  }
};

const borrarDatos = async () => {
  try {
    await Tema.deleteMany();
    //await Course.deleteMany();
    //await User.deleteMany();
    //await Review.deleteMany();
    console.log('Datos borrados...');    
  } catch (err) {
    console.error(err);
  }
};





