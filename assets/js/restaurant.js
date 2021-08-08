var service;
var eventLoc;
var restaurantEl = document.getElementById('restaurant-title');
var restAddrEl = document.getElementById('restaurant-addr');
var restaurantImageEl = document.getElementById('restaurant-image');
var restaurantRatingEl = document.getElementById('restaurant-rating');
var phoneNumEl = document.getElementById('phone-num');
var restaurantLinkEl = document.getElementById('restaurant-link');

function search(lat, lng) {
  eventLoc = { lat: lat, long: lng };
  var searchLocation = new google.maps.LatLng(lat, lng);

  map = new google.maps.Map(document.getElementById('map'));

  var request = {
    location: searchLocation,
    radius: '10000',
    type: ['restaurant'],
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

// chooses a random restaurant from the array returned
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var index = Math.floor(Math.random() * results.length);
    var randomPlace = results[index];

    // Checks business is open
    if (randomPlace.business_status === 'OPERATIONAL') {
      // Check if above 4 stars
      if (randomPlace.rating >= 4) {
        // createMarker(randomPlace);
        restaurant = {
          lat: randomPlace.geometry.location.lat(),
          long: randomPlace.geometry.location.lng(),
        };
        makeRestaurantObj(randomPlace, restaurant);
        // initMap(eventObj, restaurantObj);
        initMap(restaurant.lat, restaurant.long, eventLoc.lat, eventLoc.long);
        loadInfo(randomPlace);
      } else {
        callback(results, status);
      }
    } else {
      // There was a problem getting data
    }
  }
}

// Displays data to page
function loadInfo(place) {
  var urlRequest = {
    placeId: place.place_id,
    fields: [
      'url',
      'opening_hours',
      'website',
      'formatted_phone_number',
      'price_level',
    ],
  };

  service.getDetails(urlRequest, moreDetails);

  restaurantEl.textContent = place.name;
  restAddrEl.textContent = place.vicinity;
  var imgSrc = place.photos[0].getUrl();
  restaurantImageEl.setAttribute('src', imgSrc);
  var rating = place.rating;

  restaurantRatingEl.textContent = rating;
}

// returns object with phone number, website and price level
function moreDetails(place, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    // display data on screen
    phoneNumEl.textContent = place.formatted_phone_number;
    restaurantLinkEl.setAttribute('href', place.url);
  }
}
