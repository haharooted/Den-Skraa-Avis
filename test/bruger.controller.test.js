const { brugere, produkter } = require('../app/models')
let chai = require('chai');
let chaiHttp = require('chai-http');


chai.use(chaiHttp);
chai.should();
