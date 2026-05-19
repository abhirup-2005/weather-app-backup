import { fahrenheitToCelsius, icons, formatHour, formatDayName, roundFahrenheit } from "./utils.js";

const hourlyContainer = document.querySelector(".hourly-container");

const weeklyContainer = document.querySelector(".weekly-container");

export function renderForecast( weatherData, index, unit) {
    renderHourly( weatherData, index, unit);
    renderWeekly(weatherData, unit);
}

function renderHourly(weatherData, index, unit) {
    hourlyContainer.textContent = "";

    const todayHours = weatherData.days[index].hours;
    const nextDayHours = weatherData.days[index + 1]?.hours;
    const currentHour = new Date().getHours();

    // FOR TODAY
    if (index === 0) {
        //Today Part
        for (let i = currentHour; i < 24; i++) {
            createHourCard(todayHours[i], i, unit);
        }
        // Tomorrow Part
        for (let i = 0; i < currentHour; i++) {
            createHourCard(nextDayHours[i], i, unit);
        }
        return;
    }

    // OTHER DAYS

    for (let i = 0; i < 24; i++) {
        createHourCard(todayHours[i], i, unit);
    }
}

function createHourCard(hour, hourIndex, unit) {
    const card = document.createElement("div");
    card.classList.add("hour-card");
    card.innerHTML = `
        <p>${(unit == "c") ? fahrenheitToCelsius(hour.temp) : roundFahrenheit(hour.temp)}</p>
        <img src="${icons[hour.icon]}">
        <p>${formatHour(hourIndex)}</p>
    `;

    hourlyContainer.appendChild(card);
}

function renderWeekly(weatherData, unit) {

    weeklyContainer.textContent = "";

    weatherData.days.slice(0, 7).forEach((day, index) => {

            const card = document.createElement("div");
            card.classList.add("week-card");
            card.dataset.index = index;
            card.innerHTML = `
                <div class="week-left">
                    <p>${formatDayName(index)}</p>
                </div>
                <img src="${icons[day.icon]}">
                <div class="week-right">
                    <p>
                        ${(unit == "c") ? fahrenheitToCelsius(day.tempmax) : roundFahrenheit(day.tempmax)}
                        /
                        ${(unit == "c") ? fahrenheitToCelsius(day.tempmin) : roundFahrenheit(day.tempmin)}
                    </p>
                </div>
            `;

            weeklyContainer.appendChild(card);
        });
}