const mongoose = require('mongoose');
const config = require('config');
const faker  = require('faker');
const Tema   = require('.././models/tema');
const Enlace = require('.././models/enlace');
const MONGO_URI = config.get('mongo_uri');
const nTemas = 20;
const nEnlaces = 1000;

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

const seeder = async () => {
  try {    
    console.log(`Registrando ${nEnlaces} enlaces ...`);    

    await seederTemas();
    await Enlace.deleteMany();	
    
    for (let i = 0; i < nEnlaces; i++) {
		  const r = Math.floor(Math.random() * nTemas);
		  const tema = await Tema.find().select('_id').limit(1).skip(r);		    

    	const enlace = {
    		titulo: faker.lorem.sentence(),
    		tema: tema[0]._id,
    		url: faker.internet.url()
    	}

    	await Enlace.create(enlace)    	
    	let progreso = Math.ceil((i/nEnlaces)*100) + '%';
    	process.stdout.write('Progreso: ' + progreso + '\r');  
	  }
  } catch(err) {
    console.error(err)
  }
}

seeder().then(() => {
  console.log('Proceso finalizado!!')
  process.exit()
})