const apiKey = "e70fc5b2387e7e98a4eedd22067ca58a";
const city = "suzano";
const units = "imperial";

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Weather data not available");
    }

    const data = await response.json();
    displayCurrentWeather(data);

    fetchForecast();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    displayWeatherError();
  }
}

async function fetchForecast() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Forecast data not available");
    }

    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    document.getElementById("forecast-container").innerHTML =
      "<p>Forecast data unavailable</p>";
  }
}

function displayCurrentWeather(data) {
  const currentTemp = document.getElementById("current-temp");
  const weatherIcon = document.getElementById("weather-icon");
  const weatherDesc = document.getElementById("weather-desc");

  currentTemp.textContent = Math.round(data.main.temp);

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;

  const descriptions = data.weather.map((item) => {
    return item.description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });

  weatherDesc.textContent = descriptions.join(", ");
}

function displayForecast(data) {
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";

  const dailyForecasts = {};

  data.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    if (date.getDate() === new Date().getDate()) {
      return;
    }

    if (
      !dailyForecasts[day] &&
      date.getHours() >= 11 &&
      date.getHours() <= 13
    ) {
      dailyForecasts[day] = forecast;
    }
  });

  const threeDayForecast = Object.values(dailyForecasts).slice(0, 3);
  threeDayForecast.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(forecast.main.temp);

    const forecastDay = document.createElement("div");
    forecastDay.className = "forecast-day";
    forecastDay.innerHTML = `
            <div class="forecast-date">${day}</div>
            <div class="forecast-temp">${temp}°F</div>
        `;

    forecastContainer.appendChild(forecastDay);
  });
}

function displayWeatherError() {
  document.getElementById("current-temp").textContent = "--";
  document.getElementById("weather-desc").textContent =
    "Weather data unavailable";
  document.getElementById("forecast-container").innerHTML =
    "<p>Forecast data unavailable</p>";
}

document.addEventListener("DOMContentLoaded", fetchWeather);
