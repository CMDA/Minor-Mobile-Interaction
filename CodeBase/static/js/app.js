(function () {
	'use strict';

	var settings = {

	};

	var controller = {
		init: function () {
			navigator.splashscreen.hide();
			console.log('test');
		}
	};

	var utils = {

	};

	document.addEventListener("deviceready", controller.init, false);
})();
