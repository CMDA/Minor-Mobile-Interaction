(function () {
    'use strict';
    
    var controller = {
        init: function () {
            navigator.splashscreen.hide();
            
            // Init event handlers
            controller.events();
        },
        
        events: function () {
            $$('#card').tap(interface.flip);
        }
    };
    
    var interface = {
        flip: function () {
            console.log('flip?');
            $$(this).toggleClass('flipped');
        }
    };
    
    $$(document).on('deviceready', controller.init);
    
})();