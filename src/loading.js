const loader = document.querySelector(".loader");
const weatherContainer = document.querySelector(".weather-container");

export function showLoading() {
    loader.classList.remove("hidden");
    weatherContainer.classList.add("hidden");
}

export function hideLoading() {
    loader.classList.add("hidden");
    weatherContainer.classList.remove("hidden");
}