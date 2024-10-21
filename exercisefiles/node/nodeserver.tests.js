const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./nodeserver'); // Assuming the server is exported from nodeserver.js

// exercisefiles/node/nodeserver.test.js

const { expect } = chai;

chai.use(chaiHttp);

describe('Node.js Server', () => {
  describe('GET /Get', () => {
    it('should return "Hello World"', (done) => {
      chai.request(server)
        .get('/Get')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Hello World');
          done();
        });
    });
  });

  describe('GET /DaysBetweenDates', () => {
    it('should return the number of days between two valid dates', (done) => {
      chai.request(server)
        .get('/DaysBetweenDates?date1=2023-01-01&date2=2023-01-10')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('daysBetween', 9);
          done();
        });
    });

    it('should return an error for invalid dates', (done) => {
      chai.request(server)
        .get('/DaysBetweenDates?date1=invalid&date2=2023-01-10')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Invalid dates');
          done();
        });
    });
  });

  describe('GET /ValidatePhoneNumber', () => {
    it('should return "valid" for a valid Spanish phone number', (done) => {
      chai.request(server)
        .get('/ValidatePhoneNumber?phoneNumber=+34123456789')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('result', 'valid');
          done();
        });
    });

    it('should return "invalid" for an invalid Spanish phone number', (done) => {
      chai.request(server)
        .get('/ValidatePhoneNumber?phoneNumber=123456789')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('result', 'invalid');
          done();
        });
    });
  });

  describe('GET /InvalidEndpoint', () => {
    it('should return 404 for an undefined endpoint', (done) => {
      chai.request(server)
        .get('/InvalidEndpoint')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.equal('Not Found');
          done();
        });
    });
  });
});