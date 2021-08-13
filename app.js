function getTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let date = document.querySelector("#current-date");
  date.innerHTML = `${day} ${hour}:${minute}`;
}
getTime();

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityName = document.querySelector("#current-city-name");
  cityName.innerHTML = `${searchInput.value}`;

  let units = "metric";
  let apiKey = "b0f53c0693e9322889a32ea02b229166";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b0f53c0693e9322889a32ea02b229166";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(latitude, longitude);
  axios.get(apiUrl).then(showTemperature);
}
function clickGeoButton() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let geoLocationButton = document.querySelector("#geo-location-button");
geoLocationButton.addEventListener("click", clickGeoButton);
