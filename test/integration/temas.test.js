const { chai, server, should } = require("./config");
const Tema  = require('../../models/tema');
const tema1 = 'Tema 1';
const tema2 = 'Tema 2';
const api   = '/api/v1/temas';

describe("API Temas", () => {
	beforeEach((done) => { 
		Tema.deleteMany({}, (err) => { 
			done();           
		});        
	});

	describe("/GET", () => {		 
		it("Debe devolver los temas", (done) => {			
			Tema.create({nombre: tema1});
			Tema.create({nombre: tema2});

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

		it("Debe devolver un error 404 si no se encuentra el tema", (done) => {						
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

		it("Debe devolver un tema", (done) => {						
			const tema = new Tema({nombre: tema1});
			tema.save();

			chai.request(server)
				.get(api + '/' + tema._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
					done();
				});
		});
	});

	describe('/POST', () => {
		it('debería insertar un tema', (done) => {
			const tema = { nombre: tema1 };
		    
		    chai.request(server)
		    	.post(api)
		        .send(tema)
		        .end((err, res) => {
		        	res.should.have.status(201);		            
		            res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
		            res.body.data.should.have.property('nombre').eql(tema1);
		            res.body.data.should.have.property('_id');
		            res.body.data.should.have.property('created_at');		            
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un tema sin nombre ', (done) => {
			const tema = { nombre: '' };
		    
		    chai.request(server)
		    	.post(api)
		        .send(tema)
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre es un campo requerido');
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un tema con un nombre con menos de 3 caracteres ', (done) => {
			const nombre = 'aa';
		    
		    chai.request(server)
		    	.post(api)
		        .send({nombre})
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El tema debe tener al menos 3 caracteres');
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un tema con un nombre con más de 60 caracteres ', (done) => {
			const nombre = new Array(62).join('a');			   			

		    chai.request(server)
		    	.post(api)
		        .send({nombre})
		        .end((err, res) => {
		        	res.should.have.status(400);		            		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El tema debe tener como máximo 60 caracteres');
		            done();
		        });
		});

		it('debería dar error 400 al intentar registrar un tema duplicado', (done) => {
			Tema.create({nombre: tema1});
			const tema = { nombre: tema1 };
		    
		    chai.request(server)
		    	.post(api)
		        .send(tema)
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('Valor duplicado introducido');
		            done();
		        });
		});
	});

	describe('/PUT/:id', () => {
		it('debería actualizar un tema', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						

		    chai.request(server)
		    	.put(api + '/' + tema._id)
		        .send({nombre: tema2})
		        .end((err, res) => {		        	
		        	res.should.have.status(200);		            
		            res.body.should.have.property('success').to.be.true;
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un tema sin nombre', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						

		    chai.request(server)
		    	.put(api + '/' + tema._id)
		        .send({nombre: ''})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre es un campo requerido');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un tema con un nombre inferior a 3 caracteres', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						

		    const nombre = 'aa';
		    chai.request(server)
		    	.put(api + '/' + tema._id)
		        .send({nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El tema debe tener al menos 3 caracteres');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un tema con un nombre superior a 60 caracteres', (done) => {
			const tema = new Tema({nombre: tema1});
			tema.save();						

		    const nombre = new Array(62).join('a');	
		    chai.request(server)
		    	.put(api + '/' + tema._id)
		        .send({nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El tema debe tener como máximo 60 caracteres');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un tema con nombre existente', (done) => {
			const tema_1 = new Tema({nombre: tema1});
			tema_1.save();				

			const tema_2 = new Tema({nombre: tema2});
			tema_2.save();

		    chai.request(server)
		    	.put(api + '/' + tema_2._id)
		        .send({nombre: tema_1.nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('Valor duplicado introducido');
		            done();
		        });
		});

	});
})
