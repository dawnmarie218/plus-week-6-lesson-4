let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
let background = document.querySelector(".background");
if (hours < 10) {
  hours = `0${hours}`;
}
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

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#state-province-country").innerHTML =
    response.data.country;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.temperature.current
  );
  //document.querySelector("#todayHigh").innerHTML = Math.round(
  // response.data.main.temp_max
  //);
  // document.querySelector("#todayLow").innerHTML = Math.round(
  //  response.data.main.temp_min
  //);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );

  let weatherIcons = document.querySelector("#weatherIcons");
  weatherIcons.setAttribute =
    ("src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/{${response.data.condition.icon}.png`);
  weatherIcons.setAttribute = ("alt", response.data.condition.description);
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

function toFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = "80";
}
function toCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = "27";
}
let linkF = document.querySelector("#fahrenheit");
linkF.addEventListener("click", toFahrenheit);

let linkC = document.querySelector("#celsius");
linkC.addEventListener("click", toCelsius);

function toMPH(event) {
  event.preventDefault();
  let wind = document.querySelector("#wind");
  wind.innerHTML = "2";
}
function toKMH(event) {
  event.preventDefault();
  let wind = document.querySelector("#wind");
  wind.innerHTML = "3";
}
let linkMPH = document.querySelector("#mph");
linkMPH.addEventListener("click", toMPH);

let linkKMH = document.querySelector("#kmh");
linkKMH.addEventListener("click", toKMH);

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

function showTooltip() {
  $('[data-toggle="tooltip"]').tooltip();
}
