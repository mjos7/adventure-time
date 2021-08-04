// var city = $("#location").text();
function initMap(restaurantLat, restaurantLon, eventLat, eventLon) {


  eventLat = parseFloat(eventLat);
  eventLon = parseFloat(eventLon);

  let centerLat = (restaurantLat + eventLat) / 2;
  let centerLon = (restaurantLon + eventLon) / 2;

  var center = { lat: centerLat, lng: centerLon };
  console.log()
  var locations = [
    [
      // `${restaurantName}<br>
      // ${restaurantAddress}<br>`,
      restaurantLat,
      restaurantLon,
    ],
    [
      // `${eventName}<br>
      //   ${eventAddress}<br>`,
      eventLat,
      eventLon,
    ]
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: center,
  });
  // var infowindow = new google.maps.InfoWindow({});
  var marker, count;

  for (count = 0; count < locations.length; count++) {
    marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(locations[count][0],locations[count][1]),
      // title: locations[count][0]
    });
    // google.maps.event.addListener(
    //   marker,
    //   'click',
    //   (function (marker, count) {
    //     return function () {
    //       infowindow.setContent(locations[count][0]);
    //       infowindow.open(map, marker);
    //     };
    //   })(marker, count)
    // );
    marker.setMap(map);
  }
}
