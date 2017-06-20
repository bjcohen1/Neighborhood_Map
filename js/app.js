
/*var Location = function (data) {
    this.name = ko.observable(data.name);
    this.marker = data.marker;
}*/

var ViewModel = function() {
    var self = this;

    this.locations = ko.observableArray(mapLocations);

    this.clickedOn = function (location) {
        google.maps.event.trigger(location.marker, 'click');
    }

    this.filter = ko.observable("");

    this.filteredItems = ko.computed(function() {
        var filter = self.filter().toLowerCase();
        if (!filter) {
            for (i = 0; i < this.locations().length; i++) {
                this.locations()[i].marker.setVisible(true);
            }
            return self.locations();
        } else {
           return ko.utils.arrayFilter(self.locations(), function(item) {
                var results = item.name.toLowerCase().indexOf(filter) > -1;
                if (results == true) {
                    item.marker.setVisible(true);
                } else {
                    item.marker.setVisible(false);
                }
            return results
            });
        }
    }, self);
}

