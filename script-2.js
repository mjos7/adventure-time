// script to check if recent search item exists in array

var searchHistoryArray = JSON.parse(localStorage.getItem('citySearch')) || [];
function formSubmitHandler() {
  event.preventDefault();
  // get city name value from input element
  var city = $('#location').val();
  var date = $('#date').val();

  // Set city name in local storage and generate history buttons
  if (city && searchHistoryArray.indexOf(city) !== -1) {
    if (searchHistoryArray.length <= 7) {
      searchHistoryArray.push({ city: city, date: date });
    } else if (searchHistoryArray.length > 5) {
      searchHistoryArray.pop();
      searchHistoryArray.splice(0, 0, { city: city, date: date });
    }
  }