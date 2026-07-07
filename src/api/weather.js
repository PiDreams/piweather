const axios = require("axios");

const headers = {
    "User-Agent": "PiWeather"
};

async function getWeather(location) {
    try {
        const point = await axios.get(
            `https://api.weather.gov/points/${location.latitude},${location.longitude}`,
            {
                headers,
                timeout: 8000
            }
        );

        const forecastUrl =
            point.data.properties.forecast;


        const forecast = await axios.get(
            forecastUrl,
            {
                headers,
                timeout: 8000
            }
        );


        const current =
            forecast.data.properties.periods[0];


        return {
            condition: current.shortForecast,
            temperature: current.temperature,
            unit: current.temperatureUnit,
            wind: current.windSpeed,
            rain:
                current.probabilityOfPrecipitation?.value || 0,
            icon: current.icon
        };


    } catch (error) {
        console.log(
            "Weather API Error:",
            error.message
        );

        return {
            condition: "Unavailable",
            temperature: "--",
            unit: "F",
            wind: "--",
            rain: "--",
            icon: null
        };
    }
}


module.exports = {
    getWeather
};