'use strict';

var q = require("q"),
  series,
  notPromise = {};

function slice(arr) {
    return Array.prototype.slice.call(arr);
}

function when(soFar, element) {
    if (element.notPromise === notPromise) {
        return element(soFar);
    }
    return q(soFar).then(element);
}

series = function series() {
    var f, args;
    args = slice(arguments);
    f = function executingSerie(soFar) {
        return args.reduce(when, soFar);
    };
    f.notPromise = notPromise;
    return f;
};

exports.series = series;
