const readline = require("readline");

const {
    searchLocation
} = require("./api/geocode");

const {
    getWeather
} = require("./api/weather");

const {
    getLocations,
    addLocation,
    saveLocations
} = require("./storage/locations");

const {
    loading,
    render,
    error
} = require("./ui/display");

const {
    startKeyboard
} = require("./controls/keyboard");


const REFRESH_TIME = 300000;


let locations = [];
let currentLocation = 0;


function askLocation() {

    process.stdin.setRawMode(false);


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    rl.question("\nSearch city: ", async answer => {


        const results =
            await searchLocation(answer);


        if (!results.length) {

            error("Location not found");

            rl.close();

            return;
        }


        console.clear();

        console.log("Choose location:\n");


        results.forEach((location, index) => {

            console.log(
                `${index + 1}. ${location.city}, ${location.state}, ${location.country}`
            );

        });


        rl.question("\nNumber: ", async choice => {


            const selected =
                results[Number(choice) - 1];


            if (!selected) {

                error("Invalid selection");

                rl.close();

                return;
            }


            addLocation(selected);


            locations =
                getLocations();


            currentLocation =
                locations.length - 1;


            rl.close();


            process.stdin.setRawMode(true);


            await updateWeather();

        });

    });

}



async function updateWeather() {

    const location =
        locations[currentLocation];


    if (!location) {

        error("No location saved");

        return;
    }


    try {

        const weather =
            await getWeather(location);


        render(
            location,
            weather
        );


    } catch (err) {

        error("Weather update failed");

    }

}



function previousLocation() {

    if (!locations.length) return;


    currentLocation--;


    if (currentLocation < 0) {

        currentLocation =
            locations.length - 1;

    }


    updateWeather();

}



function nextLocation() {

    if (!locations.length) return;


    currentLocation++;


    if (currentLocation >= locations.length) {

        currentLocation = 0;

    }


    updateWeather();

}



function showLocations() {

    console.clear();


    console.log("Saved Locations:\n");


    locations.forEach((location, index) => {

        console.log(
            `${index + 1}. ${location.city}, ${location.state}, ${location.country}`
        );

    });


    console.log("\nPress any key...");

}



function removeLocation() {

    if (!locations.length) return;


    locations.splice(
        currentLocation,
        1
    );


    saveLocations(locations);


    currentLocation = 0;


    updateWeather();

}



async function start() {

    loading();


    locations =
        getLocations();


    if (!locations.length) {

        setTimeout(() => {
            askLocation();
        }, 1000);

    } else {

        await updateWeather();

    }


    startKeyboard({

        previous: previousLocation,

        next: nextLocation,

        add: askLocation,

        list: showLocations,

        remove: removeLocation

    });


    setInterval(() => {

        updateWeather();

    }, REFRESH_TIME);

}


start();