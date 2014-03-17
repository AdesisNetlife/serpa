Serpa (series & parallel)
=====
[![Build Status](https://travis-ci.org/AdesisNetlife/serpa.png?branch=master)](https://travis-ci.org/AdesisNetlife/serpa) [![Dependency Status](https://gemnasium.com/AdesisNetlife/serpa.png)](https://gemnasium.com/AdesisNetlife/serpa) [![Coverage Status](https://coveralls.io/repos/AdesisNetlife/serpa/badge.png?branch=master)](https://coveralls.io/r/AdesisNetlife/serpa?branch=master)

Serpa is a small utility library for promise chaining.

Promises may be chained in series or parallel:

```js
//Being task1, task2a, task2b and task3 functions
//that either return promises for async taks
//or a value, then:
var work = series( //configure the work to be done
    task1,
    parallel(task2a, task2b),
    task3
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
