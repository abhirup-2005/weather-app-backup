import "./style.css";
import { getAQIData, getWeatherData } from "./api.js";
import { renderCurrentWeather, renderAQI, renderVideo } from "./dom.js";
import { renderForecast } from "./forecast.js";
import { hideLoading, showLoading } from "./loading.js";
import { getUserLocation } from "./location.js";

const form = document.querySelector(".user-input-form");
const cityInput = document.querySelector("#city");
const weeklyContainer = document.querySelector(".weekly-container");
const unitBtns = document.querySelectorAll(".unit-btn");

let weatherData = null;
let unit = "c";
let currentForecast  = 0;

window.addEventListener("load", async () => {
    showLoading();
    try {
        const city = await getUserLocation();
        cityInput.value = city;
        weatherData = await getWeatherData(city);
        const aqiData = await getAQIData(
            weatherData.latitude,
            weatherData.longitude
        );

        renderAQI(aqiData);

        renderDay(0, unit);

        renderVideo(weatherData, 0);

    } catch (err) {

        console.error(err);

        alert("Failed to get location weather");

    } finally {

        hideLoading();

    }

});

form.addEventListener("submit", (e) => handleSearch(e));

weeklyContainer.addEventListener("click", (e) => handleForecastClick(e));



async function handleSearch(e) {
    e.preventDefault();

    const city = cityInput.value.trim();
    if (!city) return;

    try {

        showLoading();
        weatherData = await getWeatherData(city);
        const aqiData = await getAQIData(weatherData.latitude, weatherData.longitude);

        renderAQI(aqiData);
        renderDay(0, unit);
        renderVideo(weatherData, 0);

        hideLoading();

    } catch (err) {
        console.error(err);
        hideLoading();
        alert("Failed to fetch weather data");
    }
}

unitBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        unitBtns.forEach((b) => {
            b.classList.remove("clicked");
        });

        btn.classList.add("clicked");

        if(btn.classList.contains("c")){
            unit = "c";
        }
        else {
            unit = "f";
        }

        renderDay(currentForecast, unit);
    });

});

function handleForecastClick(e) {
    const card = e.target.closest(".week-card");
    currentForecast = Number(card.dataset.index);
    
    if (!card || !weatherData) return;
    renderDay(Number(card.dataset.index), unit);
    renderVideo(weatherData, currentForecast);
}

function renderDay(index, unit) {
    renderCurrentWeather(weatherData, index, unit);
    renderForecast(weatherData, index, unit);
}