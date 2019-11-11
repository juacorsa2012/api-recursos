const { chai, server, should } = require("./config");
const Idioma  = require('../../models/idioma');
const idioma1 = 'Idioma 1';
const idioma2 = 'Idioma 2';
const api   = '/api/v1/idiomas';

describe("API Idiomas", () => {
	beforeEach((done) => { 
		Idioma.deleteMany({}, (err) => { 
			done();           
		});        
	});

	describe("/GET", () => {		 
		it("Debe devolver los idiomas", (done) => {			
			Idioma.create({nombre: idioma1});
			Idioma.create({nombre: idioma2});

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

		it("Debe devolver un error 404 si no se encuentra el recurso", (done) => {						
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

		it("Debe devolver un idioma", (done) => {						
			const idioma = new Idioma({nombre: idioma1});
			idioma.save();

			chai.request(server)
				.get(api + '/' + idioma._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
					done();
				});
		});
	});

	describe('/POST', () => {
		it('debería insertar un idioma', (done) => {	
			const nombre = idioma1;

			chai.request(server)
		    	.post(api)
		        .send({nombre})
		        .end((err, res) => {
		        	res.should.have.status(201);		            
		            res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
		            res.body.data.should.have.property('nombre').eql(idioma1);
		            res.body.data.should.have.property('_id');
		            res.body.data.should.have.property('created_at');		            
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un idioma sin nombre ', (done) => {			
			const nombre = '';

			chai.request(server)
		    	.post(api)
		        .send({nombre})
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre es un campo requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un idioma con un nombre con menos de 3 caracteres ', (done) => {
			const nombre = 'aa';
		    
		    chai.request(server)
		    	.post(api)
		        .send({nombre})
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre debe tener al menos 3 caracteres');
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un idioma con un nombre con más de 60 caracteres ', (done) => {
			const nombre = new Array(62).join('a');			   			

		    chai.request(server)
		    	.post(api)
		        .send({nombre})
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre debe tener como máximo 60 caracteres');
		            done();
		        });
		});

		it('debería dar error 400 al intentar registrar un idioma duplicado', (done) => {
			Idioma.create({nombre: idioma1});		
		    
		    chai.request(server)
		    	.post(api)
		        .send({nombre: idioma1})
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('Valor duplicado introducido');
		            done();
		        });
		});
	});

	describe('/PUT/:id', () => {
		it('debería actualizar un idioma', (done) => {
			const idioma = new Idioma({nombre: idioma1});
			idioma.save();						

		    chai.request(server)
		    	.put(api + '/' + idioma._id)
		        .send({nombre: idioma2})
		        .end((err, res) => {		        	
		        	res.should.have.status(200);		            
		            res.body.should.have.property('success').to.be.true;
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un idioma sin nombre', (done) => {
			const idioma = new Idioma({nombre: idioma1});
			idioma.save();						

		    chai.request(server)
		    	.put(api + '/' + idioma._id)
		        .send({nombre: ''})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre es un campo requerido');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un idioma con un nombre inferior a 3 caracteres', (done) => {
			const idioma = new Idioma({nombre: idioma1});
			idioma.save();						

		    const nombre = 'aa';
		    chai.request(server)
		    	.put(api + '/' + idioma._id)
		        .send({nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre debe tener al menos 3 caracteres');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un idioma con un nombre superior a 60 caracteres', (done) => {
			const idioma = new Idioma({nombre: idioma1});
			idioma.save();						

		    const nombre = new Array(62).join('a');	
		    chai.request(server)
		    	.put(api + '/' + idioma._id)
		        .send({nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre debe tener como máximo 60 caracteres');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un idioma con nombre existente', (done) => {
			const idioma_1 = new Idioma({nombre: idioma1});
			idioma_1.save();				

			const idioma_2 = new Idioma({nombre: idioma2});
			idioma_2.save();

		    chai.request(server)
		    	.put(api + '/' + idioma_2._id)
		        .send({nombre: idioma_1.nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('Valor duplicado introducido');
		            done();
		        });
		});

	});
})
