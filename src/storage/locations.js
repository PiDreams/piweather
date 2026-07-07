const fs = require("fs");
const path = require("path");

const FILE = path.join(
    __dirname,
    "../../data/locations.json"
);

function loadLocations() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]");
    }

    return JSON.parse(
        fs.readFileSync(FILE, "utf8")
    );
}


function saveLocations(locations) {
    fs.writeFileSync(
        FILE,
        JSON.stringify(locations, null, 2)
    );
}


function addLocation(location) {
    const locations = loadLocations();

    const exists = locations.some(
        item =>
            item.latitude === location.latitude &&
            item.longitude === location.longitude
    );


    if (!exists) {
        locations.push(location);
        saveLocations(locations);
    }

    return loadLocations();
}


function removeLocation(index) {
    const locations = loadLocations();

    if (locations[index]) {
        locations.splice(index, 1);
        saveLocations(locations);
    }

    return loadLocations();
}


function getLocations() {
    return loadLocations();
}


module.exports = {
    getLocations,
    addLocation,
    removeLocation
};