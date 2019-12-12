const mongoose = require('mongoose');
const config   = require('config');
const Editorial = require('.././models/editorial');
const MONGO_URI = config.get('mongo_uri');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const n = +process.argv[2];

const seeder = async () => {  
  console.log(`Registrando ${n} editoriales ...`);
  await Editorial.deleteMany();

  for (let i = 0; i < n; i++) {
  	await Editorial.create({nombre: 'Editorial ' + i})
    let progreso = Math.ceil((i/n)*100) + '%';
    process.stdout.write('Progreso: ' + progreso + '\r');          
  }
}

seeder().then(() => {
  console.log('Proceso finalizado!!')
  process.exit()
})