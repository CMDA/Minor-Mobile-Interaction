(function(){
	'use strict';

	var scrollTop 	= document.body.scrollTop,
  		el 			= document.body,
  		els 		= document.querySelectorAll('.meta'),
  		position 	= el.scrollTop,
  		oHeight 	= el.offsetHeight,
  		wHeight		= window.innerHeight,
  		$, $$;

  	var app = {
  		init: function() {
  			this.router();
  				
  			document.addEventListener('gesturechange', this, false);
			document.addEventListener('scroll', this, false);
  		},

  		router: function() {
  			routie({
			    '/some-section': function() {
			    	section.toggle('some-section');
				},
			    '/some-other-section': function(route) {
			    	section.toggle('some-other-section');
				}
			});
  		},

  		handleEvent: function(e) {
        	var scroll = el.scrollTop,
				i = 0, 
				l = els.length;

			if (scroll > position && (scroll + wHeight) < oHeight && position > 0) {
				// scrolling Down
				for (;i < l;i++) {
				    els[i].classList.add('shrink');
				};
			} else {
				// scrolling Up
				for (;i < l;i++) {
				    els[i].classList.remove('shrink');
				};
			}
			position = scroll;
  		},

  	};

  	var section = {
  		toggle: function(route) {
  			var panel 	= $('[data-route='+ route +']'),
  				front 	= /front-panel/.test(panel.className);

  			this.fp = $('.front-panel');
  			this.bp = $('.back-panel');

  			this.bp.addEventListener('webkitTransitionEnd',this,false)

  			if(!(panel == this.fp)){
  				this.fp.classList.add('out');
  				this.bp.classList.remove('back-panel');
  				this.bp.classList.add('front-panel');
  			} else {
  				// to do: active navigation
  			}
  		},

  		handleEvent: function() {
  			this.fp.classList.remove('out','front-panel');
  			this.fp.classList.add('back-panel');
  		}
  	};

  	// utilities object for common thingies
	var utils = {
		init: function() {
			// Shorthand selectors
			$  = this.selectElement, 
			$$ = this.selectElements;
		},
		selectElement: function(el) {
			return document.querySelector(el);
		},
		selectElements: function(el) {
			return document.querySelectorAll(el);
		}
	};

	utils.init();
  	app.init();


})();


