const axios = require("axios");

async function searchLocation(city) {
    try {
        const res = await axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            {
                params: {
                    name: city,
                    count: 1,
                    language: "en",
                    format: "json"
                },
                timeout: 8000
            }
        );

        const r = res.data?.results?.[0];

        if (!r) {
            return {
                city,
                country: "Not Found",
                lat: 41.6764,
                lon: -86.2520,
                valid: false
            };
        }

        return {
            city: r.name,
            country: r.country || "Unknown",
            lat: r.latitude,
            lon: r.longitude,
            valid: true
        };
    } catch (e) {
        return {
            city,
            country: "Error",
            lat: 41.6764,
            lon: -86.2520,
            valid: false
        };
    }
}

async function getAutoLocation() {
    return {
        city: "Default Location",
        country: "Local",
        lat: 41.6764,
        lon: -86.2520,
        valid: true
    };
}

module.exports = { searchLocation, getAutoLocation };
