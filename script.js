function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  let year = date.getFullYear();

  return `${day} ${hours}:${minutes} <br /> ${year}`;
}

function condition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-true").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function cityname(city) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(condition);
}

function typecity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityname(cityInput.value);
}

function searchlocation(position) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coord.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(condition);
}
function getcurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchlocation);
}
function converttoFahrenheit(event) {
  event.preventDefault();
  let tempretureElement = document.querySelector("#tempreture-true");
  let tempreture = tempretureElement.innerHTML;
  tempretureElement.innerHTML = 30;
}

function converttoCelsius(event) {
  event.preventDefault();
  let tempretureElement = document.querySelector("#tempreture-true");
  let tempreture = tempretureElement.innerHTML;
  tempretureElement.innerHTML = -1;
}
let dataElement = document.querySelector(".date");
let currenttime = new Date();
dataElement.innerHTML = formatDate(currenttime);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", typecity);
let currentlocationButton = document.querySelector("#current-location-button");
currentlocationButton.addEventListener("click", getcurrentlocation);

cityname("Paris");
