const { brugere, produkter } = require('../app/models')
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const e = require("express");
let server = require('../server.js');
let expect = chai.expect;


setTimeout(function() {
    // do some setup
    describe("Get brugere", () => {  
        describe("GET til /allebrugere", () => {                 
          it("Log bruger ind med rigtige oplysninger", (done) => {
            chai.request("http://localhost:1337/api/produkter")
              .get('/getprodukter')
              .end((err, res) => { 
                expect(err).to.be.null;
                expect(res.status).to.equal(200);
                done();     
              });
          });
        });
    });      
  
    run();
  }, 5000);


// Først oprettes en bruger, herefter unit testes det om brugeren kan logge ind (krav 4)  
describe("Opret bruger", () => {  
    describe("POST til /opretbruger", () => {                 
      it("Log bruger ind med rigtige oplysninger", (done) => {
        chai.request("http://localhost:1337/api/brugere")
          .post('/opretbruger')
          .send({ email: 'test@test.com', password: 'brugertest', navn: 'brugertest', lokationId: 1, telefon: 24438798,  })
          .end((err, res) => { 
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            done();     
          });
      });
    });
});
describe("Get brugere", () => {  
    describe("GET til /allebrugere", () => {                 
      it("Log bruger ind med rigtige oplysninger", (done) => {
        chai.request("http://localhost:1337/api/produkter")
          .get('/getprodukter')
          .end((err, res) => { 
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            done();     
          });
      });
    });
});
/*
// Opret først en bruger:
describe("Krav 4 test: Login", () => {  
    describe("POST til /login", () => {                 
      it("Log bruger ind med rigtige oplysninger", (done) => {
        agent
          .post('/login')
          .send({ email: 'test@1', password: 'test' })
          .end((err, res) => { 
            expect(err).to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body).to.equal(true);
            done();     
          });
      });
    });
});

describe("Krav ...", () => {
    describe("Test opretBruger POST request: /api/opretBruger", () => {
      it("Skal oprette ny bruger", (done) => {
        const bruger = {
          email: "unittest@gmail.com",
          password: "test",
          lokation: "Sjælland",
          navn: "testbruger",
          telefon: "38849384",
        };
        chai
          .request("http://localhost:1337/")
          .post("api/opretBruger")
          .send(bruger)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
    describe("Test at brugeren bliver oprettet i databasen", () => {
      it("Oprettes i databasen", (done) => {
        chai
          .request("http://localhost:1337/")
          .get("api/getBrugerByEmail/unittest@gmail.com")
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
    describe("Test at brugeren kan slettes i databasen", () => {
      it("Slettes i databasen, test: /api/sletBruger", (done) => {
        chai
          .request("http://localhost:1337/")
          .get("api/sletBrugerByEmail/unittest@gmail.com")
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it("Test at brugeren rent faktisk er slettet i db.json", (done) => {
          chai
          .request("http://localhost:1337/")
          .get("api/getBrugerByEmail/unittest@gmail.com")
          .end((err, res) => {
              const email = "unittest@gmail.com"
              JSON.stringify(Database.getBrugerByEmail(email)).should.be.eq("true")
          done();
          });
      });
    });
  });*/