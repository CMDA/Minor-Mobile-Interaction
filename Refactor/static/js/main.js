//self-invoking anonymous function
(function(){
  var pictureSource,   // picture source
      destinationType; // sets the format of returned value 

  // Initialize app with an controller object literal
  var app = {
    // init method, Cordova is ready to be used
    init: function () {
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;

      this.events();
    },

    events: function () {
      var self = this;
      
      document.querySelector('.capture').addEventListener("click",camera.capture,false);
      document.querySelector('.edit').addEventListener("click",camera.edit,false);
      document.querySelector('.library').addEventListener("click",camera.library,false);
      document.querySelector('.album').addEventListener("click",camera.album,false);

      window.setTimeout(function(){
        self.doStuff();
      }, 1000)
    },

    doStuff: function () {

    }
  }  
  
  var camera = {
    capture: function (data) {
      // Get image handle
      var thumbnail = document.getElementById('thumbnail');

      // Unhide image elements
      thumbnail.addClass('show');

      // Show the captured photo
      thumbnail.src = "data:image/jpeg;base64," + data;
    },
    URI: function () {

    },
    edit: function () {

    },
    getPhoto: function () {

    }
  }

  var debug = {
    fail: function (message) {
      alert('Failed because: ' + message);
    }
  }

  // Wait for Cordova to connect with the device
  document.addEventListener("deviceready",app.init,false);

})();