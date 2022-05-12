const { brugere, produkter } = require('../app/models')
let chai = require('chai');
let chaiHttp = require('chai-http');


chai.use(chaiHttp);
chai.should();

let expect = chai.expect;

let localhost = 'http://localhost:1337'
/*
describe('Test produkt API (localhost:1337/api/produkter/~)', () => {
    describe("Test GET request: /api/produkter/getprodukter", () => {
        it("Skal returnere alle varer i databasen", (done) => {
            chai.request("http://localhost:1337/")
                .get("/api/produkter/getprodukter")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.not.be.eq(0);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('pris');
                done();
                });
        });
    })

    describe("Test GET request: /api/produkter/getprodukterall", () => {
        it("Skal returnere alle produkter inkl. kategori", (done) => {
            chai.request("http://localhost:1337/")
                .get("api/getAnnoncer/Bukser")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.not.be.eq(0);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('pris');
                done();
                });
                
        });

        it("Skal have alle de påkrævede felter", (done) => {
            chai.request("http://localhost:1337/")
                .get("api/getannonce/Bukser")
                .end((err, res) => {
                    svar = res.body
                    expect(res.body[0]).to.have.all.keys('pris', 'titel', 'beskrivelse', 'billedeUrl', 'dato', 'id', 'kategori', 'oprettetAfId');
                    
                    
                    done();
                });
                
        });

        
    })


});*/