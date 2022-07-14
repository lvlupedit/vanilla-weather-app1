function formatDate() {
  let now = new Date();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${day}, ${time}`;

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

  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${month} ${date}`;
}

formatDate();

let city = document.querySelector("#city-input");
let cityHeading = document.querySelector("#city-name");

function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature-main");
  let description = document.querySelector("#description-main");
  description.innerHTML = response.data.weather[0].description;
  currentTemp.innerHTML = `${temp}`;
}

function inputCity(event) {
  event.preventDefault();
  cityHeading.innerHTML = `${city.value}`;

  axios
    .get(`${apiUrl}q=${city.value}&appid=${apiKey}&units=metric`)
    .then(displayWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", inputCity);
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "e0a95184cf76d90f7e0a3057615fd9d3";
