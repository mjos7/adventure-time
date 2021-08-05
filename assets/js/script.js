var date = $("#date").val();
var recentSearchesEl = $(".recent-searches");
var searchBtnEl = $("#search");

var searchHistoryArray = JSON.parse(localStorage.getItem("citySearch")) || [];


function formSubmitHandler(){
  
  event.preventDefault();

  // get city name value from input element
  var city = $("#location").val();

  // Set city name in local storage and generate history buttons
  if (city) {
    if(searchHistoryArray.length <= 7){
      searchHistoryArray.push({city: city,date: date});
    }else if(searchHistoryArray.length > 5){
      searchHistoryArray.pop();
      searchHistoryArray.splice(0,0, {city: city,date: date})
    }

    sessionStorage.setItem("search",JSON.stringify({city: city,date: date}))
    // var searchHistoryEl = document.createElement('button');
    // searchHistoryEl.className = 'btn';
    // searchHistoryEl.setAttribute('data-city', cityname);
    // searchHistoryEl.innerHTML = cityname;
    // historyButtonsEl.appendChild(searchHistoryEl);
    // historyCardEl.removeAttribute('style');

    // cityNameInputEl.value = '';
  } 
  localStorage.setItem("citySearch",JSON.stringify(searchHistoryArray));
  location.href = "./adventure.html";
};


// Load any past city searches
function loadHistory(){

  console.log("load running");


  for (var i = searchHistoryArray.length - 1; i >= 0; i--) {
    console.log(searchHistoryArray[i])
    var searchItemEl = $("<div>").attr("class","search-item");
    searchItemEl.attr("id", i);
    var searchLocEl = $("<h4>").text(searchHistoryArray[i].city);
    var searchDateEl = $("<p>").text(searchHistoryArray[i].date);

    searchItemEl.append(searchLocEl);
    searchItemEl.append(searchDateEl);
    recentSearchesEl.append(searchItemEl);

      // var searchHistoryEl = document.createElement('button');
      // searchHistoryEl.className = 'btn';
      // searchHistoryEl.setAttribute('data-city', searchArray[i]);
      // searchHistoryEl.innerHTML = searchArray[i];
      // historyButtonsEl.appendChild(searchHistoryEl);
      // historyCardEl.removeAttribute('style');
    location.reload  
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
searchBtnEl.on("click", formSubmitHandler);
$(".search-item").on("click", function(event){
  event.stopPropagation();
  var element = $(this).attr('id');
  sessionStorage.setItem("search",JSON.stringify({city: searchHistoryArray[element].city,date: searchHistoryArray[element].date}))
  location.href = "./adventure.html";
})