const mongoose = require('mongoose');
const config = require('config');
const faker  = require('faker');
const Tema   = require('.././models/tema');
const Idioma = require('.././models/idioma');
const Editorial = require('.././models/editorial');
const Libro = require('.././models/libro');
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

const nLibros = +process.argv[2];

const seeder = async () => {
  try {
    console.log(`Registrando ${nLibros} libros ...`);    

    await Libro.deleteMany();	
    const nTemas = await Tema.countDocuments();
    const nIdiomas = await Idioma.countDocuments();
    const nEditoriales = await Editorial.countDocuments();
    
    for (let i = 0; i < nLibros; i++) {
		  let r = Math.floor(Math.random() * nTemas);
		  const tema = await Tema.find().select('_id').limit(1).skip(r);		    

      r = Math.floor(Math.random() * nIdiomas);
      const idioma = await Idioma.find().select('_id').limit(1).skip(r);        

      r = Math.floor(Math.random() * nEditoriales);
      const editorial = await Editorial.find().select('_id').limit(1).skip(r);            	

      const libro = {
    		titulo   : faker.lorem.sentence(),
    		tema     : tema[0]._id,
        idioma   : idioma[0]._id,
        editorial: editorial[0]._id,
    		observaciones: faker.lorem.text(),
        paginas   : faker.random.number(),
        publicado : randomYear({ min: añoMinimo, max: añoMaximo })
    	}     

    	await Libro.create(libro)    	
    	let progreso = Math.ceil((i/nLibros)*100) + '%';
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