
// var city = $("#location").text();
function initMap(restaurantLat,restaurantLon, eventLat, eventLon) {
  let centerLat = (restaurantLat + eventLat) / 2;
  let centerLon = (restaurantLon + eventLon) / 2;

  var center = { lat: centerLat, lng: centerLon };
  var locations = [
    [
      `${restaurantName}<br>
      ${restaurantAddress}<br>
     <a href="${restaurantLink}">Get Directions</a>`,
      restaurantLat,
      restaurantLon,
    ],
    [
      `${eventName}<br>
        ${eventAddress}<br>
       <a href="${eventLink}">Get Directions</a>`,
      eventLat,
      eventLon,
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
