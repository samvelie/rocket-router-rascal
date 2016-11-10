var spaceshipPartsStub = [{"id":6374,"name":"Engine","needed":9,"inStock":79},{"id":6377,"name":"Landing Leg","needed":10,"inStock":47},{"id":6984,"name":"First Stage","needed":1,"inStock":9},{"id":8374,"name":"Second Stage","needed":1,"inStock":25},{"id":9394,"name":"Guide Fins","needed":4,"inStock":38}]; // 4
// var spaceshipPartsStub = [{"id":6374,"name":"Engine","needed":9,"inStock":18},{"id":6377,"name":"Landing Leg","needed":6,"inStock":45},{"id":6984,"name":"First Stage","needed":1,"inStock":5},{"id":8374,"name":"Second Stage","needed":1,"inStock":51},{"id":9394,"name":"Guide Fins","needed":4,"inStock":53}]; // 2
// var spaceshipPartsStub = [{"id":6374,"name":"Engine","needed":4,"inStock":40},{"id":6377,"name":"Landing Leg","needed":10,"inStock":31},{"id":6984,"name":"First Stage","needed":1,"inStock":3},{"id":8374,"name":"Second Stage","needed":1,"inStock":82},{"id":9394,"name":"Guide Fins","needed":4,"inStock":29}] // 3
// var spaceshipPartsStub = [{"id":6374,"name":"Engine","needed":7,"inStock":54},{"id":6377,"name":"Landing Leg","needed":3,"inStock":85},{"id":6984,"name":"First Stage","needed":1,"inStock":9},{"id":8374,"name":"Second Stage","needed":1,"inStock":79},{"id":9394,"name":"Guide Fins","needed":4,"inStock":51}] // 7
var proxyquire = require('proxyquire');
var assert =  require('assert');
var server = require('../lib/server/app');
// var server = proxyquire('../lib/server/app', {'./modules/spaceship-parts': spaceshipPartsStub});

console.log("Testing the server");

describe('server', function () {
  before(function () {
    server.listen(8000);
  });

  after(function () {
    server.close();
  });
});

var http = require('http');
var expect = require("chai").expect;
var sinon = require("sinon");

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


describe('the static files', function () {
  it('should return a 200 status', function (done) {
    http.get('http://localhost:8000/css/styles.css', function (res) {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should return the styles.css from the public folder', function (done) {
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

describe('the "/parts" route', function () {
  it('should return a 200 status', function (done) {
    http.get('http://localhost:8000/parts', function (res) {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should respond with the values created in the "spaceship-parts.js" module', function (done) {
    http.get('http://localhost:8000/parts', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(data, JSON.stringify(spaceshipPartsStub));
        done();
      });
    });
  });
});

describe('the "/rocketCount" route', function () {
  it('should return a 200 status', function (done) {
    http.get('http://localhost:8000/rocketCount', function (res) {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should respond with the number of rockets it is possible to create based on the "spaceship-parts.js" module', function (done) {
    http.get('http://localhost:8000/rocketCount', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(JSON.parse(data).count, 4);
        done();
      });
    });
  });

});
