var marker_locations = [
        {
            name:
            clicks:
        },
        {
            name:
            clicks:
        },
        {
            name:
            clicks:
        },
        {
            name:
            clicks:
        },
        {
            name:
            clicks:
        }
        ]

var Location = function(data) {
    var self = this

    this.name = ko.observable(data.name);
    this.clickCount = ko.observable(data.clicks);

}

var ViewModel = function() {
    this.locations = ko.observableArray([]);

    locations.foreach(function(location_entry) {
        self.locations.push( new Location(location_entry) );
    });
}

ko.applyBindings(new ViewModel());