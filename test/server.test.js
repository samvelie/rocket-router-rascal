var server = require('../lib/server/app');

console.log("Testing the server");

describe('server', function () {
  before(function () {
    server.listen(8000);
  });

  after(function () {
    server.close();
  });
});

var assert = require('assert'),
    http = require('http');
var expect = require("chai").expect;

describe('the "/" route', function () {
  it('should return a 200 status', function (done) {
    http.get('http://localhost:8000', function (res) {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should return the index.html', function (done) {
    http.get('http://localhost:8000', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        // assert.equal(, data);
        expect(data).to.contain('html');
        done();
      });
    });
  });
});


describe('the static files to be served from the public folder', function () {
  it('should return a 200 status', function (done) {
    http.get('http://localhost:8000/css/styles.css', function (res) {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should return the styles.css', function (done) {
    http.get('http://localhost:8000/css/styles.css', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        // assert.equal(, data);
        expect(data).to.contain('background-color');
        done();
      });
    });
  });
});

describe('the "/hello" route', function () {
  it('should return a 200 status', function (done) {
    http.get('http://localhost:8000', function (res) {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should respond with "Welcome to the spaceship factory!"', function (done) {
    http.get('http://localhost:8000/hello', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(data, 'Welcome to the spaceship factory!');
        done();
      });
    });
  });
});
