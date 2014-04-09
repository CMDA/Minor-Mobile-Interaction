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
  			var self = this;

  			utils.init();
  			this.router();
  				
  			document.addEventListener('gesturechange', this, false);
			document.addEventListener('scroll', this, false);
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

  		router: function() {
  			routie({
			    '/some-section': function() {
			    	section.toggle('some-section');
				},
			    '/some-other-section': function(route) {
			    	section.toggle('some-other-section');
				}
			});
  		}
  	};

  	var section = {
  		toggle: function(route) {
  			var self 	= this,
  				panel 	= $('[data-route='+ route +']'),
  				front 	= /front-panel/.test(panel.className);
  			
  			this.fp = document.getElementsByClassName('front-panel')[0];
  			this.bp = document.getElementsByClassName('back-panel')[0];

  			this.bp.addEventListener('webkitTransitionEnd',self.reset,false)

  			if(!(panel == this.fp)){
  				this.fp.classList.add('out');
  				this.bp.classList.remove('back-panel');
  				this.bp.classList.add('front-panel');
  			} else {
  				// to do: active navigation
  			}
  		},

  		reset: function(){
  			section.fp.classList.remove('out','front-panel');
  			section.fp.classList.add('back-panel');
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

  	app.init();

})();


