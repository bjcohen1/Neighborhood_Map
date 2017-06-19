
var Location = function (data) {
    this.name = ko.observable(data.name);
    this.marker = data.marker;
}

var ViewModel = function() {
    var self = this;

    this.locations = ko.observableArray(mapLocations);

    this.clickedOn = function (location) {
        google.maps.event.trigger(location.marker, 'click');
        console.log(this.marker);
    }

    this.filter = ko.observable("");

    this.filteredItems = ko.computed(function() {
        var filter = self.filter().toLowerCase();
        if (!filter) {
            return self.locations();
        } else {
           return ko.utils.arrayFilter(self.locations(), function(item) {
                return item.name().toLowerCase().indexOf(filter()) > -1;
            });
        }
    }, self);
}

ko.applyBindings(new ViewModel());
