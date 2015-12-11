var match = require('./match');

document.addEventListener('DOMContentLoaded', function () {
	var input  = document.querySelector('input');
	var button = document.querySelector('a');
	var sheet  = document.styleSheets[0];

	var bodyCSS  = sheet.cssRules[1].style;
	var afterCSS = sheet.cssRules[2].style;
	var testCSS  = document.body.appendChild(document.createElement('style')).style;

	var color;

	input.addEventListener('input',  oninput);
	input.addEventListener('change', oncopy);
	input.addEventListener('focus', onfocus);

	button.addEventListener('click', oncopy);

	window.addEventListener('hashchange', onhash);

	onhash();

	var timeout;

	function oninput() {
		var value     = input.value;
		var fullValue = value.length === 4 ? '#' + value.slice(1).split('').map(function (c) {
			return c + c;
		}).join('') : value;

		testCSS.color = null;

		testCSS.color = value;

		clearTimeout(timeout);

		if (testCSS.color) {
			var rgb = { R: 0, G: 0, B: 0 };

			testCSS.color.replace(/(\d+), (\d+), (\d+)/, function ($0, R, G, B) {
				rgb.R = R * 1;
				rgb.G = G * 1;
				rgb.B = B * 1;
			});

			color = match(rgb);

			var foreground = color.contrast;
			var background = foreground === 'white' ? 'black' : 'white';

			button.textContent = color.name;

			bodyCSS.backgroundColor = color.original;
			bodyCSS.color = foreground;
			bodyCSS.textShadow = '0 -.03125em .0625em ' + background + ',0 0 .0625em ' + background;

			afterCSS.backgroundColor = color.hex;

			timeout = setTimeout(function () {
				if (color.original === fullValue) {
					location.hash = value;
				}
			}, 400);
		}
	}

	function oncopy() {
		var selection = window.getSelection();
		var range     = document.createRange();

		selection.removeAllRanges();

		range.selectNode(button);

		selection.addRange(range);

		document.execCommand('copy');

		selection.removeAllRanges();
	}

	function onhash() {
		if (location.hash && location.hash !== input.value) {
			input.value = location.hash;

			oninput();
		}
	}

	function onfocus() {
		input.selectionStart = input.value.length;
	}
});
