module.exports = function rgb2hex(color) {
	return "#" + ((1 << 24) + (color.R << 16) + (color.G << 8) + color.B).toString(16).slice(1);
};
