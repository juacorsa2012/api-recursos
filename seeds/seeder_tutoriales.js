const mongoose = require('mongoose');
const config = require('config');
const faker  = require('faker');
const Tema   = require('.././models/tema');
const Idioma = require('.././models/idioma');
const Tutorial = require('.././models/tutorial');
const Fabricante = require('.././models/fabricante');
const randomYear = require('random-year');
const MONGO_URI = config.get('mongo_uri');
const añoMinimo = 2010;
const añoMaximo = 2020;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const nTutoriales = +process.argv[2];

const seeder = async () => {
  try {
    console.log(`Registrando ${nTutoriales} tutoriales...`);    
    await Tutorial.deleteMany();	
    const nTemas = await Tema.countDocuments();
    const nIdiomas = await Idioma.countDocuments();
    const nFabricantes = await Fabricante.countDocuments();
    
    for (let i = 0; i < nTutoriales; i++) {
	    let r = Math.floor(Math.random() * nTemas);
	    const tema = await Tema.find().select('_id').limit(1).skip(r);		    

      r = Math.floor(Math.random() * nIdiomas);
      const idioma = await Idioma.find().select('_id').limit(1).skip(r);        

      r = Math.floor(Math.random() * nFabricantes);
      const fabricante = await Fabricante.find().select('_id').limit(1).skip(r);            	

      const tutorial = {
    	  titulo : faker.lorem.sentence(),
    	  tema   : tema[0]._id,
        idioma : idioma[0]._id,
        fabricante   : fabricante[0]._id,
    	  observaciones: faker.lorem.text(),
        duracion  : faker.random.number(),
        publicado : randomYear({ min: añoMinimo, max: añoMaximo })
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