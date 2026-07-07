const axios = require("axios");

async function getCurrentLocation() {
    try {
        const response = await axios.get(
            "https://ipapi.co/json/",
            {
                timeout: 5000
            }
        );

        return {
            city: response.data.city,
            state: response.data.region,
            country: response.data.country_name,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            timezone: response.data.timezone,
            automatic: true
        };

    } catch (error) {
        return null;
    }
}


module.exports = {
    getCurrentLocation
};