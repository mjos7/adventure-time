let restaurantName = "Ruths' Chris Steak house";
let restaurantAddress = '13455 Maxella Ave #230, Marina Del ray, CA 90292';
let restaurantLink = `https://www.google.com/maps/place/Ruth's+Chris+Steak+House/@33.9866414,-118.444276,17z/data=!3m2!4b1!5s0x80c2ba87c55c1d8f:0x7edf0a3aebeb1140!4m5!3m4!1s0x80c2ba86349ecb83:0x27634e3d86541933!8m2!3d33.986637!4d-118.4420873`;
let restaurantLat = 33.985981;
let restaurantLon = -118.442772;

let eventName = 'Treehouse Rooftop Lounge';
let eventAddress = '686 North Spring Street Los Angeles, CA 90012';
let eventLink = `https://www.google.com/maps/place/Treehouse/@34.05955,-118.2399147,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2c65b29455ad9:0x100690ebd8e3e872!8m2!3d34.0596031!4d-118.2378731`;
let eventLat = 34.05953;
let eventLon = -118.23772;

let centerLat = (restaurantLat + eventLat) / 2;
let centerLon = (restaurantLon + eventLon) / 2;

function initMap() {
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
