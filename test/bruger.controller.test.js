const { brugere, produkter } = require('../app/models')
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const e = require("express");
let server = require('../server.js');
let expect = chai.expect;

// Sov 
beforeEach( async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Sover 1,5 sekunder så databasen når at sættes op");
});


// Create user to test with: 
describe("CREATE USER", () => {  
    describe("POST til /brugere/", () => {                 
        it("Opret bruger i databasen", (done) => {
            chai.request("http://localhost:1337/api/")
            .post('brugere/')
            .send({ email: 'test@test.com', password: 'brugertest', navn: 'brugertest', lokation: 1, telefon: 24438798,  })
            .end((err, res) => { 
                expect(res.status).to.equal(200);
                done();     
            });
        });
    });
    
    
    
    
    // Krav 4
    describe("Krav 4 - UNIT TEST", () => {  
        describe("POST brugerlogin", () => {                 
            it("Logger ind med korrekt info", (done) => {
                chai.request("http://localhost:1337")
                .post('/api/brugere/brugerlogin')
                .send({ email: 'test@test.com', password: 'brugertest' })
                .end((err, res) => { 
                    expect(err).to.be.null;
                    expect(res.body).to.not.be.empty;
                    expect(res.status).to.equal(200);
                    done();     
                });
            });
        });
    });
    describe("Krav 4 - UNIT TEST", () => {  
        describe("POST brugerlogin", () => {                 
            it("Logger ind med forkert info", (done) => {
                chai.request("http://localhost:1337")
                .post('/api/brugere/brugerlogin')
                .send({ email: 'eee@eee.com', password: 'eee' })
                .end((err, res) => { 
                    expect(err).to.not.be.null;
                    done();     
                });
            });
        });
    });
    


describe("POST brugerlogin", () => {                 
    it("Logger ind med forkert bruger", (done) => {
        chai.request("http://localhost:1337")
        .post('/api/brugere/brugerlogin')
        .send({ email: 'yogo@yogo.yogo', password: 'yogo' })
        .end((err, res) => {
            expect(res).to.equal(true);
            done();     
        });
    });
});

describe("POST /brugerlogin", () => {                 
    it("Logger ind med tomme felter", (done) => {
        chai.request("http://localhost:1337")
        .post('/api/brugere/brugerlogin')
        .send({ email: '', password: '' })
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.equal(false);
            
            done();     
        });
    });
});
describe("POST /login", () => {                 
    it("Logger ind med forkert password", (done) => {
        chai.request("http://localhost:1337")
        .post('/api/brugere/brugerlogin')
        .send({ email: 'frank@hvam.dk', password: 'yolo' })
        .end((err, res) => { 
            expect(err).to.be.null;
            expect(res).to.equal(false);
            done();     
        });
    });
});
describe("POST /login", () => {                 
    it("Logger ind med korrekt password og en forkert email", (done) => {
        chai.request("http://localhost:1337")
        .post('/api/brugere/brugerlogin')
        .send({ email: 'isfhg784', password: 'frank1' })
        .end((err, res) => { 
            //expect(err).to.be.null;
            expect(res).to.equal(false);
            done();     
        });
    });
});
});