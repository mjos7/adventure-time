// script to check if recent search item exists in array

//var searchHistoryArray = JSON.parse(localStorage.getItem('citySearch')) || [];

function formSubmitHandler() {
  event.preventDefault();
  console.log("in testing function")
  // get city name value from input element
  var city = $('#location').val();
  var date = $('#inline_cal').val();

  var searchExists = false;

  if (city) {
    // Loop through current array to check if current search matches a previous one
    for (var i = 0; i < searchHistoryArray.length; i++) {
      if ((searchHistoryArray[i].city === city) && (searchHistoryArray[i].date === date)) {
        searchExists = true;
      }    
    }
    // If the search doesn't already exist
    if (!searchExists) {
      if (searchHistoryArray.length <= 7) {
          searchHistoryArray.push({ city: city, date: date });
        } else if (searchHistoryArray.length > 5) {
          searchHistoryArray.pop();
          searchHistoryArray.splice(0, 0, { city: city, date: date });
        }
    }
    localStorage.setItem('citySearch', JSON.stringify(searchHistoryArray));
  } else {
    // no city was input
  }
}