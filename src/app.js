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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

formatDay();

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".carousel-caption");
  let forecastHTML = `<div class="carousel-caption d-none d-md-block">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
       <h5>
         ${formatDay(forecastDay.dt)} <br>
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="weather-icon"> <br />
                 <span  class="forecast-temperature">${Math.round(
                   forecastDay.temp.max
                 )}°C <small class="forecast-min-temp">${Math.round(
          forecastDay.temp.min
        )}°C</small> </span> 
              </h5>
              <p class="forecast-weather-description">${
                forecastDay.weather[0].description
              }</p>  
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e0a95184cf76d90f7e0a3057615fd9d3";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?`;
  axios
    .get(
      `${forecastApiUrl}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    )
    .then(displayForecast);
}

function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature-main");
  let description = document.querySelector("#description-main");
  let iconElement = document.querySelector("#weather-icon");
  let maximumTemperatureElement = document.querySelector("#maximum-temp");
  let minimumTemperatureElement = document.querySelector("#minimum-temp");
  let windspeedElement = document.querySelector("#windspeed");
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let cityHeading = document.querySelector("#city-name");
  description.innerHTML = response.data.weather[0].description;
  currentTemp.innerHTML = `${temp}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  maximumTemperatureElement.innerHTML = `${maxTemp}`;
  minimumTemperatureElement.innerHTML = `${minTemp}`;
  windspeedElement.innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  cityHeading.innerHTML = `${response.data.name}`;
  console.log(response.data);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchHandle(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  let city = cityinput.value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchHandle);
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "e0a95184cf76d90f7e0a3057615fd9d3";

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Barcelona");
