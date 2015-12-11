var brsrify = require('browserify')();
var cssnano = require('cssnano');
var fs      = require('fs-promise');
var path    = require('path');
var inline  = require('posthtml-inline-assets');
var minify  = require('uglify-js').minify;

/* ====================================================== */

var filepath = path.resolve('src/index.html');
var dirpath  = path.dirname(filepath);

fs.readFile(filepath, 'utf8').then(function (contents) {
	return inline.process(contents, {
		from: filepath,
		inline: {
			image: false,
			script: {
				then: function (node, data) {
					delete node.attrs.src;

					return new Promise(function (resolve) {
						brsrify.add(data.resolvedPath);

						brsrify.bundle(function (err, buffer) {
							node.content = [minify(buffer.toString('utf8'), {
								fromString: true
							}).code];

							resolve();
						});
					});
				}
			},
			style: {
				then: function (node, data) {
					delete node.attrs.href;
					delete node.attrs.rel;

					node.tag = 'style';

					return cssnano.process(data.buffer.toString('utf8')).then(function (result) {
						node.content = [result.css];
					});
				}
			}
		}
	});
}).then(function (result) {
	return fs.writeFile('index.html', result.html, 'utf8');
}).then(function () {
	console.log('build successful');
});
