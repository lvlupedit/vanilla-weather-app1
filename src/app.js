let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let time = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${time}`;

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${month} ${date}`;

let city = document.querySelector("#city-input");
let cityHeading = document.querySelector("#city-name");

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "e0a95184cf76d90f7e0a3057615fd9d3";

function getWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature-main");
  currentTemp.innerHTML = `${temp}`;
  console.log(response.data);
  let description = document.querySelector("#description-main");
  description.innerHTML = response.data.weather[0].description;
}

function inputCity(event) {
  event.preventDefault();
  cityHeading.innerHTML = `${city.value}`;

  axios
    .get(`${apiUrl}q=${city.value}&appid=${apiKey}&units=metric`)
    .then(getWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", inputCity);
