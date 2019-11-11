const { chai, server, should } = require("./config");
const Editorial  = require('../../models/editorial');
const editorial1 = 'Editorial 1';
const editorial2 = 'Editorial 2';
const api   = '/api/v1/editoriales';

describe("API Editoriales", () => {
	beforeEach((done) => { 
		Editorial.deleteMany({}, (err) => { 
			done();           
		});        
	});

	describe("/GET", () => {		 
		it("Debe devolver las editoriales", (done) => {			
			Editorial.create({nombre: editorial1});
			Editorial.create({nombre: editorial2});

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

		it("Debe devolver una editorial", (done) => {						
			const editorial = new Editorial({nombre: editorial1});
			editorial.save();

			chai.request(server)
				.get(api + '/' + editorial._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
					done();
				});
		});
	});

	describe('/POST', () => {
		it('debería insertar una editorial', (done) => {	
			const nombre = editorial1;

			chai.request(server)
		    	.post(api)
		        .send({nombre})
		        .end((err, res) => {
		        	res.should.have.status(201);		            
		            res.body.should.have.property("success").to.be.true;
					res.body.should.have.property("data");
		            res.body.data.should.have.property('nombre').eql(editorial1);
		            res.body.data.should.have.property('_id');
		            res.body.data.should.have.property('created_at');		            
		            done();
		        });
		});

		it('debería devolver un error 400 al registrar una editorial sin nombre ', (done) => {			
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

		it('debería devolver un error 400 al registrar una editorial con un nombre con menos de 3 caracteres ', (done) => {
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

		it('debería devolver un error 400 al registrar una editorial con un nombre con más de 60 caracteres ', (done) => {
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

		it('debería dar error 400 al intentar registrar una editorial duplicada', (done) => {
			Editorial.create({nombre: editorial1});		
		    
		    chai.request(server)
		    	.post(api)
		        .send({nombre: editorial1})
		        .end((err, res) => {
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('Valor duplicado introducido');
		            done();
		        });
		});
	});

	describe('/PUT/:id', () => {
		it('debería actualizar una editorial', (done) => {
			const editorial = new Editorial({nombre: editorial1});
			editorial.save();						

		    chai.request(server)
		    	.put(api + '/' + editorial._id)
		        .send({nombre: editorial2})
		        .end((err, res) => {		        	
		        	res.should.have.status(200);		            
		            res.body.should.have.property('success').to.be.true;
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos una editorial sin nombre', (done) => {
			const editorial = new Editorial({nombre: editorial1});
			editorial.save();	
		    
		    chai.request(server)
		    	.put(api + '/' + editorial._id)
		        .send({nombre: ''})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre es un campo requerido');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos una editorial con un nombre inferior a 3 caracteres', (done) => {
			const editorial = new Editorial({nombre: editorial1});
			editorial.save();	
		    
		    const nombre = 'aa';
		    chai.request(server)
		    	.put(api + '/' + editorial._id)
		        .send({nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre debe tener al menos 3 caracteres');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos una editorial con un nombre superior a 60 caracteres', (done) => {
			const editorial = new Editorial({nombre: editorial1});
			editorial.save();							

		    const nombre = new Array(62).join('a');	
		    chai.request(server)
		    	.put(api + '/' + editorial._id)
		        .send({nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('El nombre debe tener como máximo 60 caracteres');
		            done();
		        });
		});

		it('debería dar un error 400 si actualizamos una editorial con nombre existente', (done) => {
			const editorial_1 = new Editorial({nombre: editorial1});
			editorial_1.save();				

			const editorial_2 = new Editorial({nombre: editorial2});
			editorial_2.save();

		    chai.request(server)
		    	.put(api + '/' + editorial_2._id)
		        .send({nombre: editorial_1.nombre})
		        .end((err, res) => {		        	
		        	res.should.have.status(400);		            
		            res.body.should.have.property('success').to.be.false;
		            res.body.should.have.property('error').eql('Valor duplicado introducido');
		            done();
		        });
		});
	});
});
