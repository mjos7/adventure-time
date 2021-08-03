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