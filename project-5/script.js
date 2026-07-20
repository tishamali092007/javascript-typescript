// ===============================
// WeatherX - JavaScript
// ===============================

const apiKey = "d4c3a5978378966e24c9992de229af0a";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const city = document.getElementById("city");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");

const forecast = document.getElementById("forecast");
const loader = document.getElementById("loader");

// ===============================
// Loader
// ===============================

function showLoader() {
    loader.classList.add("show");
}

function hideLoader() {
    loader.classList.remove("show");
}

// ===============================
// Current Date
// ===============================

const today = new Date();

date.innerText = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

// ===============================
// Search Events
// ===============================

searchBtn.addEventListener("click", () => {

    const cityName = searchInput.value.trim();

    if (cityName !== "") {
        getWeather(cityName);
    }

});

searchInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        searchBtn.click();
    }

});

// ===============================
// Get Weather
// ===============================

async function getWeather(cityName) {

    showLoader();

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

        getForecast(cityName);

    }

    catch (error) {

        alert(error.message);

    }

    hideLoader();

}

// ===============================
// Display Weather
// ===============================

function displayWeather(data) {

    city.innerText = data.name;

    temp.innerText = Math.round(data.main.temp) + "°C";

    condition.innerText = data.weather[0].main;

    humidity.innerText = data.main.humidity + "%";

    wind.innerText = data.wind.speed + " km/h";

    visibility.innerText =
        (data.visibility / 1000).toFixed(1) + " km";

    sunrise.innerText = new Date(
        data.sys.sunrise * 1000
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    icon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    changeBackground(data.weather[0].main);

}

// ===============================
// Forecast
// ===============================

async function getForecast(cityName) {

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
    );

    const data = await response.json();

    forecast.innerHTML = "";

    const days = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    days.slice(0, 5).forEach(item => {

        const card = document.createElement("div");

        card.className = "forecast-card";

        card.innerHTML = `
            <h3>${new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "short"
            })}</h3>

            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

            <p>${Math.round(item.main.temp)}°C</p>
        `;

        forecast.appendChild(card);

    });

}

// ===============================
// Current Location
// ===============================

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {

        alert("Geolocation not supported");

        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

        showLoader();

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        displayWeather(data);

        getForecast(data.name);

        hideLoader();

    });

});

function changeBackground(weather) {

    switch (weather) {

        case "Clear":
            document.body.style.background =
                "linear-gradient(135deg,#1E3C72,#2A5298,#6DD5FA)";
            break;

        case "Clouds":
            document.body.style.background =
                "linear-gradient(135deg,#4B79A1,#283E51,#8EC5FC)";
            break;

        case "Rain":
        case "Drizzle":
            document.body.style.background =
                "linear-gradient(135deg,#0F2027,#203A43,#2C5364)";
            break;

        case "Snow":
            document.body.style.background =
                "linear-gradient(135deg,#DCEEFF,#A7D8FF,#6FB1FC)";
            break;

        case "Thunderstorm":
            document.body.style.background =
                "linear-gradient(135deg,#232526,#414345,#0F2027)";
            break;

        default:
            document.body.style.background =
                "linear-gradient(135deg,#1E3C72,#2A5298,#6DD5FA)";
    }

}
// ===============================
// Default City
// ===============================

getWeather("Surat");