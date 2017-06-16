
var Location = function (data) {
    this.name = data.name;
    this.marker = data.marker;
}

var ViewModel = function() {
    var self = this;

    this.locations = ko.observableArray([]);

    mapLocations.forEach(function(location) {
        self.locations.push( new Location(location) );
    });

    self.clickedName = function () {
        console.log(this.marker);
    }
};

ko.applyBindings(new ViewModel());