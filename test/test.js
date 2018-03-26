var path = require('path');
var chai = require('chai');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var expect = chai.expect;

var test = function (name, stopFlag, callback) {
  return webpack(config({
    path: path.join(__dirname, 'fixtures', name),
    quiet: true,
    stopOnError : stopFlag
  }), callback);
};

describe('NspPlugin', function () {

  it('runs without errors if no suspicious packages found', function (done) {
    test('no_errors', true, function (err, stats) {
      expect(err).to.be.null;
      expect(stats.hasErrors()).to.be.false;

      done();
    });
  });

  it('runs with error if suspicious package found', function (done) {
    test('error', true, function (err, stats) {
      const info = stats.toJson();

      expect(err).to.be.null;
      expect(stats.hasErrors()).to.be.true;
      expect(info.errors[0]).to.equal('Vulnerable packages found');

      done();
    });
  });

  it('runs with error if package.json is broken', function (done) {
    test('broken', true, function (err, stats) {
      const info = stats.toJson();

      expect(err).to.be.null;
      expect(stats.hasErrors()).to.be.true;
      expect(info.errors[0]).to.equal('Internal nsp error');

      done();
    });
  });

  it('runs without error if suspicious package found and stopOnError is false', function (done) {
    test('error', false, function (err, stats) {
      const info = stats.toJson();

      expect(err).to.be.null;
      expect(stats.hasErrors()).to.be.false;

      done();
    });
  });
});
