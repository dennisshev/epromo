/**
Copyright (c) 2014 Dennis Shevtsov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function (document) {
	var sliders = document.querySelectorAll('[data-role="slider"]'),
	    speed = 1,
	    repeat = 10000,
	    i;

	function startAnimateSlider(slider) {
		var prevButton = slider.querySelector('[data-role="slider-prev"]'),
		    nextButton = slider.querySelector('[data-role="slider-next"]'),
		    timeout = setTimeout(function () {
		    	animateSlider();
		    }, repeat);

		prevButton.onclick = function () {
			clearTimeout(timeout);
			animateSlider(true);
		};
		nextButton.onclick = function () {
			clearTimeout(timeout);
			animateSlider();
		};
		
		function animateSlider(isReverse) {
			var slides = slider.querySelectorAll('[data-role="slider-item"]'),
					current = 0,
					next = 0,
					currentLeft = 0,
					nextLeft = 100,
					i;

			prevButton.onclick = null;
			nextButton.onclick = null;

			for (i = 0; i < slides.length; ++i) if (slides[i].className.indexOf('active') != -1) {
				current = i;
				break;
			}

			if (isReverse) {
				currentLeft = 0;
				nextLeft = -100;

				if (current > 0) {
					next = current - 1;
				} else {
					next = slides.length - 1;
				}
			} else if (current < slides.length - 1) {
				next = current + 1;
			}

			current = slides[current];
			next = slides[next];

			next.style.left = nextLeft;
			next.className += ' next';

			function animateSlide(slide, step) {
				if ((nextLeft <= 0 && !isReverse) || (nextLeft >= 0 && isReverse)) {
					current.className = current.className.replace(' active', '');
					next.className = next.className.replace('next', 'active');

					startAnimateSlider(slider);
					return;
				};

				if (isReverse) {
					currentLeft += step;
					nextLeft += step;
				} else {
					currentLeft -= step;
					nextLeft -= step;
				}

				next.style.left = nextLeft + '%';
				current.style.left = currentLeft + '%';

				setTimeout(function () {
					animateSlide(slide, step);
				}, 1);
			}

			animateSlide(next, speed);
		}
	}

	for (i = 0; i < sliders.length; ++i) {
		startAnimateSlider(sliders[i]);
	}
})(document);
