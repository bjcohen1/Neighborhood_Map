var map;

var mapLocations = [
    {
     name:'Louisville Slugger Bat Factory',
     LatLng: {lat: 38.2570969, lng: -85.7449177},
     description:'Test1',
     locationID: '4b4261d2f964a520c3d225e3'
    },
    {
     name:'Churchill Downs Racetrack',
     LatLng: {lat: 38.2029725, lng: -85.772227},
     description:'Test2',
     locationID: '4b0933a7f964a520b31423e3'
    },
    {name: 'Muhammad Ali Center',
     LatLng: {lat: 38.2582229, lng: -85.7620477},
     description: 'Test3',
     locationID: '4b3134f0f964a5209b0225e3'
    },
    {
      name:'Louisville International Airport',
      LatLng: {lat: 38.175662, lng: -85.7391118},
      description: 'Test4',
      locationID: '4b0363e8f964a5201f4f22e3'
    },
    {
      name:'Belle of Louisville',
      LatLng: {lat: 38.259186, lng: -85.7577707},
      description: 'Test5',
      locationID: '4ba7d023f964a5208fb539e3'
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

        var markerSet = [];

        for (i = 0; i < mapLocations.length; i++) {
          var position = new google.maps.LatLng(mapLocations[i].LatLng);
          var title = mapLocations[i].name;

          marker = new google.maps.Marker({
            position : position,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP
          });

          markerSet.push(marker);
          mapLocations[i].marker = markerSet[i];

        // Add a closure on the event listener to assign unique values to
        // each of the markers instead of the value of the last one falling through
        // Thanks to stack exchange for some help with the details!
        // https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
          google.maps.event.addListener(marker, 'click', clickMarker(marker, i))
          google.maps.event.addListener(infowindow, 'closeclick', showMarkers)
        };

        function clearMarkers() {
          for (var i = 0; i < mapLocations.length; i++) {
                mapLocations[i].marker.setVisible(false);
              }
        }

        function clickMarker(marker, i) {
          return function () {
              clearMarkers();
              mapLocations[i].marker.setVisible(true);
              infowindow.setContent(mapLocations[i].description);
              infowindow.open(map, marker);
              // this line will change color and style of marker when clicked, need to add function to
              // keep track of when a specific icon is clicked or not clicked
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          }(marker, i)

        function showMarkers() {
          for (var i = 0; i < mapLocations.length; i++) {
            mapLocations[i].marker.setAnimation(null);
            mapLocations[i].marker.setVisible(true);
          }
        }

        function loadFourSquare() {
          var clientID = "PJAU3L5FYIPZLSZ0O0IMD45X0FQUAR2ZXCOW2CSF1KZEZAZLW0NGOWLYTBQWBIFYQ4KXNLPOMYCDFW3I5JPUKNUDI1TI3BIZ";
          var clientSecret = "D45X0FQUAR2ZXCOW2CSF1KZEZAZLW0NGOWLYTBQWBIFYQ4KX";
          var v = "20170619";
          var m = "foursquare";

          for (i = 0; i < mapLocations.length; i++) {
            var fourSquareUrl = "https://api.foursquare.com/v2/venues/" +
            mapLocations[i].venueID + "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&v=" + v;
        }
        }
        ko.applyBindings(new ViewModel());
    }