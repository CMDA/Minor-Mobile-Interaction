(function () {
	'use strict';
    
	var settings = {
        mapID: 'map',
        location: [51.505, -0.09],
        zoom: 13
	};

	var controller = {
		init: function () {
			console.log('init');
            document.addEventListener('touchmove',  function(e){ e.preventDefault() }, false);
            map.init();
            accel.startWatch();
            navigator.splashscreen.hide();
		}
	};

	var accel = {
        watchID: null,
        options: {frequency: 10},
        
        startWatch: function () {
            this.watchID = navigator.accelerometer.watchAcceleration(this.processData, this.onError, this.options);
        },
 
        processData: function (acceleration) {
            var movX;
            var movY;
            
            if (acceleration.x > 2) {
                movX = 2;
            } else if (acceleration.x < -2) {
                movX = -2;
            } else {
                movX = 0;
            }
            
            if (acceleration.y > 2) {
                movY = -2;
            } else if (acceleration.y < -2) {
                movY = 2;
            } else {
                movY = 0;
            }
            
            if (map.mapObject) {
                map.mapObject.panBy([movX, movY]);
            }
        },
            
        onError: function() {
            alert('Accelerometer error');
        }
	};
        
    var map = {
        mapObject: null,
        
        init: function () {
            this.mapObject = L.map(settings.mapID, {zoomControl: false, attributionControl: false}).setView(settings.location, settings.zoom);
            var layerOptions = {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'};
            L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', layerOptions).addTo(this.mapObject);
        }
    };

	document.addEventListener("deviceready", controller.init, false);
})();