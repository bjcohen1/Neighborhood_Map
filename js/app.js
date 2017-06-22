var ViewModel = function() {
    var self = this;

    //save all of the locations as an observable array to allow for filtering
    this.locations = ko.observableArray(mapLocations);

    //opens an infowindow if a location name is clicked
    //as if the marker for the location was clicked
    this.clickedOn = function (location) {
        google.maps.event.trigger(location.marker, 'click');
    };

    //implement the filter functionality
    //use an internal knockout function, arrayFilter, to check
    //every element in the locations array against the search term
    //input by the user in the filter bar
    this.filter = ko.observable("");

    this.filteredItems = ko.computed(function() {
        var filter = self.filter().toLowerCase();
         //if there are no results to display in the filter observable, show all
            //the location names and all of the markers
        if (!filter) {
            for (i = 0; i < this.locations().length; i++) {
                this.locations()[i].marker.setVisible(true);
            }
            return self.locations();
        //if the user input matches the name of one or more locations,
        //only display those location names and markers on the map
        } else {
           return ko.utils.arrayFilter(self.locations(), function(item) {
                var results = item.name.toLowerCase().indexOf(filter) > -1;
                if (results === true) {
                    item.marker.setVisible(true);
                } else {
                    item.marker.setVisible(false);
                }
            return results;
            });
        }
    }, self);
};

function openFilter() {
    document.getElementById("locationsList").style.width = "100%";
}

function closeFilter() {
    document.getElementById("locationsList").style.width = "0%";
}
