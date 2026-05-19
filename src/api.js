const visualCrossingApi = "PVF9DMYCJFKQCHQXC64PXG5LJ";

export async function getWeatherData(cityName) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${visualCrossingApi}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Weather API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}

export async function getAQIData(lat, lon) {

    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=us_aqi`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`AQI API Error: ${response.status}`);
    }

    return await response.json();
}

export async function getCityName(lat, lon) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch city");
        }
        const data = await response.json();

        return (
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            data.country
        );

    } catch (error) {
        console.log(error);
    }
}