const mongoose = require('mongoose');
const config = require('config');
const faker  = require('faker');
const Tema   = require('.././models/tema');
const Idioma = require('.././models/idioma');
const Tutorial = require('.././models/tutorial');
const Fabricante = require('.././models/fabricante');
const randomYear = require('random-year');
const nTemas = 10;
const nIdiomas = 10;
const nFabricantes = 25;
const nTutoriales = 10;
const MONGO_URI = config.get('mongo_uri');
const añoMinimo = 2010;
const añoMaximo = 2020;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const seederTemas = async () => {  
  await Tema.deleteMany();

  for (let i = 0; i < nTemas; i++) {
      await Tema.create({nombre: 'Tema ' + i})
  }  
}

const seederFabricantes = async () => {  
  await Fabricante.deleteMany();

  for (let i = 0; i < nFabricantes; i++) {
      await Fabricante.create({nombre: 'Fabricante ' + i})
  }  
}

const seederIdiomas = async () => {  
  await Idioma.deleteMany();

  for (let i = 0; i < nIdiomas; i++) {
      await Idioma.create({nombre: 'Idioma ' + i})
  }  
}

const seeder = async () => {
  try {
    console.log(`Registrando ${nTutoriales} tutoriales`);    

    await seederTemas();
    await seederFabricantes();
    await seederIdiomas();
    await Tutorial.deleteMany();	
    
    for (let i = 0; i < nTutoriales; i++) {
	  let r = Math.floor(Math.random() * nTemas);
	  const tema = await Tema.find().select('_id').limit(1).skip(r);		    

      r = Math.floor(Math.random() * nIdiomas);
      const idioma = await Idioma.find().select('_id').limit(1).skip(r);        

      r = Math.floor(Math.random() * nFabricantes);
      const fabricante = await Fabricante.find().select('_id').limit(1).skip(r);            	

      const tutorial = {
    	titulo: faker.lorem.sentence(),
    	tema: tema[0]._id,
        idioma: idioma[0]._id,
        fabricante: fabricante[0]._id,
    	observaciones: faker.lorem.text(),
        duracion: faker.random.number(),
        publicado: randomYear({ min: añoMinimo, max: añoMaximo })
      }     

      await Tutorial.create(tutorial)    	
      let progreso = Math.ceil((i/nTutoriales)*100) + '%';
      process.stdout.write('Progreso: ' + progreso + '\r');  
	}    
  } catch(err) {
    console.error(err)
  }
}

seeder().then(() => {
  console.log('Proceso finalizado!!');
  process.exit();
})