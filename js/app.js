
var Location = function (data) {
    this.name = data.name;
    this.clickCount = ko.observable(data.clicks);

}

var ViewModel = function() {
    var self = this;

    this.locations = ko.observableArray([]);

    mapLocations.forEach(function(location) {
        self.locations.push( new Location(location) );
    });
};

ko.applyBindings(new ViewModel());