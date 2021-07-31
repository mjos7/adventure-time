/* 
Application is designed to take in user input and using third
party API's search for local events and display that to the user
The events that are pick are dependednt on location, weather and time
*/ 

// TODO: set golbal variables for the elements in the HTML

// TODO: set variables to store data of the fetches. Might want
// to use objects



// TODO:  function insideEvent(weather)- this function will be responsible for 
// checking the data and decideing whether or not to choose event
// to be inside or outside. it will take in weather data and return
// true or false true being the event should be inside.

// NOTE: Probably wont need many functions unless code becuase redundent.

// TODO: create event listner for the submit button that will
// will run most of the code. 

// ----------------------------------------------------------------------//git

var ticketmasterData = {}


// these will include the indoor or outdoor choice in the value of the keyword i.e: music, sports, theater and more. 
var outdoorChoice = [];
var indorChoice = [];

function weatherChoice(weather){
    /* 
    let choice;

    if(weather === sunny){
        var randomChoice = Math.floor(Math.random() * outdoorChoice.lengthe);
        choice = outdoor[randomChoice];
        or 
    }else if(weather === rainy){
        var randomChoice = Math.floor(Math.random() * indorChoice.lengthe);
        choice = indorChoice[randomChoice];
    }else{
        var randomChoice = Math.floor(Math.random() * indorChoice.lengthe);
        choice = indorChoice[randomChoice];
    }

    return choice;
    */
}

// date variable will be embeded into the link but have to get it to work.

// on click search fetces data. choice and hopefully start date can be passed without any issue.

    var startDate = ["2021-09-18"];
    var endDate = ["2021-09-18"];
    var choice = "comedy";
    var city = "atlanta"

    fetch(`https://app.ticketmaster.com/discovery/v2/events?&keyword=${choice}&localStartDate=${endDate}&localEndDateTime=${endDate}&city=${city}&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`)
    .then(response => {
        if(!response.ok || response.status === 404){
            // in this block can great custom modals for errors or and have conditions to display 
            // somthing along the lines of unable to find events that meet this criteria.
            confirm.log("ERROR: unable to search data");
        }else{
            return response.json();
        }
    })
    .then(data => {

        console.log(data);
        console.log(data._embedded);
        
        if(data._embedded === undefined){
            console.log("no data");
            console.log(data._embedded);
            // *display message that says something like no events available with this criteria*
        }else{
            console.log("valid data");

            var eventChoice = Math.floor(Math.random() * data._embedded.events.length);
            var event = data._embedded.events[eventChoice]

            ticketmasterData.date = event.dates.start.localDate;
            ticketmasterData.url = event.url;
            ticketmasterData.img = event.images[0].url;
            ticketmasterData.name = event.name;
            ticketmasterData.street = event._embedded.venues[0].address.line1;
            ticketmasterData.city = event._embedded.venues[0].city.name;
            ticketmasterData.country = event._embedded.venues[0].country.countryCode;
            ticketmasterData.lat = event._embedded.venues[0].location.latitude;
            ticketmasterData.long = event._embedded.venues[0].location.longitude;
            console.log(ticketmasterData);
        }        
    })

    // in the same on click we will update the page with data and will be done with current html or it will be generated. 