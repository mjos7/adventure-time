// FROM GLOBAL FILE
// USER INPUT
'use strict';
var dt = luxon.DateTime;
var today = dt.now().toISODate();
var date = $('#inline_cal');
date.attr('value', today);
date.attr('min', today);
date.attr('max', dt.fromISO(today).plus({ years: 1 }).toISODate());

var startDate = [];
var endDate = startDate;

var recentSearchesEl = $('.recent-searches');
var searchBtnEl = $('#search');

var searchHistoryArray = JSON.parse(localStorage.getItem('citySearch')) || [];
function formSubmitHandler() {
  event.preventDefault();
  // get city name value from input element
  var city = $('#location').val();
  var date = $('#inline_cal').val();

  // Set city name in local storage and generate history buttons
  if (city) {
    if (searchHistoryArray.length <= 7) {
      searchHistoryArray.push({ city: city, date: date });
    } else if (searchHistoryArray.length > 5) {
      searchHistoryArray.pop();
      searchHistoryArray.splice(0, 0, { city: city, date: date });
    }

    sessionStorage.setItem(
      'citySearch',
      JSON.stringify({ city: city, date: date })
    );
  }
  localStorage.setItem('citySearch', JSON.stringify(searchHistoryArray));
  location.href = './adventure.html';
}
// Load any past city searches
function loadHistory() {
  for (var i = searchHistoryArray.length - 1; i >= 0; i--) {
    var searchItemEl = $('<div>').attr('class', 'search-item');
    searchItemEl.attr('id', i);
    var searchLocEl = $('<h4>').text(searchHistoryArray[i].city);
    var searchDateEl = $('<p>').text(
      dt.fromISO(searchHistoryArray[i].date).toFormat('cccc, DD')
    );

    searchItemEl.append(searchLocEl);
    searchItemEl.append(searchDateEl);
    recentSearchesEl.append(searchItemEl);

    location.reload;
  }
}
// Search using search history buttons
var buttonClickHandler = function (event) {
  var cityname = event.target.getAttribute('data-city');
  if (cityname) {
    formSubmitHandler(cityname);
  }
};

loadHistory();
searchBtnEl.on('click', formSubmitHandler);
$('.search-item').on('click', function (event) {
  event.stopPropagation();
  var element = $(this).attr('id');
  sessionStorage.setItem(
    'citySearch',
    JSON.stringify({
      city: searchHistoryArray[element].city,
      date: searchHistoryArray[element].date,
    })
  );
  location.href = './adventure.html';
});
