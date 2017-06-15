var map;
      function initMap() {
        // Constructor creates a new map - where in html to create the map and only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 13
        });
        //create a pointer on the map to a specific place
        var tribeca = {lat: 40.719526, lng: -73.9980244};
        //use marker to show the listing
        var marker = new google.maps.Marker({
          position : tribeca,
          map: map,
          //what to display when hover over the marker, many other things to when hover over marker!
          title: 'First Marker!'
        });
        var infowindow = new google.maps.InfoWindow({
          content: 'Text for the InfoWindow, this can be string or a predefined string of elements!'
        });
        marker.addListener('click', function(){
          infowindow.open(map, marker);
        //if dont give a marker, need to give position property so the window has a place to open
        });
      }