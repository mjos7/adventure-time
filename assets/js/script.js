var map;
var service;
var restaurantEl  = document.getElementById("restaurant-name");
var restAddrEl = document.getElementById("restaurant-addr");
var restaurantImageEl = document.getElementById("restaurant-photo");
var restaurantRatingEl = document.getElementById("restaurant-rating");

function search(lat, lng) {
    var searchLocation = new google.maps.LatLng(lat, lng);

    map = new google.maps.Map(document.getElementById('map'));

    var request = {
        location: searchLocation,
        radius: '8000',
        type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

// chooses a random restaurant from the array returned
function callback(results, status) {
    console.log(results)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var index = Math.floor(Math.random() * results.length);
        
        var randomPlace = results[index];
        console.log(randomPlace);

        // Checks business is open
        if (randomPlace.business_status === "OPERATIONAL"){
            createMarker(randomPlace);
            loadInfo(randomPlace);
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
        fields: ['url', 'opening_hours', 'website', 'formatted_phone_number', 'price_level']
    };

    service.getDetails(urlRequest, moreDetails);

    restaurantEl.textContent = place.name;
    restAddrEl.textContent = place.vicinity;
    var imgSrc = place.photos[0].getUrl();
    restaurantImageEl.setAttribute("src", imgSrc);
    var rating = place.rating;

    restaurantRatingEl.innerHTML = rating + " <i class='fas fa-star'></i>";
}

// returns object with phone number, website and price level
function moreDetails(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(place);
      // display data on screen
    }
  }

// Shows location on interactive map
function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
    map = new google.maps.Map(document.getElementById('map'), {
        center: place.geometry.location,
        zoom: 15
    });
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  }

// search for restaurant using event coordinates
search(53.33169309496362, -6.274566650390625);
