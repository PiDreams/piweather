const axios = require("axios");


async function searchLocation(query) {

    try {

        const response = await axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            {
                params: {
                    name: query,
                    count: 10,
                    language: "en",
                    format: "json"
                },
                timeout: 8000
            }
        );


        if (!response.data.results) {
            return [];
        }


        return response.data.results.map(location => ({
            city: location.name,
            state: location.admin1 || "",
            country: location.country || "",
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: location.timezone
        }));


    } catch (error) {

        console.log(
            "Location Error:",
            error.message
        );

        return [];
    }
}


module.exports = {
    searchLocation
};