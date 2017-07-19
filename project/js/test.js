var map;

// Location data
var locations = [
  {title: "The Booksmith", lat: 37.7698021, lng: -122.4494117, wiki:[""]},
  {title: "Kepler's Books", lat: 37.453569, lng: -122.182167, wiki:[""]},
  {title: "Feldman's Books", lat: 37.454151, lng: -122.1838146, wiki:[""]},
  {title: "Bell's Books", lat: 37.44405680000001, lng: -122.1622352, wiki:[""]},
  {title: "B Street Books", lat: 37.565544, lng: -122.322034, wiki:[""]},
  {title: "Recycle Bookstore", lat: 37.331286, lng: -121.911065, wiki:[""]},
  {title: "Moe's Books", lat: 37.865464, lng: -122.258804, wiki:[""]},
  {title: "Builders Booksource", lat:  37.86948050000001, lng: -122.3003344, wiki:[""]},
  {title: "Mrs Dalloway's", lat: 37.8581708, lng: -122.25329, wiki:[""]},
  {title: "Aardvark Books", lat: 37.7670568, lng: -122.4285774, wiki:[""]},
  {title: "Green Apple Books", lat: 37.78304500000001, lng: -122.464715, wiki:[""]},
  {title: "City Lights Booksellers & Publishers", lat: 37.7976073, lng: -122.4065603, wiki:[""]},
  {title: "Browser Books", lat: 37.7896729, lng: -122.4342177, wiki:[""]},
  {title: "Omnivore Books on Food", lat: 37.7476028, lng:-122.42667349999999, wiki:[""]},
  {title: "Alley Cat Bookstore and Gallery ", lat: 37.752764, lng: -122.41270700000001, wiki:[""]},
  {title: "Dog Eared Books", lat: 37.758404, lng: -122.42150049999998, wiki:[""]},
  {title: "ARKIPELAGO Books The Filipino Bookstore", lat: 37.780847, lng: -122.40927199999999, wiki:[""]},
  {title: "Adobe Books & Arts Cooperative", lat:37.7526611 , lng: -122.4148131, wiki:[""]},
  {title: "Bound Together Bookstore", lat: 37.7653663, lng:-122.46659979999998 , wiki:[""]},
  {title: "Kinokuniya San Francisco ", lat: 37.785046, lng:-122.43209300000001 , wiki:[""]},
];

// Model
function Bookstore(data) {
  var self = this;
  self.title = data.title;
  self.lat = data.lat;
  self.lng = data.lng;
  self.wiki = data.wiki;

  // Style the markers a bit. This will be our listing marker icon.
  self.defaultIcon = makeMarkerIcon('64d6d1');
  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  self.highlightedIcon = makeMarkerIcon('dbf976');

  // store marker
  self.marker = new google.maps.Marker({
    position: {lat: self.lat, lng: self.lng},
    title: self.title,
    animation: google.maps.Animation.DROP,
    icon: self.defaultIcon,
  });

  // store infowindow
  self.largeInfowindow = new google.maps.InfoWindow();
  self.showInfoWindow = function() {
    if (!self.largeInfowindow.getContent()) {
      var bounds = map.getBounds();
      var placesService = new google.maps.places.PlacesService(map);
      placesService.textSearch({
        query: self.title,
        bounds: bounds
      }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var service = new google.maps.places.PlacesService(map);
          service.getDetails({
            placeId: results[0].place_id
          }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              var innerHTML = '<div>';
              if (place.name) {
                innerHTML += '<strong>' + place.name + '</strong>';
              }
              if (place.formatted_address) {
                innerHTML += '<br>' + place.formatted_address;
              }
              if (place.formatted_phone_number) {
                innerHTML += '<br>' + place.formatted_phone_number;
              }
              if (place.opening_hours) {
                innerHTML += '<br><br><strong>Hours:</strong><br>' +
                    place.opening_hours.weekday_text[0] + '<br>' +
                    place.opening_hours.weekday_text[1] + '<br>' +
                    place.opening_hours.weekday_text[2] + '<br>' +
                    place.opening_hours.weekday_text[3] + '<br>' +
                    place.opening_hours.weekday_text[4] + '<br>' +
                    place.opening_hours.weekday_text[5] + '<br>' +
                    place.opening_hours.weekday_text[6];
              }
              if (place.photos) {
                innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                    {maxHeight: 100, maxWidth: 200}) + '">';
              }
              innerHTML += '</div><br><br>' + '<div>Wiki</div>';

              if (self.wiki.length !== 0) {
                var url = 'https://en.wikipedia.org/wiki/' + self.wiki;
                innerHTML += '<li><a href="' + url + '">' + self.wiki
                                      + '</a></li>';
              } else {
                innerHTML += '<div>No related Wiki</div>'
              }

              console.log(self.wiki);
              self.largeInfowindow.setContent(innerHTML);
            }
          });
        }
      });
    }
    self.largeInfowindow.open(map, self.marker);
  }

  // store object status enable and disable:
  // make sure only one store is active at one time
  self.enable = function() {
    // If current active store is not self, disable it first
    if (Bookstore.prototype.enable && Bookstore.prototype.enable !== self) {
      Bookstore.prototype.enable.disable();
    }
    // set current active store to be self
    Bookstore.prototype.enable = self;
    // center and accent current store and show its infowindow
    self.marker.setMap(map);
    map.panTo({lat: self.lat, lng: self.lng});
    self.marker.setAnimation(google.maps.Animation.BOUNCE);
    self.marker.setIcon(self.highlightedIcon);
    self.showInfoWindow();
  }
  self.disable = function() {
    Bookstore.prototype.enable = null;
    self.marker.setAnimation(null);
    self.marker.setIcon(self.defaultIcon);
    self.largeInfowindow.close()
  }

  // Twp event listeners- one for open infowindow, one for close
  self.marker.addListener('click', function() {
    if (Bookstore.prototype.enable === self) {
      self.disable();
    } else {
      self.enable();
    }
  });
  self.marker.addListener('closeclick', function() {
    self.disable();
  });

  // Two event listeners - one for mouseover, one for mouseout,
  // to change the colors back and forth.
  self.marker.addListener('mouseover', function() {
    self.marker.setIcon(self.highlightedIcon);
  });
  self.marker.addListener('mouseout', function() {
    self.marker.setIcon(self.defaultIcon);
  });

  // Event for close infowindow
  self.largeInfowindow.addListener('closeclick', function() {
    self.disable();
  });
}
// Globel variable to record current active store object
Bookstore.prototype.enable = null;


