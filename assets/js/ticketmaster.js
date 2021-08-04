// EVENT VARIABLES
let eventName = 'Treehouse Rooftop Lounge';
let eventAddress = '686 North Spring Street Los Angeles, CA 90012';
let eventLink = `https://www.google.com/maps/place/Treehouse/@34.05955,-118.2399147,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2c65b29455ad9:0x100690ebd8e3e872!8m2!3d34.0596031!4d-118.2378731`;
let eventLat = 34.05953;
let eventLon = -118.23772;
var ticketmasterData = {};
var date = document.getElementById('date');
var outdoorChoice = [];
var indorChoice = [];
var ticketmasterData = {};

// these will include the indoor or outdoor choice in the value of the keyword i.e: music, sports, theater and more.
var eventsCategory = ['comedy', 'theater', 'concert', 'sports', 'festival'];

function eventChoice(events) {
  let choice;

  var randomEvent = Math.floor(Math.random() * events.length);
  choice = events[randomEvent];

  return choice;
}

// on click search fetces data. choice and hopefully start date can be passed without any issue.
// var startDate = $("#start").val();
//     var endDate = $("#start").val();
//     var city = $("#city-input").val();

fetch(
  `https://app.ticketmaster.com/discovery/v2/events?&keyword=${eventChoice(
    eventsCategory
  )}&localStartDate=${startDate}&localEndDateTime=${endDate}&city=${city}&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`
)
  .then(response => {
    if (!response.ok || response.status === 404) {
      // in this block can great custom modals for errors or and have conditions to display
      // somthing along the lines of unable to find events that meet this criteria.
      confirm.log('ERROR: unable to search data');
    } else {
      return response.json();
    }
  })
  .then(data => {
    if (data._embedded === undefined) {
      // *display message that says something like no events available with this criteria*
    } else {
      var eventChoice = Math.floor(
        Math.random() * data._embedded.events.length
      );
      var event = data._embedded.events[eventChoice];

      ticketmasterData.date = event.dates.start.localDate;
      ticketmasterData.url = event.url;
      ticketmasterData.img = event.images[0].url;
      ticketmasterData.name = event.name;
      ticketmasterData.street = event._embedded.venues[0].address.line1;
      ticketmasterData.city = event._embedded.venues[0].city.name;
      ticketmasterData.state = event._embedded.venues[0].state.stateCode;
      ticketmasterData.lat = event._embedded.venues[0].location.latitude;
      ticketmasterData.long = event._embedded.venues[0].location.longitude;
      let eventName = ticketmasterData.name;
      let eventAddress = `${ticketmasterData.street} ${ticketmasterData.city}, ${ticketmasterData.state}`;
      //   let eventAddress = '686 North Spring Street Los Angeles, CA 90012';
      let eventLink = `https://www.google.com/maps/place/Treehouse/@34.05955,-118.2399147,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2c65b29455ad9:0x100690ebd8e3e872!8m2!3d34.0596031!4d-118.2378731`;
      let eventLat = 34.05953;
      let eventLon = -118.23772;
    }
  });
