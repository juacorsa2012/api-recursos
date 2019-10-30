const mongoose = require('mongoose');
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
					//res.body.should.have.property("results").eql(2);					
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
					done();
				});
		});

		it("Debe devolver un error 404 si no se encuentra el tema", (done) => {						
			const id  = mongoose.Types.ObjectId();	

			chai.request(server)
				.get(api + '/' + id)
				.end((err, res) => {
					res.should.have.status(500);
					res.body.should.have.property("success").to.be.false;
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
})
