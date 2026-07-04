const axios = require("axios");

async function getWeather(lat, lon, city) {
    const headers = {
        "User-Agent": "PiWeather",
        "Accept": "application/geo+json"
    };

    const point = await axios.get(
        `https://api.weather.gov/points/${lat},${lon}`,
        { headers, timeout: 8000 }
    );

    const forecastUrl =
        point.data.properties.forecast ||
        point.data.properties.forecastHourly;

    const forecast = await axios.get(forecastUrl, {
        headers,
        timeout: 8000
    });

    const p = forecast.data.properties.periods?.[0];

    if (!p) {
        return {
            city,
            temp: "--",
            condition: "No Data",
            wind: "--",
            precip: 0
        };
    }

    return {
        city,
        temp: p.temperature,
        condition: p.shortForecast,
        wind: p.windSpeed,
        precip: p.probabilityOfPrecipitation?.value ?? 0
    };
}

module.exports = { getWeather };
