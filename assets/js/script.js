<<<<<<< HEAD
var newRecentDate = document.querySelector("#date");
var newRecentTime = document.querySelector("#time");
var newRecentCity = document.querySelector("#location");
var searchItemEl = document.querySelector("#search-item");
var searchItemCard = document.querySelector("#recent-searches");
var searchBtn = document.getElementById("search");
var recentSearchArray = [];

var loadHistory =  function () {
    searchArray = JSON.parse (localStorage.getitem(""));

    if (searchArray) {
        searchArray = JSON.parse (localStorage.getitem(""));
        for (let i = 0; i < searchArray.length; i++) {
            var newRecentSearch = document.createElement("button");
            newRecentSearch.className = "search-item";
            newRecentSearch.setAttribute("", searchArray[i])
            newRecentSearch.innerHTML = searchArray[i];
            searchItemEl.appendChild(newRecentSearch);
            searchItemCard.removeAttribute("style");
        }
    }
}

// Search weather using search history buttons
var buttonClickHandler = function (event) {
    var cityname = event.target.getAttribute("");
    if (cityname) {
        getWeatherInfo(cityname);
    }
}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    location.href = "./adventure.html"

    var recentDate = newRecentDate.value;
    var recentTime = newRecentTime.value;
    var recentCity = newRecentCity.value;
    var recentSearchObj = {
        date: recentDate,
        time: recentTime,
        city: recentCity
    }
    console.log(recentSearchObj);
})
=======
var cityFormEl = document.querySelector('#city');
var cityNameInputEl = document.querySelector('#location');
var historyButtonsEl = document.querySelector('#search-item');
var historyCardEl = document.querySelector('#recent-searches');
var trashEl = document.querySelector('#trash');
var searchHistoryArray = [];
var formSubmitHandler = function (event) {
  event.preventDefault();
  // get city name value from input element
  var cityname = cityNameInputEl.value.trim();
  // Set city name in local storage and generate history buttons
  if (cityname) {
    searchHistoryArray.push(cityname);
    localStorage.setItem('citySearch', JSON.stringify(searchHistoryArray));
    var searchHistoryEl = document.createElement('button');
    searchHistoryEl.className = 'btn';
    searchHistoryEl.setAttribute('data-city', cityname);
    searchHistoryEl.innerHTML = cityname;
    historyButtonsEl.appendChild(searchHistoryEl);
    historyCardEl.removeAttribute('style');
    cityNameInputEl.value = '';
  } else {
    alert('Please enter a City name');
  }
};
// Load any past city searches
var loadHistory = function () {
  searchArray = JSON.parse(localStorage.getItem('citySearch'));
  if (searchArray) {
    searchHistoryArray = JSON.parse(localStorage.getItem('citySearch'));
    for (let i = 0; i < searchArray.length; i++) {
      var searchHistoryEl = document.createElement('button');
      searchHistoryEl.className = 'btn';
      searchHistoryEl.setAttribute('data-city', searchArray[i]);
      searchHistoryEl.innerHTML = searchArray[i];
      historyButtonsEl.appendChild(searchHistoryEl);
      historyCardEl.removeAttribute('style');
    }
  }
};
// Search using search history buttons
var buttonClickHandler = function (event) {
  var cityname = event.target.getAttribute('data-city');
  if (cityname) {
    formSubmitHandler(cityname);
  }
};
// Clear Search History
var clearHistory = function (event) {
  localStorage.removeItem('weatherSearch');
  historyCardEl.setAttribute('style', 'display: none');
};
cityFormEl.addEventListener('submit', formSubmitHandler);
historyButtonsEl.addEventListener('click', buttonClickHandler);
trashEl.addEventListener('click', clearHistory);
loadHistory();
>>>>>>> develop
