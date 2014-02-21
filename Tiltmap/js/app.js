/*jslint browser:true, devel:true*/
(function () {
	'use strict';
    
	var settings = {
        mapID: 'map',
        location: [51.505, -0.09],
        zoom: 13,
        treshold: 2,
        speed: 50
	};

	var controller = {
		init: function () {
			console.log('init');
            document.addEventListener('touchmove',  function(e){ e.preventDefault(); }, false);
            map.init();
            accel.startWatch();
            navigator.splashscreen.hide();
		}
	};

	var accel = {
        watchID: null,
        options: {frequency: 100},
        
        startWatch: function () {
            this.watchID = navigator.accelerometer.watchAcceleration(this.processData, this.onError, this.options);
        },
 
        processData: function (acceleration) {
            var movX;
            var movY;
            
            if (acceleration.x > settings.treshold) {
                movX = settings.speed;
            } else if (acceleration.x < settings.treshold*-1) {
                movX = settings.speed*-1;
            } else {
                movX = 0;
            }
            
            if (acceleration.y > settings.treshold) {
                movY = settings.speed*-1;
            } else if (acceleration.y < settings.treshold*-1) {
                movY = settings.speed;
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
            console.log('init map');
            this.mapObject = L.map(settings.mapID, {zoomControl: false, attributionControl: false, dragging: false}).setView(settings.location, settings.zoom);
            var layerOptions = {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'};
            L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', layerOptions).addTo(this.mapObject);
        }
    };

	document.addEventListener("deviceready", controller.init, false);
})();