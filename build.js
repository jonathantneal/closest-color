var browserify = require('browserify');
var uglifyJS = require('uglify-js');
var fs = require('fs');

var b = browserify();

b.add('./browser.js');

b.bundle().pipe(fs.createWriteStream('script.js'));
