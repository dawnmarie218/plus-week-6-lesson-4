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

function showStateProvince(response) {
  document.querySelector("#state-province").innerHTML =
    response.data.features[0].properties.state;
}

//let forecastDate = new Date(timestamp * 1000);
//let forecastDay = date.getDay();
//let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function showHourlyForecast() {
  let hourlyForecast = document.querySelector("#hourly-forecast");

  let hourlyForecastHTML = `<div class="row d-flex align-items-center no-gutters bd-highlight" id="dogRow2">`;
  let hours = [
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
  ];

  hours.forEach(function (hour) {
    hourlyForecastHTML =
      hourlyForecastHTML +
      `<div class="col-1 border hour1">
<h4>8:00<br /> AM</h4>
<div class="summerYellowSquare left-end-square">
<i
class="fa-solid fa-square squares"
style="color: yellow"
></i>
<div class="summer-yellow-square-text left-end-square-text">
 Potential unsafe conditions depending on breed and length of
time outdoors.
</div>
</div>
<br />
<h4>80°</h4>
</div>`;

    hourlyForecastHTML = hourlyForecastHTML + `</div>`;
    hourlyForecast.innerHTML = hourlyForecastHTML;
    console.log(hourlyForecastHTML);
  });
}

function showStateProvince(response) {
  document.querySelector("#state-province").innerHTML =
    response.data.features[0].properties.state;
}
function getStateProvince(coordinates) {
  let apiKey1 = "1e3510962056455dabbb1f31abb7e7dd";
  let apiUrl1 = `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&apiKey=${apiKey1}`;
  axios.get(apiUrl1).then(showStateProvince);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector("#forecast");
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
  //document.querySelector("#todayHigh").innerHTML = Math.round(
  // response.data.main.temp_max
  //);
  // document.querySelector("#todayLow").innerHTML = Math.round(
  //  response.data.main.temp_min
  //);
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
let windPMH = null + " mph";

//
function round(hourlyHigh) {
  if (hourlyHigh % 5 == 0) {
    return Math.floor(hourlyHigh / 5) * 5;
  } else {
    return Math.floor(hourlyHigh / 5) * 5 + 5;
  }
}
hourlyHigh = 60;
let tempAdj = document.querySelector("#tempAdj");
tempAdj.innerHTML = round(hourlyHigh);

//function showMatrixValue() {
  //let dogSizeAlt = Number(dogSize.value);
 // if ((dogSize.value = 1 && tempAdj <= 65)) {
   // matrixValue = 1;
  //}
//}


//document.querySelector("#matrixValue").innerHTML = matrixValue.value;

function dogScore() {
  dogSizeAlt = Number(dogSize.value);
  checkbox1Alt = Number(checkbox1.checked);
  checkbox2Alt = Number(checkbox2.checked);
  checkbox3Alt = Number(checkbox3.checked);
  checkbox4Alt = Number(checkbox4.checked);
  checkbox5Alt = Number(checkbox5.checked);
  score =
    dogSizeAlt +
    checkbox1Alt +
    checkbox2Alt +
    checkbox3Alt -
    checkbox4Alt -
    checkbox5Alt;
  console.log(score);
}

let dogSize = document.querySelector("#customRange3");
dogSize.addEventListener("click", dogScore);

let checkbox1 = document.querySelector("#overweight");
checkbox1.addEventListener("change", dogScore);
//console.log(checkbox1.value);

let checkbox2 = document.querySelector("#flat");
checkbox2.addEventListener("change", dogScore);
//console.log(checkbox2.value);

let checkbox3 = document.querySelector("#age");
checkbox3.addEventListener("change", dogScore);

let checkbox4 = document.querySelector("#shade");
checkbox4.addEventListener("change", dogScore);

let checkbox5 = document.querySelector("#water");
checkbox5.addEventListener("change", dogScore);

//
function showSurfaceTemp1() {
  tempForm1 = document.getElementById("temp-check-card");
  displaySetting = tempForm1.style.display;
  btn = document.getElementById("btn1");

  if (displaySetting === "block") {
    tempForm1.style.display = "none";
  } else {
    tempForm1.style.display = "block";
  }
}
