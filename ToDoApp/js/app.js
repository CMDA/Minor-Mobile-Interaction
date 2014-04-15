/*jslint browser:true, devel:true*/
(function () {
	'use strict';
    
    // Het 'app' object doet nog niet zo veel nu, behalve dan de app starten
    var app = {
        init: function() {
            console.log("Init: db");
            // Voeg events toe aan knoppen
            document.getElementById("addtodo").addEventListener("submit", form.submitHandler);
            document.getElementById("clearbutton").addEventListener("click", form.clearHandler);
            // Open database
            storage.init();
            // Toon alle todo's die nu in database staan
            storage.getAll();
            // Verberg splashscreen
            navigator.splashscreen.hide();
        }
    };
    
    // Het 'form' object handelt alle formulier acties af + het tonen van resultaten
    var form = {
        submitHandler: function (e) {
            // e.target verwijst naar het formulier dat dit event heeft getriggerd (e.srcElement is voor Windows telefoons)
            var f = e.target || e.srcElement;
            // Maak een JavaScript Date object van de ingevulde datum
            var deadline = new Date(f.deadline.value);
            // Roep onze eigen storage.add() methode aan om de todo op te slaan
            storage.add(f.title.value, deadline);
            // Wis alle formuliervelden
            f.reset();
            // Voorkom dat de browser het formulier ook echt probeerd te versturen
            e.preventDefault();
        },
        
        clearHandler: function(e) {
            // Roep onze storage.clear() functie aan om de database te wissen
            storage.clearAll();
            // Maak een verwijzing naar onze <ol> tag
            var el = document.getElementById("list");
            // Wis de inhoud van de <ol> tag zodat de lijst weg is
            el.innerHTML = "";
            // De standaard actie van een <button> element is het formulier versturen, dit moeten we voorkomen:
            e.preventDefault();
        },
        
        displayResults: function(tx, rs) {
            // Maak een verwijzing naar onze <ol> tag
            var el = document.getElementById("list");
            // Maak een variabele aan waar we straks de HTML voor de lijst aan gaan toevoegen
            var output = "";
            // Loop door de collectie met resultaten uit de database (rs)
            for (var i=0; i < rs.rows.length; i++) {
               // Item is één rij uit de lijst met resultaten
               var item = rs.rows.item(i);
                // Dit is niet heel netjes om HTML code in je script op te nemen, maar het is hier wel even
                // een makkelijke manier. Voor elke rij in de lijst met resultaten maken we een nieuw item aan
                // in 
                output += "<li>"+item.title+" - "+item.deadline+"</li>";
            }
            // Als we klaar zijn met alle resultaten doorlopen, plakken we de resultaten in het <ol> element
            el.innerHTML = output;
        },
    };

    // Het 'storage' object 
    var storage = {
        // In deze variabele plaatsen we straks een verwijzing naar het database object
        db: null,

        init: function() {
          // Open een database. Als deze nog niet bestaat, wordt deze aangemaakt, anders alleen geopend
          // Parameters: database naam, versie (hou voorlopig op 1.), weergavenaam van database, grootte in bytes (hier 2MB)
          this.db = openDatabase('ToDoApp', '1.0', 'ToDo database', 2 * 1024 * 1024);
          console.log("Init: Open DB");
                
          // Alle SQL opdrachten zitten altijd in een transactie bij WebSQL, ook als dat niet echt nodig is
          this.db.transaction(function(tx) {
            // Hier voer je het SQL statement uit om de 'todo' tabel te maken als deze nog niet bestaat.
            // Als de app voor de eerste keer opstart is dat het geval, anders zou de tabel al moeten bestaan
            // Er zijn drie velden: ID (wordt automatisch gemaakt), titel en de deadline wanneer de todo moet zijn afgerond
            tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                          "todo(ID INTEGER PRIMARY KEY ASC, title TEXT, deadline DATETIME)");
            console.log("Init: Create table");
          });
        },

        add: function(title, deadline) {
          this.db.transaction(function(tx) {
            // Het toevoegen van een todo aan de lijst doen we met dit INSERT statement
            // De titel en de deadline worden toegevoegd op de plaats van de vraagtekens in het SQL statement
            // WebSQL zorgt zelf voor het voorkomen van SQL injectie
            tx.executeSql("INSERT INTO todo (title, deadline) VALUES (?,?)", [title, deadline]);
            console.log("Insert record");
          });
          // Nadat het ToDo item is opgeslagen, tonen we de lijst met ToDo items opnieuw
          this.getAll();
        },
        
        
        getAll: function() {
            this.db.transaction(function(tx) {
                // Hier selecteren we alle items in de todo tabel en geven deze door aan onze form.displayResults functie
                tx.executeSql("SELECT * FROM todo", [], form.displayResults);
            });
        },

        clearAll: function() {
            storage.db.transaction(function(tx) {
                // Wis alle items uit de todo tabel. form.clearHandler() heeft er al voor gezorgd dat ze niet meer in beeld zijn.
                tx.executeSql("DELETE FROM todo");
            });
        },

    };
  
    document.addEventListener("deviceready", app.init, false);
})();