module.exports = function hex2rgb(hex) {
	var bigint = parseInt(hex.slice(1), 16);

	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;

	return {
		R: r,
		G: g,
		B: b
	};
};
