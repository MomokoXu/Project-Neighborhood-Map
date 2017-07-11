var locations = [
  {title: "The Booksmith", lat: 37.7698021, lng: -122.4494117},
  {title: "Kepler's Books", lat: 37.453569, lng: -122.182167},
  {title: "Feldman's Books", lat: 37.454151, lng: -122.1838146},
  {title: "Bell's Books", lat: 37.44405680000001, lng: -122.1622352},
  {title: "B Street Books", lat: 37.565544, lng: -122.322034},
  {title: "Recycle Bookstore", lat: 37.331286, lng: -121.911065},
  {title: "Moe's Books", lat: 37.865464, lng: -122.258804},
  {title: "Builders Booksource", lat:  37.86948050000001, lng: -122.3003344},
  {title: "Mrs Dalloway's", lat: 37.8581708, lng: -122.25329},
  {title: "Aardvark Books", lat: 37.7670568, lng: -122.4285774},
  {title: "Green Apple Books", lat: 37.78304500000001, lng: -122.464715},
  {title: "City Lights Booksellers & Publishers", lat: 37.7976073, lng: -122.4065603},
  {title: "Browser Books", lat: 37.7896729, lng: -122.4342177},
];


var BookStore = function(data) {
  var self = this;
  self.title = data.title;
  self.lat = data.lat;
  self.lng = data.lng;

  // Style the markers a bit. This will be our listing marker icon.
  self.defaultIcon = makeMarkerIcon('0091ff');
  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  self.highlightedIcon = makeMarkerIcon('FFFF24');

  self.marker = new google.maps.Marker({
    position: {lat: self.lat, lng: self.lng},
    title: self.title,
    animation: google.maps.Animation.DROP,
    icon: self.defaultIcon,
  });

  self.largeInfowindow = new google.maps.InfoWindow();
  // Create an onclick event to open the large infowindow at each marker.
  self.marker.addListener('click', function() {
    populateInfoWindow(self.marker, self.largeInfowindow);
  });

  //self.placeDetailwindow = new google.maps.InfoWindow();

  // Two event listeners - one for mouseover, one for mouseout,
  // to change the colors back and forth.
  self.marker.addListener('mouseover', function() {
    self.marker.setIcon(self.highlightedIcon);
  });
  self.marker.addListener('mouseout', function() {
    self.marker.setIcon(self.defaultIcon);
  });
}


// List View

var ViewModel = function() {
  var self = this;
  self.stores = ko.observableArray([]);
  locations.forEach(function(store) {
    self.stores.push(new BookStore(store));
  });
  self.isVisible = ko.observable(true);
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

  self.toggleList = function() {
    self.isVisible(!self.isVisible());
  }

  self.clickItem = function(store) {
    self.hideMarkers();
    store.marker.setMap(map);
    store.marker.setAnimation(google.maps.Animation.BOUNCE);
    var bounds = map.getBounds();
    var placesService = new google.maps.places.PlacesService(map);
    placesService.textSearch({
      query: store.title,
      bounds: bounds
    }, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        getPlacesDetails(store.marker, store.largeInfowindow, results);
      }
    });
  }
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


/*
// Create a new blank array for all the listing markers.
var markers = [];
// Create placemarkers array to use in multiple functions to have control
// over the number of places that show.
var placeMarkers = [];
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.649307, lng: -122.262938},
    zoom: 11,
    disableDefaultUI: true,
    mapTypeControl: false
  });
  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  var locations = [
    {title: "Browser Books", location: {lat: 37.7896729, lng: -122.4342177}},
    {title: "The Booksmith", location: {lat: 37.7698021, lng: -122.4494117}},
    {title: "Kepler's Books", location: {lat: 37.453569, lng: -122.182167}},
    {title: "Feldman's Books", location: {lat: 37.454151, lng: -122.1838146}},
    {title: "Bell's Books", location: {lat: 37.44405680000001, lng: -122.1622352}},
    {title: "B Street Books", location: {lat: 37.565544, lng: -122.322034}},
    {title: "Recycle Bookstore", location: {lat: 37.331286, lng: -121.911065}},
    {title: "Moe's Books", location: {lat: 37.865464, lng: -122.258804}},
    {title: "Builders Booksource", location: {lat:  37.86948050000001, lng: -122.3003344}},
    {title: "Mrs Dalloway's", location: {lat: 37.8581708, lng: -122.25329}},
    {title: "Aardvark Books", location: {lat: 37.7670568, lng: -122.4285774}},
    {title: "Green Apple Books", location: {lat: 37.78304500000001, lng: -122.464715}},
    {title: "City Lights Booksellers & Publishers", location: {lat: 37.7976073, lng: -122.4065603}}
  ];
  var largeInfowindow = new google.maps.InfoWindow();

  // Style the markers a bit. This will be our listing marker icon.
  var defaultIcon = makeMarkerIcon('0091ff');
  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('FFFF24');
  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  }
  document.getElementById('show-listings').addEventListener('click', showListings);
  document.getElementById('hide-listings').addEventListener('click', function() {
    hideMarkers(markers);
  });
}


// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}
*/
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


// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    // Clear the infowindow content to give the streetview time to load.
    infowindow.setContent('');
    infowindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
    var streetViewService = new google.maps.StreetViewService();
    var radius = 50;
    // In case the status is OK, which means the pano was found, compute the
    // position of the streetview image, then calculate the heading, then get a
    // panorama from that and set the options
    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        var nearStreetViewLocation = data.location.latLng;
        var heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
          infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          };
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), panoramaOptions);
      } else {
        infowindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Street View Found</div>');
      }
    }
    // Use streetview service to get the closest streetview image within
    // 50 meters of the markers position
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);
  }
}


// This is the PLACE DETAILS search - it's the most detailed so it's only
// executed when a marker is selected, indicating the user wants more
// details about that place.
function getPlacesDetails(marker, infowindow, places) {
  var service = new google.maps.places.PlacesService(map);
  var placeID = places[0].place_id;
  service.getDetails({
    placeId: placeID
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Set the marker property on this infowindow so it isn't created again.
      infowindow.marker = marker;
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
      innerHTML += '</div>';
      infowindow.setContent(innerHTML);
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  });
}