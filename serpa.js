'use strict';

var q = require("q"),
  series,
  parallel,
  split,
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
    f = function executingSeries(soFar) {
        return args.reduce(when, soFar);
    };
    f.notPromise = notPromise;
    return f;
};

parallel = function parallel() {
    var f, args;
    args = slice(arguments);
    f = function executingParallel(soFar) {
      return q.all(args.map(
          function (el) {
              return when(soFar, el);
          }
      ));
    };
    f.notPromise = notPromise;
    return f;
};

split = function split() {
    var f, args;
    args = slice(arguments);
    f = function executingSplit(soFar){
        if (Array.isArray(soFar)){
            return q.all(soFar.map(function (element){
                return args.reduce(when, q(element));
            }));
        } else {
            return q.reject("'split' argument is not an Array: " + soFar.toString());
        }
    };
    return f;
};

exports.series = series;
exports.parallel = parallel;
exports.split = split;
