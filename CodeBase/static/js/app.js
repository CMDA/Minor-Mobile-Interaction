(function () {
	'use strict';

	APP.settings = {
		loader: $$('progress')
	};


	APP.controller = {
		init: function () {
			APP.router.init();

			if (localStorage.getItem("counter") === null) {
 				localStorage["counter"] = 0;
 			}		
 			
 			APP.utils.counter.set();

			this.registerEvents();
		},

		registerEvents: function () {
			$$(document).on('deviceready', function(e){
				alert(shake);
				shake.startWatch(APP.utils.counter.reset);
			});

			$$('#plus-min').on('tap', function(e){
				e.preventDefault();
				
				navigator.notification.beep(2);
				navigator.notification.vibrate(200);

        		
        		var tempCounter = parseInt(localStorage["counter"]);
        		
        		switch(e.target.id) {
					case 'plus':
						tempCounter++;
					break;

					case 'min':
						tempCounter--;
        				if (tempCounter < 0) tempCounter = 0;
					break;	
				}

				localStorage["counter"] = tempCounter;

        		APP.utils.counter.set();
			});
		}
	};

	APP.router = {
		init: function () {
	  		routie({
			    '/sensor': function () {
			    	APP.section.render('sensor');
				},
				'/about': function () {
			    	APP.section.render('about');
				},
			    '*': function () {
			    	// default
			    	APP.section.render('sensor');
			    }
			});
		},
	
	};

	APP.section = {
		render: function (route, id) {
			var target = $$('section[data-route='+route+']');
			
			APP.utils.loader.show();
			
			switch(route) {
				case 'sensor':
					// render sensor section
				break;

				case 'about':
					// render about section
				break;	
			}

			this.toggle(route);
		},

		directives: {			    	 
		},

		toggle: function (route) {
			var sections = $$('section'),
				section = $$('section[data-route='+route+']');
            
            sections.removeClass('active');
            section.addClass('active');
            
            APP.utils.loader.hide();
		}
	};

	APP.utils = {
		loader: {
			show: function () {
				APP.settings.loader.removeClass('loaded');
			},
			hide: function () {
				APP.settings.loader.addClass('loaded');
			}
		},
		counter: {
			set: function() {
				$$('output').html(localStorage["counter"]);
			},
			reset: function () {
				alert('reset');
				localStorage["counter"] = 0;
			}
		}
		
	};

	$$(document).ready(function () {
		APP.controller.init();
	});
	
	
})();
