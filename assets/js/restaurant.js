// RESTAURANT VARIABLES
let restaurantName = "Ruths' Chris Steak house";
let restaurantAddress = '13455 Maxella Ave #230, Marina Del ray, CA 90292';
let restaurantLink = `https://www.google.com/maps/place/Ruth's+Chris+Steak+House/@33.9866414,-118.444276,17z/data=!3m2!4b1!5s0x80c2ba87c55c1d8f:0x7edf0a3aebeb1140!4m5!3m4!1s0x80c2ba86349ecb83:0x27634e3d86541933!8m2!3d33.986637!4d-118.4420873`;
let restaurantLat = 33.985981;
let restaurantLon = -118.442772;
var map;
var service;
var restaurant;
var restaurantEl = document.getElementById('restaurant-title');
var restAddrEl = document.getElementById('restaurant-addr');
var restaurantImageEl = document.getElementById('restaurant-image');
var restaurantRatingEl = document.getElementById('restaurant-rating');
var phoneNumEl = document.getElementById('phone-num');

function getPlace(){
    console.log("place sent")
    return restaurant;
}

async function setplace(place){
    console.log("place set")
    restaurant = await place;
}

function search(lat, lng) {
    
  var searchLocation = new google.maps.LatLng(lat, lng);

  map = new google.maps.Map(document.getElementById('map'));

  var request = {
    location: searchLocation,
    radius: '8000',
    type: ['restaurant'],
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

// chooses a random restaurant from the array returned
async function callback(results, status) {
    console.log("restaurant results recieved");
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var index = Math.floor(Math.random() * results.length);

    var randomPlace = results[index];

    // Checks business is open
    if (randomPlace.business_status === 'OPERATIONAL') {
    //   createMarker(randomPlace);
      loadInfo(randomPlace);
      setplace({lat: randomPlace.geometry.location.lat(), long: randomPlace.geometry.location.lat()});
    } else {
      callback(results, status);
    }
  } else {
    // There was a problem getting data
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
  }
}

// Shows location on interactive map
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;
  map = new google.maps.Map(document.getElementById('map'), {
    center: place.geometry.location,
    zoom: 15,
  });
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
}

// search for restaurant using event coordinates
