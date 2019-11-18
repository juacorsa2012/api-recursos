const { chai, server, should } = require("./config");
const Libro = require('../../models/libro');
const Tema  = require('../../models/tema');
const Idioma    = require('../../models/idioma');
const Editorial = require('../../models/editorial');
const titulo1 = 'Titulo 1';
const titulo2 = 'Título 2';
const tema1   = 'Tema 1';
const idioma1 = 'Idioma 1';
const editorial1 = 'Editorial 1000';
const api = '/api/v1/libros';
const paginas = 600;
const publicado = 2019;
const observaciones = 'observaciones 1';

describe("API Enlaces", () => {
	beforeEach(async function() {
	  await Libro.deleteMany({});
	  await Tema.deleteMany({});
	  await Editorial.deleteMany({});
	  await Idioma.deleteMany({});
	});

	describe("/GET", () => {		 
		it("Debe devolver todos los libros", (done) => {		
			const tema = new Tema({nombre: tema1});
			const editorial = new Editorial({nombre: editorial1});
			const idioma = new Idioma({nombre: idioma1});

			tema.save();
			editorial.save();
			idioma.save();

			Libro.create({titulo: titulo1, tema: tema.id, editorial: editorial.id, idioma: idioma.id, publicado: 2019, paginas: 560, observaciones: ''});

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

		it("Debe devolver un error 404 si no se encuentra el libro", (done) => {						
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

		it("Debe devolver un libro", (done) => {	
			const tema = new Tema({nombre: tema1});
			const editorial = new Editorial({nombre: editorial1});
			const idioma = new Idioma({nombre: idioma1});

			tema.save();
			editorial.save();
			idioma.save();

			const libro = new Libro({
				titulo: titulo1, 
				editorial: editorial.id,
				idioma: idioma.id,				
				tema: tema.id,
				publicado,
				paginas,
				observaciones
			});				

			libro.save();

			chai.request(server)
				.get(api + '/' + libro._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
					done();
				});
		});
	});

	describe('/POST', () => {
		let temaId;
		let idiomaId;
		let editorialId;

		beforeEach(async function() {
		  await Libro.deleteMany({});
		  await Tema.deleteMany({});
		  await Editorial.deleteMany({});
		  await Idioma.deleteMany({});

          const tema = new Tema({nombre: tema1});
		  const editorial = new Editorial({nombre: editorial1});
		  const idioma = new Idioma({nombre: idioma1});

		  temaId = await tema.save();
		  editorialId = await editorial.save();
		  idiomaId = await idioma.save();
		});

		it('debería insertar un libro', (done) => {
			const libro = { 
				titulo: titulo1, 				
				tema: temaId, 
				idioma: idiomaId,
				editorial: editorialId,
				publicado,
				paginas,
				observaciones
			};		
		    
		    chai.request(server)
		    	.post(api)
		        .send(libro)
		        .end((err, res) => {
		        	res.should.have.status(201);		            
		            res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
		            res.body.data.should.have.property('titulo').eql(titulo1);	
					res.body.data.should.have.property('tema');
					res.body.data.should.have.property('idioma');
					res.body.data.should.have.property('editorial');
					res.body.data.should.have.property('observaciones').eql(observaciones);
					res.body.data.should.have.property('publicado').eql(publicado);
					res.body.data.should.have.property('paginas').eql(paginas);
		            res.body.data.should.have.property('_id');
		            res.body.data.should.have.property('created_at');		            
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un libro sin título', (done) => {
			const libro = { 				
				tema: temaId,
				idioma: idiomaId,
				editorial: editorialId,
				publicado,
				paginas,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(libro)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El título del libro es un dato requerido');
		            done();
		        });

		});

		it('debería devolver un error 400 al intentar registrar un libro sin tema', (done) => {
			const libro = { 				
				titulo: titulo1,
				idioma: idiomaId,
				editorial: editorialId,
				publicado,
				paginas,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(libro)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El tema del libro es un dato requerido');
		            done();
		        });

		});

		it('debería devolver un error 400 al intentar registrar un libro sin idioma', (done) => {
			const libro = { 				
				titulo: titulo1,
				tema: temaId,
				editorial: editorialId,
				publicado,
				paginas,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(libro)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El idioma del libro es un dato requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un libro sin editorial', (done) => {
			const libro = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				publicado,
				paginas,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(libro)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('La editorial del libro es un dato requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un libro sin año de publicación', (done) => {
			const libro = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				editorial: editorialId,
				paginas,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(libro)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El año de publicación es un dato requerido');
		            done();
		        });

		});

		it('debería devolver un error 400 al intentar registrar un libro si el año de publicación es anterior a 2010', (done) => {
			const libro = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				editorial: editorialId,
				publicado: 2009,
				paginas,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(libro)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El año de publicación no puede ser anterior a 2010');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un libro sin páginas', (done) => {
			const libro = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				editorial: editorialId,
				publicado,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(libro)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El número de páginas es un dato requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al intentar registrar un libro con páginas inferior a 1', (done) => {
			const libro = { 				
				titulo: titulo1,
				tema: temaId,
				idioma: idiomaId,
				editorial: editorialId,
				publicado,
				paginas: 0,
				observaciones
			};

		    chai.request(server)
		    	.post(api)
		        .send(libro)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property("success").to.be.false;
		            res.body.should.have.property("error").eql('El número de páginas debe ser como mínimo de uno');
		            done();
		        });
		});
	});

	describe("/DELETE/:id ", () => {
		let libroId;

		beforeEach(async function() {
		  await Libro.deleteMany({});
		  await Tema.deleteMany({});
		  await Editorial.deleteMany({});
		  await Idioma.deleteMany({});

          const tema = new Tema({nombre: tema1});
		  const editorial = new Editorial({nombre: editorial1});
		  const idioma = new Idioma({nombre: idioma1});

		  const temaId = await tema.save();
		  const editorialId = await editorial.save();
		  const idiomaId = await idioma.save();

		  let libro = new Libro({
		  	titulo: titulo1,
		  	tema: temaId,
		  	editorial: editorialId,
		  	idioma: idiomaId,
		  	publicado,
		  	paginas,
		  	observaciones
		  });

		  libro = await libro.save();		  
		  libroId = libro._id;
		});

		it('debería borrar un libro', (done) => {	    
		    chai.request(server)
		    	.delete(api + '/' + libroId)		        
		        .end((err, res) => {		        	
		        	res.should.have.status(200);		            
		            res.body.should.have.property('success').to.be.true;		            
		            res.body.should.have.property('data');
		            done();
		        });
		});

		it('debería dar un error 404 si intentamos borrar un libro que no existe', (done) => {	    
		    chai.request(server)
		    	.delete(api + '/1')		        
		        .end((err, res) => {		        	
		        	res.should.have.status(404);		            
		            res.body.should.have.property('success').to.be.false;		            		            
		            done();
		        });
		});

	});
});
