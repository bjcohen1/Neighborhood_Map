# Neighborhood_Map
README for Neighborhood Map Project for Udacity Full Stack Web Developer Nanodegree

The follow app is a responsive single page map application that utilizes the Google Maps JS API
as well as the FourSquare API to display and provide information about 5 places to
see in and around Louisville, KY.

The app contains 1 html file, index.html, and 2 javascript files. One of the javascript
files contains all of the information for generating the map and the views using
the Google Maps API.  This file also incorporates all calls to the FourSquare API
in the process of populating Google Maps infowindows.

The app also contains a css folder with styling for the app as well as an images folder
containing the "powered by FourSqaure image".

To run the app the user can download the entire repository and open the index.html file.

Once the app is open the user can click on any of the markers to view more information
or click on any of the place names in the filter sidebar to open the infowindow on
the associated marker and view more information about the place.  The highlighted
marker will also begin bouncing.

Upon closing the infowindow all of the location markers will reappear.

The sidebar also contains filter functionality and allows the user to search for specific
text strings within the locations.  The results are filtered after every keystroke
and the markers on the map are updated to reflect the current search set.  If the user
clicks on one of the filtered results, only that marker will display on the map
and will bounce.
