'use strict';

var q = require('q'),
  serpa = require('../serpa'),
  series = serpa.series;

function addTwo(x) {
  var defer = q.defer();
  defer.resolve(x + 2);
  return defer.promise;
}
function addThree(x) {
  return x + 3;
}

describe('serpa', function() {
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
  });
});
