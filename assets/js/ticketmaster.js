var ticketmasterData = {};
var eventObj = {};
var dt = luxon.DateTime;
var citySearch = JSON.parse(localStorage.getItem('citySearch'));
console.log(citySearch[0].date);
var endDate = dt.fromISO(citySearch[0].date).plus({ days: 30 }).toISODate();

// these will include the indoor or outdoor choice in the value of the keyword i.e: music, sports, theater and more.
var events = ['comedy', 'theatre', 'concert', 'sports', 'festival'];
var city = '';

function eventChoice(events) {
  let choice;

  var randomEvent = Math.floor(Math.random() * events.length);
  choice = events[randomEvent];

  return choice;
}
//app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey={apikey}
// on click search fetces data. choice and hopefully start date can be passed without any issue.
var fetchAPI = function () {
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events?keyword=${eventChoice(
      events
    )}&startDateTime=${
      citySearch[0].date
    }T06:00:00Z&endDateTime=${endDate}T06:00:00Z&city=${
      citySearch[0].city
    }&sort=date,asc&apikey=xEi5eJQO6xisLlzuVDPj1trwjnDMatBA`
  )
    .then(response => {
      if (!response.ok || response.status === 404) {
        // in this block can great custom modals for errors or and have conditions to display
        // somthing along the lines of unable to find events that meet this criteria.
        console.log('ERROR: unable to search data');
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data._embedded === undefined) {
        // *display message that says something like no events available with this criteria*
        console.log('No events in search');
        fetchAPI();
      } else {
        var event = data._embedded.events[0];

        ticketmasterData.date = event.dates.start.localDate;

        ticketmasterData.info = event.info;
        if (ticketmasterData.info != undefined) {
          if (ticketmasterData.info.length > 150)
            ticketmasterData.info =
              ticketmasterData.info.substring(0, 150) + '...';
        }
        ticketmasterData.url = event.url;
        ticketmasterData.img = event.images[0].url;
        ticketmasterData.name = event.name;
        ticketmasterData.street = event._embedded.venues[0].address.line1;
        ticketmasterData.city = event._embedded.venues[0].city.name;
        ticketmasterData.state = event._embedded.venues[0].state.stateCode;
        ticketmasterData.lat = event._embedded.venues[0].location.latitude;
        ticketmasterData.long = event._embedded.venues[0].location.longitude;
        ticketmasterData.address = `${ticketmasterData.street} ${ticketmasterData.city}, ${ticketmasterData.state}`;

        $('#event-title').text(ticketmasterData.name);
        $('#event-address').text(ticketmasterData.address);
        $('#event-link a').attr('href', ticketmasterData.url);
        $('#event-image').attr('src', ticketmasterData.img);
        $('#event-description').text(ticketmasterData.info);
        $('#date').text(dt.fromISO(ticketmasterData.date).toFormat('cccc, DD'));
        search(ticketmasterData.lat, ticketmasterData.long);
        makeEventObj(
          ticketmasterData.name,
          ticketmasterData.address,
          ticketmasterData.url,
          ticketmasterData.lat,
          ticketmasterData.long
        );
      }
    });
};
fetchAPI();
