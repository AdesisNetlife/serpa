Serpa (series & parallel)
=====
[![Build Status](https://travis-ci.org/AdesisNetlife/serpa.png?branch=master)](https://travis-ci.org/AdesisNetlife/serpa) [![Dependency Status](https://gemnasium.com/AdesisNetlife/serpa.png)](https://gemnasium.com/AdesisNetlife/serpa)
[![Coverage Status](https://coveralls.io/repos/AdesisNetlife/serpa/badge.png?branch=master)](https://coveralls.io/r/AdesisNetlife/serpa?branch=master)
[![Code Climate](https://codeclimate.com/github/AdesisNetlife/serpa.png)](https://codeclimate.com/github/AdesisNetlife/serpa)

Serpa is a small utility library for promise chaining.

Promises may be chained in series or parallel:

```js
var serpa = require(serpa),
    series = serpa.series,
    parallel = serpa.parallel,
    split = serpa.split;

//Being task1, task2a, task2b and task3 functions
//that either return promises for async taks
//or a value, then:
var work = series( //configure the work to be done
    task1,
    parallel(task2a, task2b),
    split(task3)
  );

work() //do the work
  .then(
    function (result) {
      console.log("Work finished with result" + result);
    },
    function (err){
      console.log("Some task failed with err: " + err);
    });
```

## Series
Series execution of the tasks.
The result of each task is passed to the next task.

```js
function addTwo(x) {
  return x  + 2;
}
function addThree(x) {
  var defer = q.defer();
  setTimeout(function () {
      defer.resolve(x + 3);
    },1000);
  return defer.promise();
}

var work = series(
    addTwo,
    addThree
  );

work(1).then(function (result) {
  console.log(result); //eventually logs 6
});

```

## Parallel
All the tasks are executed in parallel. The entry value is passed to each task.

```js
function addTwo(x) {
  return x  + 2;
}
function addThree(x) {
  var defer = q.defer();
  setTimeout(function () {
      defer.resolve(x + 3);
    },1000);
  return defer.promise();
}

var work = parallel(
    addTwo,
    addThree
);

work(1).then(function (result) {
  console.log(result); //eventually logs [3, 4];
});

```

## Split
The tasks are executed for each element of the array that should be the input to the chain.

```js

function addTwo(x) {
  return x  + 2;
}
function addThree(x) {
  var defer = q.defer();
  setTimeout(function () {
      defer.resolve(x + 3);
    },1000);
  return defer.promise();
}

var work = split(
    addTwo,
    addThree
);

work([1,2,3]).then(function (result) {
  console.log(result); //eventually logs [6, 7, 8];
});

```


## Preserve
The tasks are executed and then the original value is returned

```js
var work = preserve(
  series(
    split(
      addTwo, addThree
    )
  )
);

work([1,2]).then(function (result){
  console.log(result); //eventually logs [1,2];
});
```
