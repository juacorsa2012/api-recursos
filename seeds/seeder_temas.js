const mongoose = require('mongoose');
const config = require('config');
const Tema   = require('.././models/tema');
const MONGO_URI = config.get('mongo_uri');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const n = +process.argv[2];

const seeder = async () => {  
  console.log(`Registrando ${n} temas ...`);
  await Tema.deleteMany();

  for (let i = 0; i < n; i++) {
  	await Tema.create({nombre: 'Tema ' + i})    
    let progreso = Math.ceil((i/n)*100) + '%';
    process.stdout.write('Progreso: ' + progreso + '\r');          
  }
}

seeder().then(() => {
  console.log('Proceso finalizado!!')
  process.exit()
})