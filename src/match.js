var colors   = require('./colors.json');
var closest  = require('color-diff').closest;
var hex2rgb  = require('./hex2rgb');
var contrast = require('./contrast');
var rgb2hex  = require('./rgb2hex');

var hexes = {};

var rgbs = Object.keys(colors).map(function (name) {
	var hex = colors[name];

	hexes[hex] = name;

	return hex2rgb(hex);
});

module.exports = function match(target) {
	var name = hexes[rgb2hex(closest(target, rgbs))];

	return {
		name:     name,
		hex:      colors[name],
		contrast: contrast(target),
		original: rgb2hex(target)
	};
};
