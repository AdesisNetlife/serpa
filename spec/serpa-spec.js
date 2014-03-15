'use strict';

describe('serpa', function() {
  it('contains series method', function() {
      var serpa = require("../serpa.js");
      expect(serpa.series).toBeTruthy();
  });
});
