const { chai, server, should } = require("./config");
const Tutorial = require('../../models/tutorial');
const Tema = require('../../models/tema');
const Idioma = require('../../models/idioma');
const Fabricante = require('../../models/fabricante');
const titulo1 = 'Titulo 1';
const tema1   = 'Tema 1';
const idioma1 = 'Idioma 1';
const fabricante1 = "Fabricante 1";
const api = '/api/v1/tutoriales';
const duracion  = 600;
const publicado = 2019;
const observaciones = 'observaciones 1';

let temaId;
let fabricanteId;
let idiomaId;
let tutorialId;

describe("API Enlaces", () => {
	beforeEach(async function() {
	  await Tutorial.deleteMany({});
	  await Tema.deleteMany({});
	  await Fabricante.deleteMany({});
	  await Idioma.deleteMany({});

	  const tema = new Tema({nombre: tema1});
	  const fabricante = new Fabricante({nombre: fabricante1});
	  const idioma = new Idioma({nombre: idioma1});

   	  await tema.save();
	  await fabricante.save();
	  await	idioma.save();

	  temaId = tema._id;
	  idiomaId = idioma._id;
	  fabricanteId = fabricante._id;

	  const tutorial = new Tutorial({
	  	titulo: titulo1,
	  	tema: temaId,
	  	idioma: idiomaId,
	  	fabricante: fabricanteId,
	  	duracion,
	  	publicado
	  });

	  await tutorial.save();
	  tutorialId = tutorial._id;
	});

	describe("/GET", () => {		 
		it("Debe devolver todos los tutoriales", (done) => {		
			chai.request(server)
				.get(api)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");	
					res.body.should.have.property("count");	
					res.body.should.have.property("pagination");						
					done();
				});
		});
	});

	describe("/GET/:id ", () => {
		it("Debe devolver un error 404 si el id no es válido", (done) => {						
			chai.request(server)
				.get(api + '/1')
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.have.property("success").to.be.false;
					res.body.should.have.property("error");
					done();
				});
		});

		it("Debe devolver un error 404 si no se encuentra el tutorial", (done) => {						
			const id = '5dc426d35f079611244d595t';

			chai.request(server)
				.get(api + '/' + id)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.have.property("success").to.be.false;
					res.body.should.have.property("error").eql("Recurso no encontrado");
					done();
				});
		});

		it("Debe devolver un tutorial", (done) => {	
			chai.request(server)
				.get(api + '/' + tutorialId)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
					res.body.data.should.have.property('titulo');
					res.body.data.should.have.property('tema');
					res.body.data.should.have.property('fabricante');
					res.body.data.should.have.property('idioma');
					res.body.data.should.have.property('duracion');
					res.body.data.should.have.property('publicado');
					done();
				});
		})
	});

	describe('/POST', () => {
		it('debería insertar un tutorial', (done) => {
			const tutorial = { 
				titulo: titulo1, 				
				tema: temaId, 
				idioma: idiomaId,
				fabricante: fabricanteId,
				publicado,
				duracion,
				observaciones
			};		

		    chai.request(server)
		    	.post(api)
		        .send(tutorial)
		        .end((err, res) => {
		        	res.should.have.status(201);		            
		            res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
		            res.body.data.should.have.property('titulo').eql(titulo1);	
					res.body.data.should.have.property('tema');
					res.body.data.should.have.property('idioma');
					res.body.data.should.have.property('fabricante');
					res.body.data.should.have.property('observaciones').eql(observaciones);
					res.body.data.should.have.property('publicado').eql(publicado);
					res.body.data.should.have.property('duracion').eql(duracion);
		            res.body.data.should.have.property('_id');
		            res.body.data.should.have.property('created_at');		            
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un tutorial sin título', (done) => {
			const tutorial = { 				
				tema: temaId,
				idioma: idiomaId,
				fabricante: fabricanteId,
				publicado,
				duracion,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(tutorial)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El título del tutorial es un dato requerido');
		            done();
		        });

		});

		it('debería devolver un error 400 al intentar registrar un tutorial sin tema', (done) => {
			const tutorial = { 				
				titulo: titulo1,
				idioma: idiomaId,
				fabricante: fabricanteId,
				publicado,
				duracion,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(tutorial)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El tema del tutorial es un dato requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un tutorial sin idioma', (done) => {
			const tutorial = { 				
				titulo: titulo1,
				tema: temaId,
				fabricante: fabricanteId,
				publicado,
				duracion,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(tutorial)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El idioma del tutorial es un dato requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un tutorial sin fabricante', (done) => {
			const tutorial = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				publicado,
				duracion,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(tutorial)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El fabricante del tutorial es un dato requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un tutorial sin año de publicación', (done) => {
			const tutorial = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				fabricante: fabricanteId,
				duracion,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(tutorial)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El año de publicación es un dato requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un tutorial sin año de publicación', (done) => {
			const tutorial = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				fabricante: fabricanteId,
				duracion,
				publicado: 2009,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(tutorial)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El año de publicación no puede ser anterior a 2010');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un tutorial sin duracion', (done) => {
			const tutorial = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				fabricante: fabricanteId,	
				publicado,			
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(tutorial)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('La duración del tutorial es un dato requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un tutorial con una duracion inferior a 1 minuto', (done) => {
			const tutorial = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				fabricante: fabricanteId,				
				duracion: 0,
				publicado,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(tutorial)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('La duración debe ser como mínimo de un minuto');
		            done();
		        });
		});
	});

	describe("/DELETE/:id ", () => {
		it('debería borrar un tutorial', (done) => {	    
		    chai.request(server)
		    	.delete(api + '/' + tutorialId)		        
		        .end((err, res) => {		        	
		        	res.should.have.status(200);		            
		            res.body.should.have.property('success').to.be.true;		            
		            res.body.should.have.property('data');
		            done();
		        });
		});

		it('debería dar un error 404 si intentamos borrar un tutorial que no existe', (done) => {	    
		    chai.request(server)
		    	.delete(api + '/1')		        
		        .end((err, res) => {		        	
		        	res.should.have.status(404);		            
		            res.body.should.have.property('success').to.be.false;		            		            
		            done();
		        });
		});
	});
})
