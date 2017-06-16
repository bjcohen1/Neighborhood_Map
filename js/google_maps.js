var map;

var mapLocations = [
    {
     name:'Louisville Slugger Bat Factory',
     LatLng: {lat: 38.2570969, lng: -85.7449177},
     description:'Test1',
    },
    {
     name:'Churchill Downs Racetrack',
     LatLng: {lat: 38.2029725, lng: -85.772227},
     description:'Test2',
    },
    {name: 'Muhammad Ali Center',
     LatLng: {lat: 38.2582229, lng: -85.7620477},
     description: 'Test3',
    },
    {
      name:'Louisville International Airport',
      LatLng: {lat: 38.175662, lng: -85.7391118},
      description: 'Test4',
    },
    {
      name:'Belle of Louisville',
      LatLng: {lat: 38.259186, lng: -85.7577707},
      description: 'Test5',
    }
    ];

      function initMap() {
        // Constructor creates a new map - where in html to create the map and only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 38.2570969, lng: -85.7449177},
          zoom: 12
        });

        //use marker to show the listing

        var infowindow = new google.maps.InfoWindow();
        var i, marker;

        var highlightedIcon = makeMarkerIcon('FFFF24');

        for (i = 0; i < mapLocations.length; i++) {
          var position = new google.maps.LatLng(mapLocations[i].LatLng);
          var title = mapLocations[i].name;

          marker = new google.maps.Marker({
            position : position,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP
          });

          mapLocations[i].marker = marker;

        // Add a closure on the event listener to assign unique values to
        // each of the markers instead of the value of the last one falling through
        // Thanks to stack exchange for some help with the details!
        // https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
          google.maps.event.addListener(marker, 'click', clickMarker(marker, i))
        };

        function clickMarker(marker, i) {
          return function () {
              infowindow.setContent(mapLocations[i].description);
              infowindow.open(map, marker);
              // this line will change color and style of marker when clicked, need to add function to
              // keep track of when a specific icon is clicked or not clicked
              this.setIcon(highlightedIcon);
            }
          }(marker, i)



        function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
    }