const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');

const Tema = require('.././models/tema');
const Editorial = require('.././models/editorial');
const Idioma = require('.././models/idioma');
const Fabricante = require('.././models/fabricante');

dotenv.config({ path: '../config/.env' });


const MONGO_URI = process.env.MONGO_URI_LOCAL;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const temas = JSON.parse(fs.readFileSync('temas.json', 'utf-8'));
const idiomas = JSON.parse(fs.readFileSync('idiomas.json', 'utf-8'));
const editoriales = JSON.parse(fs.readFileSync('editoriales.json', 'utf-8'));
const fabricantes = JSON.parse(fs.readFileSync('fabricantes.json', 'utf-8'));

const seeder = async () => {
  try {
    console.log(`Importando datos en ${MONGO_URI}...`);
    await Tema.deleteMany();
    await Editorial.deleteMany();
    await Fabricante.deleteMany();
    await Idioma.deleteMany();
    await Tema.create(temas);
    await Editorial.create(editoriales);
    await Fabricante.create(fabricantes);
    await Idioma.create(idiomas);
    console.log('Datos importados!!')
  } catch(err) {
    console.error(err)
  }
}

seeder().then(res => {
  process.exit()
})

