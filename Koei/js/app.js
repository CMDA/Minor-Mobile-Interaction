/*jslint browser:true, devel:true*/
(function () {
	'use strict';
    
	var settings = {
        vibDuration: 10
    };
    
    var app = {
        
        init: function() {
            // Deze app gebruikt het nieuwe HTML5 localStorage opslag systeem
            // Hier slaan we de teller in op zodat je telling ook bewaard blijft als je de app sluit
            if (localStorage.getItem("counter") === null) {
                // Maak een localstorage item aan als dit de eerste keer is dat de app gebruikt wordt
                localStorage["counter"] = 0;
            } else {
                // Als er al eerder geteld is, laat dan de oude telling zien op het scherm
                document.getElementById("counter").innerHTML = localStorage["counter"];
            }
            // Activeer Fastclick library zodat de knoppen sneller reageren op een tap
            FastClick.attach(document.body);
            // Activeer shake detectie (zie lib/shake.js)
            shake.startWatch(app.reset);
            // Verbind more() & less() functies aan de plus en min knoppen op het scherm
            document.getElementById("plus").addEventListener("click", app.more, false);
            document.getElementById("minus").addEventListener("click", app.less, false);
            // Klaar om te beginnen! Vraag Cordova het splashscreen te verbergen
            navigator.splashscreen.hide();
        },
            
        more: function() {
            // Laat telefoon kort vibreren, zo heb je ook feedback als je niet naar het scherm kijkt
            navigator.notification.vibrate(settings.vibDuration);
            // Er is een nadeel aan localStorage: alles wat je er in opslaat wordt opgeslagen in een variabele van het type tekst,
            // ook als het een getal is. Op zich geen probleem, maar wij willen met dit getal rekenen en dus moeten we JavaScript
            // vertellen dat we deze variabele willen omzetten in een getal. Hiervoor kun je de functie parseInt() gebruiken. 
            // Hiervoor maken we een tijdelijke variabele aan waarin we de huidige telling opslaan maar nu als getal.
            var tempCounter = parseInt(localStorage["counter"]);
            // Die tijdelijke variabele verhogen we met 1. tempCounter++ is een afkorting voor tempCounter = tempCounter + 1.
            tempCounter++;
            // Nu slaan we de nieuwe telling op in localStorage.
            localStorage["counter"] = tempCounter;
            // En passen we de webpagina aan zodat de nieuwe telling ook zichtbaar is
            document.getElementById("counter").innerHTML = localStorage["counter"];
        },
        
        less: function() {
            navigator.notification.vibrate(settings.vibDuration);
            var tempCounter = parseInt(localStorage["counter"]);
            tempCounter--;
            // Een extra regel om te zorgen dat we niet onder de 0 kunnen tellen.
            if (tempCounter < 0) tempCounter = 0;
            localStorage["counter"] = tempCounter;
            document.getElementById("counter").innerHTML = localStorage["counter"];
        },
            
        reset: function() {
            localStorage["counter"] = 0;
            document.getElementById("counter").innerHTML = localStorage["counter"];
        }
    };
    
    // Start onze init functie zodra Cordova er klaar voor is
    document.addEventListener("deviceready", app.init, false);
    // Voorkom scrollen in het app venster
    document.addEventListener('touchmove',  function(e){ e.preventDefault(); }, false);
    
})();