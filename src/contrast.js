module.exports = function contrast(color) {
	return Math.round(((parseInt(color.R) * 299) + (parseInt(color.G) * 587) + (parseInt(color.B) * 114)) / 1000) <= 180 ? '#ffffff' : '#000000';
};
