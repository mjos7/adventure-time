var ticketmasterData = {}
var eventObj = {};
var dt = luxon.DateTime;
var citySearch = JSON.parse(sessionStorage.getItem("search"));

// these will include the indoor or outdoor choice in the value of the keyword i.e: music, sports, theater and more. 
var events = ["comedy","theater","concert","sports","festival"];
var city = "atlanta"


function eventChoice(events){
    
    let choice;

    Math.floor(Math.random() * events.length);
    choice = events[1];

    return choice;
}



// on click search fetces data. choice and hopefully start date can be passed without any issue.
fetch(`https://app.ticketmaster.com/discovery/v2/events?&keyword=${eventChoice(events)}&localStartDate=${citySearch.date}&city=${citySearch.city}&apikey=xEi5eJQO6xisLlzuVDPj1trwjnDMatBA`)
.then(response => {
    if(!response.ok || response.status === 404){
        // in this block can great custom modals for errors or and have conditions to display 
        // somthing along the lines of unable to find events that meet this criteria.
        console.log("ERROR: unable to search data");
    }else{
        return response.json();
    }
    })
    .then(data => {
        if(data._embedded === undefined){
            // *display message that says something like no events available with this criteria*
            console.log("No events in search");
        }else{

            var eventChoice = Math.floor(Math.random() * data._embedded.events.length);
            var event = data._embedded.events[eventChoice]
            ticketmasterData.date = event.dates.start.localDate;
            ticketmasterData.info = event.info;
            ticketmasterData.url = event.url;
            ticketmasterData.img = event.images[0].url;
            ticketmasterData.name = event.name;
            ticketmasterData.street = event._embedded.venues[0].address.line1;
            ticketmasterData.city = event._embedded.venues[0].city.name;
            ticketmasterData.state = event._embedded.venues[0].state.stateCode;
            ticketmasterData.lat = event._embedded.venues[0].location.latitude;
            ticketmasterData.long = event._embedded.venues[0].location.longitude;
            ticketmasterData.address = `${ticketmasterData.street} ${ticketmasterData.city}, ${ticketmasterData.state}`

            $("#event-title").text(ticketmasterData.name);
            console.log(ticketmasterData.info);
            $("#event-address").text(ticketmasterData.address);
            $("#event-link a").attr("href", ticketmasterData.url);
            $("#event-image").attr("src", ticketmasterData.img);
            $("#event-description").text(ticketmasterData.info);
            $("#date").text(dt.fromISO(ticketmasterData.date).toFormat("DDDD"));          
            search(ticketmasterData.lat, ticketmasterData.long);
            makeEventObj(ticketmasterData.name, ticketmasterData.address,  ticketmasterData.url, ticketmasterData.lat, ticketmasterData.long);

    }       
});






// console.log(eventObj);


