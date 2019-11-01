const mongoose = require('mongoose');
const { chai, server, should } = require("./config");

const Fabricante  = require('../../models/fabricante');
const fabricante1 = 'Fabricante 1';
const fabricante2 = 'Fabricante 2';
const api = '/api/v1/fabricantes';

describe("API Fabricantes", () => {
	beforeEach((done) => { 
		Fabricante.deleteMany({}, (err) => { 
			done();           
		});        
	});

	describe("/GET", () => {		 
		it("Debe devolver los fabricantes", (done) => {			
			Fabricante.create({nombre: fabricante1});
			Fabricante.create({nombre: fabricante2});

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
			const id  = mongoose.Types.ObjectId();	

			chai.request(server)
				.get(api + '/' + id)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.have.property("success").to.be.false;
					res.body.should.have.property("error");
					done();
				});
		});

		it("Debe devolver un fabricante", (done) => {						
			const fabricante = new Fabricante({nombre: fabricante1});
			fabricante.save();

			chai.request(server)
				.get(api + '/' + fabricante._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
					done();
				});
		});
	});

	describe('/POST', () => {
		it('debería insertar un fabricante', (done) => {	
			const nombre = fabricante1;

			chai.request(server)
		    	.post(api)
		        .send({nombre})
		        .end((err, res) => {
		        	res.should.have.status(201);		            
		            res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
		            res.body.data.should.have.property('nombre').eql(fabricante1);
		            res.body.data.should.have.property('_id');
		            res.body.data.should.have.property('created_at');		            
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar un fabricante sin nombre ', (done) => {			
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

		it('debería devolver un error 400 al registrar un fabricante con un nombre con menos de 3 caracteres ', (done) => {
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

		it('debería devolver un error 400 al registrar un fabricante con un nombre con más de 60 caracteres ', (done) => {
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

		it('debería dar error 400 al intentar registrar un fabricante duplicado', (done) => {
			Fabricante.create({nombre: fabricante1});		
		    
		    chai.request(server)
		    	.post(api)
		        .send({nombre: fabricante1})
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('Valor duplicado introducido');
		            done();
		        });
		});
	});

	describe('/PUT/:id', () => {
		it('debería actualizar un fabricante', (done) => {
			const fabricante = new Fabricante({nombre: fabricante1});
			fabricante.save();						

		    chai.request(server)
		    	.put(api + '/' + fabricante._id)
		        .send({nombre: fabricante2})
		        .end((err, res) => {		        	
		        	res.should.have.status(200);		            
		            res.body.should.have.property('success').to.be.true;
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un fabricante sin nombre', (done) => {
			const fabricante = new Fabricante({nombre: fabricante1});
			fabricante.save();						

		    chai.request(server)
		    	.put(api + '/' + fabricante._id)
		        .send({nombre: ''})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre es un campo requerido');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un fabricante con un nombre inferior a 3 caracteres', (done) => {
			const fabricante = new Fabricante({nombre: fabricante1});
			fabricante.save();						

		    const nombre = 'aa';
		    chai.request(server)
		    	.put(api + '/' + fabricante._id)
		        .send({nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre debe tener al menos 3 caracteres');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un fabricante con un nombre superior a 60 caracteres', (done) => {
			const fabricante = new Fabricante({nombre: fabricante1});
			fabricante.save();						

		    const nombre = new Array(62).join('a');	
		    chai.request(server)
		    	.put(api + '/' + fabricante._id)
		        .send({nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre debe tener como máximo 60 caracteres');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos un fabricante con nombre existente', (done) => {
			const fabricante_1 = new Fabricante({nombre: fabricante1});
			fabricante_1.save();				

			const fabricante_2 = new Fabricante({nombre: fabricante2});
			fabricante_2.save();

		    chai.request(server)
		    	.put(api + '/' + fabricante_2._id)
		        .send({nombre: fabricante_1.nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('Valor duplicado introducido');
		            done();
		        });
		});

	});
})






