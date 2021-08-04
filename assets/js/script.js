var date = $("#date").val();
var city = $("#location").val();
var recentSearchesEl = $("#recent-searches");
var searchHistoryArray = [] || JSON.parse(localStorage.getItem("citySearch"));


var formSubmitHandler = function (event) {
  
  event.preventDefault();

  // get city name value from input element
  console.log(city);

  // Set city name in local storage and generate history buttons
  if (cityname) {
    if(searchHistoryArray.length <= 5){
      searchHistoryArray.push({name: city,date: date});
    }else if(searchHistoryArray.length > 5){
      searchHistoryArray.pop();
      searchHistoryArray.splice(0,0, {name: city,date: date})
    }

    sessionStorage.setItem("search",JSON.stringify({name: city,date: date}))
    // var searchHistoryEl = document.createElement('button');
    // searchHistoryEl.className = 'btn';
    // searchHistoryEl.setAttribute('data-city', cityname);
    // searchHistoryEl.innerHTML = cityname;
    // historyButtonsEl.appendChild(searchHistoryEl);
    // historyCardEl.removeAttribute('style');

    cityNameInputEl.value = '';
  } 
  localStorage.setItem("citySearch",JSON.stringify(searchHistoryArray));
  // location.href = "./adventure.html";
};


// Load any past city searches
var loadHistory = function () {
    for (let i = searchHistoryArray.length + 1; searchHistoryArray.length > 0; i--) {
      var searchItemEl = $("<div>").attr("class","search-item");
      var searchLocEl = $("<h4>").text(city);
      var searchDateEl = $("<p>").text(date);

      searchItemEl.append(searchLocEl);
      searchItemEl.append(searchDateEl);
      recentSearchesEl.append(searchItemEl);

      // var searchHistoryEl = document.createElement('button');
      // searchHistoryEl.className = 'btn';
      // searchHistoryEl.setAttribute('data-city', searchArray[i]);
      // searchHistoryEl.innerHTML = searchArray[i];
      // historyButtonsEl.appendChild(searchHistoryEl);
      // historyCardEl.removeAttribute('style');

    }
};
// Search using search history buttons
// var buttonClickHandler = function (event) {
//   var cityname = event.target.getAttribute('data-city');
//   if (cityname) {
//     formSubmitHandler(cityname);
//   }
// };
// Clear Search History
// var clearHistory = function (event) {
//   localStorage.removeItem('weatherSearch');
//   historyCardEl.setAttribute('style', 'display: none');
// };
loadHistory();
recentSearchesEl.on("click", formSubmitHandler);

