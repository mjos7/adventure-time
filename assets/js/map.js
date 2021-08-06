'use strict'

var eventObj = {};
var restaurantObj = {};

var makeRestaurantObj = function (randomPlace, restaurant) {
  restaurantObj = {
    name:  randomPlace.name,
    address: randomPlace.vicinity,
    // URL: randomPlace.fields.url,
    lat: restaurant.lat,
    lon: restaurant.long,
  };
  // Return it
  console.log(restaurantObj);
  return restaurantObj;
}

var makeEventObj = function (name, address, url, lat, lon) {
  eventObj = {
    name:  name,
    address: address,
    URL: url,
    lat: lat,
    lon: lon,
  };
  // Return it
  console.log(eventObj);
  return eventObj;
}




var centerLat = (restaurantObj.lat + eventObj.lat) / 2;
var centerLon = (restaurantObj.lon + eventObj.lon) / 2;

function initMap() {
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
    zoom: 12,
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


