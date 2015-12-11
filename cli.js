#! /usr/bin/env node

if (!process.argv[2] || process.argv[2].length < 3) {
	log([
		'Usage:',
		'    closestcolor <color> [<option>]',
		'',
		'Options:',
		'    name                    Name of color',
		'    hex                     Full hex of color',
		'    contrast                Inverse black or white',
		'    all                     All information'
	]);
} else {
	var color   = process.argv[2].replace(/^[^#]/, '#$&').replace(/^#([A-f0-9])([A-f0-9])([A-f0-9])$/, '#$1$1$2$2$3$3');
	var display = process.argv[3];
	var match   = require('./src/match');
	var hex2rgb = require('./src/hex2rgb');

	var result = match(hex2rgb(color));

	if (display in result) {
		log([
			result[display]
		]);
	} else if (display === 'all') {
		log([
			'name:     ' + result.name,
			'hex:      ' + result.hex,
			'contrast: ' + result.contrast
		]);
	} else {
		log([
			result.name + ' (' + result.hex + ')'
		]);
	}
}

process.exit(0);

function log(messages) {
	console.log([''].concat(messages).concat('').join('\n'));
}
