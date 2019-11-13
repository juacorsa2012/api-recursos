const { chai, server, should } = require("./config");
const Enlace  = require('../../models/enlace');
const Tema    = require('../../models/tema');
const titulo1 = 'Titulo 1';
const titulo2 = 'Título 2';
const tema1   = 'Tema 1';
const urlGoogle = 'https://www.google.com';
const urlAmazon = 'https://www.amazon.es';
const urlNoValida = 'http://';

const api = '/api/v1/enlaces';

describe("API Enlaces", () => {
	beforeEach((done) => { 
		Enlace.deleteMany({}, (err) => { 
			done();           
		});        
	});

	beforeEach((done) => { 
		Tema.deleteMany({}, (err) => { 
			done();           
		});        
	});


	describe("/GET", () => {		 
		it("Debe devolver todos los enlaces", (done) => {		
			const tema = new Tema({nombre: 'tema 1'});
			tema.save();

			Enlace.create({titulo: titulo1, url: urlAmazon, tema: tema.id});
			Enlace.create({titulo: titulo2, url: urlGoogle, tema: tema.id});	

			chai.request(server)
				.get(api)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");									
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

		it("Debe devolver un error 404 si no se encuentra el enlace", (done) => {						
			const id = '5dc426d35f079611244d595t';

			chai.request(server)
				.get(api + '/' + id)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.have.property("success").to.be.false;
					res.body.should.have.property("error");
					done();
				});
		});

		it("Debe devolver un enlace", (done) => {	
			const tema = new Tema({nombre: 'tema 1'});
			tema.save();					
			const enlace = new Enlace({titulo: titulo1, url: urlAmazon, tema: tema.id});
			enlace.save();

			chai.request(server)
				.get(api + '/' + enlace._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
					done();
				});
		});
	});

	describe('/POST', () => {
		it('debería insertar un enlace', (done) => {
			const tema = new Tema({nombre: 'tema 1'});
			tema.save();								
			const enlace = { titulo: titulo1, url: urlAmazon, tema: tema.id, comentario: '' };
		    
		    chai.request(server)
		    	.post(api)
		        .send(enlace)
		        .end((err, res) => {
		        	res.should.have.status(201);		            
		            res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
		            res.body.data.should.have.property('titulo').eql(titulo1);
		            res.body.data.should.have.property('url').eql(urlAmazon);
		            res.body.data.should.have.property('_id');
		            res.body.data.should.have.property('created_at');		            
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un enlace sin título ', (done) => {
			const tema = new Tema({nombre: 'tema 1'});
			tema.save();								
			const enlace = { url: urlAmazon, tema: tema.id, comentario: '' };			
		    
		    chai.request(server)
		    	.post(api)
		        .send(enlace)
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El título del enlace es un campo requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un enlace sin url ', (done) => {
			const tema = new Tema({nombre: 'tema 1'});
			tema.save();								
			const enlace = { titulo: titulo1, tema: tema.id, comentario: '' };			
		    
		    chai.request(server)
		    	.post(api)
		        .send(enlace)
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('La url del enlace es un campo requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un enlace sin tema ', (done) => {
			const enlace = { titulo: titulo1, url: urlAmazon, comentario: '' };			
		    
		    chai.request(server)
		    	.post(api)
		        .send(enlace)
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El tema del enlace es un campo requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un enlace con una url no válida ', (done) => {
			const tema = new Tema({nombre: 'tema 1'});
			tema.save();								

			const enlace = { titulo: titulo1, url: urlNoValida, tema: tema.id, comentario: '' };			
		    
		    chai.request(server)
		    	.post(api)
		        .send(enlace)
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;		            
		            done();
		        });
		});
	});

	describe('/PUT/:id', () => {
		it('debería actualizar un enlace', (done) => {
			const tema = new Tema({nombre: 'Tema 1'});
			tema.save();						
		    
		    const enlace = new Enlace({titulo: titulo1, url: urlAmazon, tema: tema.id, comentario: ''});		    
		    enlace.save();

		    chai.request(server)
		    	.put(api + '/' + enlace._id)
		        .send({titulo: titulo2})
		        .end((err, res) => {		        	
		        	res.should.have.status(200);		            
		            res.body.should.have.property('success').to.be.true;
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un enlace sin título', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						
		    
		    const enlace = new Enlace({titulo: titulo1, url: urlAmazon, tema: tema.id, comentario: ''});		    
		    enlace.save();

		    chai.request(server)
		    	.put(api + '/' + enlace._id)
		        .send({titulo: '', url: urlGoogle, tema: tema.id})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El título del enlace es un campo requerido');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un enlace sin url', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						
		    
		    const enlace = new Enlace({titulo: titulo1, url: urlAmazon, tema: tema.id, comentario: ''});		    
		    enlace.save();

		    chai.request(server)
		    	.put(api + '/' + enlace._id)
		        .send({titulo: titulo2, url: '', tema: tema.id})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('La url del enlace es un campo requerido');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un enlace sin tema', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						
		    
		    const enlace = new Enlace({titulo: titulo1, url: urlAmazon, tema: tema.id, comentario: ''});		    
		    enlace.save();

		    chai.request(server)
		    	.put(api + '/' + enlace._id)
		        .send({titulo: titulo2, url: urlGoogle, tema: ''})
		        .end((err, res) => {		        	
		        	res.should.have.status(404);		            
		            res.body.should.have.property('success').to.be.false;		            
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un enlace con una url no válida', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						
		    
		    const enlace = new Enlace({titulo: titulo1, url: urlAmazon, tema: tema.id, comentario: ''});		    
		    enlace.save();

		    chai.request(server)
		    	.put(api + '/' + enlace._id)
		        .send({titulo: titulo2, url: urlNoValida, tema: tema.id})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;		            
		            done();
		        });
		});
	});

	describe("/DELETE/:id ", () => {
		it('debería borrar un enlace', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						
		    
		    const enlace = new Enlace({titulo: titulo1, url: urlAmazon, tema: tema.id, comentario: ''});		    
		    enlace.save();

		    chai.request(server)
		    	.delete(api + '/' + enlace._id)		        
		        .end((err, res) => {		        	
		        	res.should.have.status(200);		            
		            res.body.should.have.property('success').to.be.true;		            
		            res.body.should.have.property('data');
		            done();
		        });
		});

		it('debería dar un error 400 al borrar un enlace con un id inexistente', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						
		    
		    const enlace = new Enlace({titulo: titulo1, url: urlAmazon, tema: tema.id, comentario: ''});		    
		    enlace.save();

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
