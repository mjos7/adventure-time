// recent search boxes
var newRecentDate = document.querySelector('#date');
var newRecentTime = document.querySelector('#time');
var newRecentCity = document.querySelector('#location');
var searchItemEl = document.querySelector('#search-item');
var searchItemCard = document.querySelector('#recent-searches');
var searchBtn = document.getElementById('search');
var recentSearchArray = JSON.parse(localStorage.getItem('searches')) || [];

var loadHistory = function () {
  searchArray = JSON.parse(localStorage.getitem(''));

  if (searchArray) {
    searchArray = JSON.parse(localStorage.getitem(''));
    for (let i = 0; i < searchArray.length; i++) {
      var newRecentSearch = document.createElement('button');
      newRecentSearch.className = 'search-item';
      newRecentSearch.setAttribute('', searchArray[i]);
      newRecentSearch.innerHTML = searchArray[i];
      searchItemEl.appendChild(newRecentSearch);
      searchItemCard.removeAttribute('style');
    }
  }
};

// Search weather using search history buttons
var buttonClickHandler = function (event) {
  var cityname = event.target.getAttribute('');
  if (cityname) {
    getWeatherInfo(cityname);
  }
};

searchBtn.addEventListener('click', function (event) {
  event.preventDefault();

  var recentDate = newRecentDate.value;
  var recentCity = newRecentCity.value;

  var recentSearchObj = {
    date: recentDate,
    city: recentCity,
  };
  console.log(recentSearchObj);
  localStorage.setItem('searches', JSON.stringify(recentSearchObj));
  recentSearchArray.push(recentSearchObj);

  //   // clear old content
  //   $(document).ready(function () {
  //     $(newRecentCity).val('');
  //   });
});

// Mark's old code

// When user inputs City and submits
// $('#search-form').submit(function (event) {
//   event.preventDefault();
//   var city = searchBarEl.value.trim();
//   if (city == '') {
//     alert('Please enter a city');
//     return;
//   } else {
//     $('html, body').animate(
//       {
//         scrollTop: $('#city-name').offset().top - 70,
//       },
//       500
//     );
//     startWeather(city);
//   }
//   // clear old content
//   $(document).ready(function () {
//     $(searchBarEl).val('');
//   });
// });
