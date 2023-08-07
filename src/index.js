function showTooltip() {
  $('[data-toggle="tooltip"]').tooltip();
}

let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
let background = document.querySelector(".background");

if (hours > 10 && hours <= 17) {
  background.classList.add("dayBackground");
}
if (hours > 17 && hours <= 19) {
  background.classList.add("eveningBackground");
}
if (hours > 19 || hours < 6) {
  background.classList.add("nightBackground");
} else {
  background.classList.add("morningBackground");
}

if (hours >= 12) {
  minutes = `${minutes} PM`;
} else {
  minutes = `${minutes} AM`;
}
if (hours > 12) {
  hours = hours - 12;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let year = now.getFullYear();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();

let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = `${day}, ${hours}:${minutes}`;

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${date}-${month}-${year}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-3">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 border day" >
    <div class="forecast-day">
      <strong>${formatDay(forecastDay.time)}</strong>
    </div>

    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
      forecastDay.condition.icon
    }.png" alt="" width="40">
  
    <div class="outlookTemps">
      <span id="forecast-high">
        <strong>${Math.round(forecastDay.temperature.maximum)}</strong>
      </span> / <span id="forecast-low">${Math.round(
        forecastDay.temperature.minimum
      )}</span>
    </div>
  </div>

`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bb54b4f03074ab37dt8f0290273o110b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  fahrenheit = response.data.temperature.current;
  fahrenheitFeelsLike = response.data.temperature.feels_like;
  windMPH = response.data.wind.speed;

  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#country").innerHTML = response.data.country;
  document.querySelector("#currentTemp").innerHTML = Math.round(fahrenheit);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(windMPH);
  document.querySelector("#temp-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#feels-like").innerHTML =
    Math.round(fahrenheitFeelsLike);

  let weatherIcons = document.querySelector("#weatherIcons");
  weatherIcons.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcons.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
  getStateProvince(response.data.coordinates);
}

function search(event) {
  event.preventDefault();
  let apiKey = "bb54b4f03074ab37dt8f0290273o110b";
  let city = document.querySelector("#search-1").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#form1");
searchForm.addEventListener("submit", search);

function searchLocation(position) {
  let apiKey = "bb54b4f03074ab37dt8f0290273o110b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLoc = document.querySelector("#currentLocIcon");
currentLoc.addEventListener("click", getCurrentLoc);

function showStateProvince(response) {
  document.querySelector("#state-province").innerHTML =
    response.data.features[0].properties.state;
}

function getStateProvince(coordinates) {
  let apiKey1 = "1e3510962056455dabbb1f31abb7e7dd";
  let apiUrl1 = `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&apiKey=${apiKey1}`;
  axios.get(apiUrl1).then(showStateProvince);
}

function toCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  linkF.classList.remove("active");
  linkC.classList.add("active");
  let celsius = ((fahrenheit - 32) * 5) / 9;
  temp.innerHTML = Math.round(celsius);

  let feelsLikeTemp = document.querySelector("#feels-like");
  let celsiusFeelsLike = ((fahrenheitFeelsLike - 32) * 5) / 9;
  feelsLikeTemp.innerHTML = Math.round(celsiusFeelsLike);

  let windSpeed = document.querySelector("#wind");
  let windKMH = windMPH * 1.609;
  windSpeed.innerHTML = Math.round(windKMH) + " km/h";
}
function toFahrenheit(event) {
  event.preventDefault();
  linkF.classList.add("active");
  linkC.classList.remove("active");
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = Math.round(fahrenheit);

  let feelsLiketemp = document.querySelector("#feels-like");
  feelsLiketemp.innerHTML = Math.round(fahrenheitFeelsLike);

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(windMPH) + " mph";
}
let linkF = document.querySelector("#fahrenheit");
linkF.addEventListener("click", toFahrenheit);

let linkC = document.querySelector("#celsius");
linkC.addEventListener("click", toCelsius);

let fahrenheit = null;
let windMPH = null;
