const { brugere, produkter } = require('../app/models')
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const e = require("express");

let expect = chai.expect;

describe("Krav 4")

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
  });