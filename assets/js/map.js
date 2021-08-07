'use strict';

var eventObj = {};
var restaurantObj = {};

var makeRestaurantObj = function (randomPlace, restaurant) {
  restaurantObj = {
    name: randomPlace.name,
    address: randomPlace.vicinity,
    // URL: randomPlace.fields.url,
    lat: parseFloat(restaurant.lat),
    lon: parseFloat(restaurant.long),
  };
  // Return it
  return restaurantObj;
};

var makeEventObj = function (name, address, url, lat, lon) {
  eventObj = {
    name: name,
    address: address,
    url: url,
    lat: parseFloat(lat),
    lon: parseFloat(lon),
  };

  return eventObj;
};

function initMap() {
  var centerLat = (restaurantObj.lat + eventObj.lat) / 2;
  var centerLon = (restaurantObj.lon + eventObj.lon) / 2;
  var center = { lat: centerLat, lng: centerLon };
  var locations = [
    [
      `${restaurantObj.name}<br>
      ${restaurantObj.address}<br>
     <a href="${restaurantObj.url}">Get Directions</a>`,
      restaurantObj.lat,
      restaurantObj.lon,
    ],
    [
      `${eventObj.name}<br>
        ${eventObj.address}<br>
       <a href="${eventObj.url}">Get Directions</a>`,
      eventObj.lat,
      eventObj.lon,
    ],
  ];
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: center,
  });
  var infowindow = new google.maps.InfoWindow({});
  var marker, count;
  for (count = 0; count < locations.length; count++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        locations[count][1],
        locations[count][2]
      ),
      map: map,
      title: locations[count][0],
    });
    google.maps.event.addListener(
      marker,
      'click',
      (function (marker, count) {
        return function () {
          infowindow.setContent(locations[count][0]);
          infowindow.open(map, marker);
        };
      })(marker, count)
    );
  }
}
