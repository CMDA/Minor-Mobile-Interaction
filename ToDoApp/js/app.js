/*jslint browser:true, devel:true*/
(function () {
	'use strict';
    
    var app = {
        init: function() {
            console.log("Init: db");
            storage.init();
            document.getElementById("addtodo").addEventListener("submit", form.submitHandler);
            document.getElementById("clearbutton").addEventListener("click", form.clearHandler);
            storage.getAll();
            navigator.splashscreen.hide();
        }
    };
    
    var form = {
        submitHandler: function (e) {
            var f = document.getElementById("addtodo"); 
            var deadline = new Date(f.deadline.value);
            storage.add(f.todo.value, deadline);
            f.reset();
            e.preventDefault();
        },
        
        clearHandler: function(e) {
            storage.clearAll();
            var el = document.getElementById("list");
            el.innerHTML = "";
            e.preventDefault();
        },
        
        displayResults: function(tx, rs) {
            var el = document.getElementById("list");
            var output = "";
           for (var i=0; i < rs.rows.length; i++) {
               var item = rs.rows.item(i);
                output += "<li>"+item.todo+" - "+item.deadline+"</li>";
            }
            el.innerHTML = output;
        },
    };

    var storage = {
        db: null,

        init: function() {
          // DbName, Version, Displayname, Size in bytes
          this.db = openDatabase('ToDoApp', '1.0', 'ToDo database', 2 * 1024 * 1024);
          console.log("Init: Open DB");

          this.db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                          "todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, deadline DATETIME)", []);
            console.log("Init: Create table");
          });
        },

        add: function(todo, deadline) {
          this.db.transaction(function(tx) {
            tx.executeSql("INSERT INTO todo (todo, deadline) VALUES (?,?)", [todo, deadline]);
            console.log("Insert record");
          });
          this.getAll();
        },
        
        
        getAll: function() {
            this.db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM todo", [], form.displayResults, storage.onError);
            });
        },

        clearAll: function() {
            storage.db.transaction(function(tx) {
                tx.executeSql("DELETE FROM todo", []);
            });
        },
        
        onError: function(tx, e) {
            console.log("There has been an error: " + e.message);
        },

    };
  
    document.addEventListener("deviceready", app.init, false);
})();