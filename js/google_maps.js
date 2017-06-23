var map;

function mapFail() {
  window.alert("Google Maps Has Failed to Load.  Maybe Go Watch YouTube or SomeThing");
}

function initMap() {
  // Constructor creates a new map - at the html element with id = map and centered at given lat and lng.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.2570969, lng: -85.7449177},
    zoom: 12
  });

  //Draw the button to open the filter functionality on smaller screens
  var toggle = document.getElementById('open-btn');
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(toggle);

  //Initialize the variables for creating markers as well as using the FourSquare API
  var i, marker, position, title, fourSquareUrl, infowindow;

  var clientID = "PJAU3L5FYIPZLSZ0O0IMNLPOMYCDFW3I5JPUKNUDI1TI3BIZ";
  var clientSecret = "D45X0FQUAR2ZXCOW2CSF1KZEZAZLW0NGOWLYTBQWBIFYQ4KX";
  var v = "20170619";
  var m = "foursquare";

  infowindow = new google.maps.InfoWindow();

  //Create a marker for each location above and save the marker as a attribute of its place
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

    //Save the FourSquare API requset for each location as an attribute of the location
    fourSquareUrl = "https://api.foursquare.com/v2/venues/" + mapLocations[i].venueID + "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=" + v + "&m=" + m;

    mapLocations[i].fourSquareUrl = fourSquareUrl;

    // Add a closure on the event listener to assign unique values to
    // each of the markers instead of the value of the last one falling through
    // Thanks to stack exchange for some help with the details!
    // https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
    //Add listeners for when the markers are clicked and when infowindows are closed
    google.maps.event.addListener(marker, 'click', clickMarker(marker, i));
    google.maps.event.addListener(infowindow, 'closeclick', closeWindow(marker));
  }

  //Resize and recenter the map whenever it is resized
  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(map.center);
  });

  //Function to set infowindow content from the FourSquare API and open infowindows when clicked
  var venueData, name, website, telephone, rating, fourSquareInfo, previousMarker;

  function clickMarker(marker, i) {
    return function () {
     //Also need to provide for markers to stop bouncing in case a user clicks from marker to marker without
     //closing the infowindow explicitly
      if (previousMarker && previousMarker != marker) {
        previousMarker.setAnimation(null);
      } else {
        previousMarker = marker;
      }

      infowindow.setContent(null);

      $.ajax({
        url: mapLocations[i].fourSquareUrl,
        success: function(data) {
          venueData = data.response.venue;

          name = venueData.name || 'No name accesible';
          website = venueData.url || 'No website retrieved';
          telephone = venueData.contact.phone || 'No phone data available';
          rating = venueData.rating || 'No rating info provided';

          fourSquareInfo = venueData.canonicalUrl + "?ref=" + clientID || 'Error finding url';
          contentData = ("<div class = infowindow>Name: <a href =" + fourSquareInfo+ ">" + name + "</a><br> Website: <a href =" + website + ">" + website +
          "</a> <br> Phone Number: " + telephone + "<br> FourSquare Rating: " + rating +
          "<br> <img src = images/PBF300.png alt = Powered by FourSquare></div>");

          infowindow.setContent(contentData);
        },
        error: function(jqXHR, string) {
          infowindow.setContent("FourSquare Data Failed To Load, Sorry About That!");
        },
        timeout: 5000
      });

      marker.setAnimation(google.maps.Animation.BOUNCE);
      infowindow.open(map, marker);
      previousMarker =  marker;
    };
  } (marker, i);

  function closeWindow (marker) {
    return function () {
      marker.setAnimation(null);
    };
  } (marker);

  ko.applyBindings(new ViewModel());
}