'use strict';

var path = require('path'),
    y2nw = require('./lib');

y2nw({
  header: 'STATIC = -> "value"',
  src: __dirname + '/tests',
  dest: __dirname + '/generated',
  steps: __dirname + '/other'
}, function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  var suitcase = require(__dirname + '/generated/tests/example-suitcase');

  var browser = {
    end: function() {
      console.log('Done.');
    }
  };

  try {
    for (var test in suitcase) {
      suitcase[test](browser);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});
