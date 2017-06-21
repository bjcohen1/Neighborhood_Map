var map;

var mapLocations = [
    {
     name:'Louisville Slugger Bat Factory',
     LatLng: {lat: 38.2570969, lng: -85.7449177},
     //description:'Sunday: + Monday:',
     venueID: '4b4261d2f964a520c3d225e3'
    },
    {
     name:'Churchill Downs Racetrack',
     LatLng: {lat: 38.2029725, lng: -85.772227},
     //description:'Test2',
     venueID: '4b0933a7f964a520b31423e3'
    },
    {
     name: 'Muhammad Ali Center',
     LatLng: {lat: 38.2582229, lng: -85.7620477},
     //description: 'Test3',
     venueID: '4b3134f0f964a5209b0225e3'
    },
    {
     name:'Louisville International Airport',
     LatLng: {lat: 38.175662, lng: -85.7391118},
     //description: 'Test4',
     venueID: '4b0363e8f964a5201f4f22e3'
    },
    {
     name:'Belle of Louisville',
     LatLng: {lat: 38.259186, lng: -85.7577707},
     //description: 'Test5',
     venueID: '4ba7d023f964a5208fb539e3'
    }
    ];

      function initMap() {
        // Constructor creates a new map - where in html to create the map and only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 38.2570969, lng: -85.7449177},
          zoom: 12
        });

        var toggle = document.getElementById('open-btn');
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(toggle);

        var i, marker, position, title, fourSquareUrl, infowindow;

        var clientID = "PJAU3L5FYIPZLSZ0O0IMNLPOMYCDFW3I5JPUKNUDI1TI3BIZ";
        var clientSecret = "D45X0FQUAR2ZXCOW2CSF1KZEZAZLW0NGOWLYTBQWBIFYQ4KX";
        var v = "20170619";
        var m = "foursquare";

        infowindow = new google.maps.InfoWindow();

        for (i = 0; i < mapLocations.length; i++) {
          position = new google.maps.LatLng(mapLocations[i].LatLng);
          title = mapLocations[i].name;

          marker = new google.maps.Marker({
            position : position,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP
          });

          mapLocations[i].marker = marker;

          fourSquareUrl = "https://api.foursquare.com/v2/venues/" + mapLocations[i].venueID + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=" + v + "&m=" + m;

          mapLocations[i].fourSquareUrl = fourSquareUrl;

        // Add a closure on the event listener to assign unique values to
        // each of the markers instead of the value of the last one falling through
        // Thanks to stack exchange for some help with the details!
        // https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
          google.maps.event.addListener(marker, 'click', clickMarker(marker, i))
          google.maps.event.addListener(infowindow, 'closeclick', showMarkers)
        };

        console.log(mapLocations[1].fourSquareUrl);

        google.maps.event.addDomListener(window, 'resize', function() {
          map.setCenter(map.center);
        });

        function clearMarkers() {
          for (var i = 0; i < mapLocations.length; i++) {
                mapLocations[i].marker.setVisible(false);
              }
        }

        function clickMarker(marker, i) {
          return function () {
            clearMarkers();
            infowindow.setContent(null);

            $.ajax({
              url: mapLocations[i].fourSquareUrl,
              success: function(data) {
                var venueData = data.response.venue;
                var name = venueData.name;
                var website = venueData.url;
                var telephone = venueData.contact.phone;
                var rating = venueData.rating;
                var fourSquareInfo = venueData.canonicalUrl + "?ref=" + clientID;
                contentData = "<div class = infowindow>Name: <a href =" + fourSquareInfo+ ">" + name + "</a><br> Website: <a href =" + website + ">" + website +
                "</a> <br> Phone Number: " + telephone + "<br> FourSquare Rating: " + rating +
                "<br> <img src = images/PBF300.png alt = Powered by FourSquare></div>"
                console.log(data.response);
                infowindow.setContent(contentData);
              },
              error: function(jqXHR, string) {
                infowindow.setContent("FourSquare Data Failed To Load, Sorry About That!");
              },
              timeout: 5000
            });

            marker.setVisible(true);
            infowindow.open(map, marker);
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }(marker, i)

        function showMarkers() {
          for (var i = 0; i < mapLocations.length; i++) {
            mapLocations[i].marker.setAnimation(null);
            mapLocations[i].marker.setVisible(true);
          }
        }

        //window.alert("Failed to load map. We'll do our best to get it up and running for you!")
        ko.applyBindings(new ViewModel());
    }