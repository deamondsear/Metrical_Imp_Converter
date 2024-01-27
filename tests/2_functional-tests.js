const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test(
    'Convert a valid input such as 10L: GET request to /api/convert', (done) => {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=4gal')
        .end((err, res) => {
          assert.equal(res.get('Content-type'), 'application/json; charset=utf-8');
          done()
        })
    })

  test('Convert an invalid input such as 32g: GET request to /api/convert', (done) => {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.get('Content-type'), 'text/html; charset=utf-8');
        done()
      })
  })

  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', (done) => {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kg')
        .end((err, res) => {
          assert.equal(res.get('Content-type'), 'text/html; charset=utf-8');
          done()
        })
    })

  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', (done) => {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((err, res) => {
          assert.equal(res.get('Content-type'), 'text/html; charset=utf-8');
          done()
        })
    })

  test('Convert with no number such as kg: GET request to /api/convert', (done) => {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=kg')
        .end((err, res) => {
          assert.equal(res.get('Content-type'), 'application/json; charset=utf-8');
          done()
        })
    })
  })
