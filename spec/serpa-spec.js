'use strict';

var q = require('q');

function two() {
  var defer = q.defer();
  defer.resolve(2);
  return defer.promise;
}

function addTwo(x) {
  var defer = q.defer();
  defer.resolve(x + 2);
  return defer.promise;
}

function addThree(x) {
  return x + 3;
}

describe('serpa', function() {
  var serpa, series, parallel, split;

  beforeEach(function() {
    serpa = require('../serpa');
    series = serpa.series;
    parallel = serpa.parallel;
    split = serpa.split;
  });

  it('contains series method', function() {
      var serpa = require("../serpa.js");
      expect(serpa.series).toBeTruthy();
  });

  describe('series', function() {

    it('composes promises in series', function(done) {
      var work = series(addTwo, addThree);
      work(q(1)).then(function (result) {
        expect(result).toBe(6);
        done();
      });
    });

    it('can start with non-promise values', function(done) {
      var work = series(addTwo, addThree);
      work(1).then(function (result) {
        expect(result).toBe(6);
        done();
      });
    });

    it('can start without initial value', function(done) {
      var work = series(two, addTwo);
      work(1).then(function (result) {
        expect(result).toBe(4);
        done();
      });
    });

  });

  describe('parallel', function() {

    it('executes promises in parallel', function (done) {
      var work = parallel(addTwo, addThree);
      work(1).then(function (result) {
        expect(result).toEqual([3,4]);
        done();
      });
    });

    it('can start without initial value', function(done) {
      var work = parallel(two, two);
      work().then(function (result) {
        expect(result).toEqual([2,2]);
        done();
      });
    });

  });

  it('can combine series and parallel executions', function (done) {
    var work = series(two,
        parallel(
          addTwo,
          addThree
        )
      );

    work().then(function (result) {
      expect(result).toEqual([4,5]);
      done();
    });

  });

  describe('split', function() {

      it('executes a new series for each item in the input array of previous promises', function () {
        var work = series(
          split(
            addTwo, addThree
          )
        );
        work([1,2]).then(function (result){
          expect(result).toEqual([6,7]);
          done();
        })
      });
  });


});