// List View
var ViewModel = function() {
  var self = this;
  self.stores = ko.observableArray([]);

  // update stores with asyn wiki info
  locations.forEach(function(store) {
      var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
                    + store.title + '&format=json&callback=wikiCallback';
      // ajax request object
      $.ajax({
          url: wikiUrl,
          // set datatype indicating this is a jsonp request
          dataType: "jsonp",
          // jsonp: "callback",
          success: function(response) {
              store.wiki = response[1];
              console.log(store.wiki);
              self.stores.push(new Bookstore(store));
          }
      });
  });

  self.filter = ko.observable('');


  // This function will loop through the markers array and display them all.
  self.showListings = function() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    self.stores().forEach(function(store) {
      store.marker.setMap(map);
      bounds.extend(store.marker.position);
    });
    map.fitBounds(bounds);
  };

  // This function will loop through the listings and hide them all.
  self.hideMarkers = function() {
    self.stores().forEach(function(store) {
      store.marker.setMap(null);
    });
  };

  self.filteredResults = ko.computed(function() {
    var lists = [];
    var reg = new RegExp(self.filter(), 'i');

    self.stores().forEach(function(store) {
      if (store.title.search(reg) !== -1) {
        lists.push(store);
        store.marker.setVisible(true);
      } else {
        store.marker.setVisible(false);
      }
    });
    return lists;
  });

  self.clickItem = function(store) {
    store.enable();
  }

  var directionsDisplay = new google.maps.DirectionsRenderer();
  self.getDirections = function() {
    var directionsService = new google.maps.DirectionsService;
    var originAddress = document.getElementById('start').value;
    var destinationAddress = document.getElementById('end').value;
    var mode = document.getElementById('mode').value;
    var storeExist = ko.computed(function() {
      var ex = false;
      self.stores().forEach(function(store) {
        var reg = new RegExp(destinationAddress, 'i');
        if (store.title.search(reg) !== -1 || store.title.search(destinationAddress) !== -1) {
          ex = true;
        };
      });
      return ex;
    });
    if (storeExist() === true) {
      directionsService.route({
        // The origin is the passed in marker's position.
        origin: originAddress,
        // The destination is user entered address.
        destination: destinationAddress,
        travelMode: google.maps.TravelMode[mode]
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setMap(map);
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    } else {
        window.alert('No such bookstore in suggested list');
    }
  }
  self.reset = function() {
    window.location.reload();
  };
}


function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.649307, lng: -122.262938},
    zoom: 11,
    disableDefaultUI: true,
    mapTypeControl: false
  });

  ko.applyBindings(new ViewModel());
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}