const readline = require("readline");
const chalk = require("chalk");

const { getWeather } = require("./weather");
const { searchLocation, getAutoLocation } = require("./location");

let locations = [];
let index = 0;

let data = {
    city: "Booting...",
    country: "",
    temp: "--",
    condition: "Loading...",
    wind: "--",
    precip: 0
};

let loading = false;

function clear() {
    process.stdout.write("\x1Bc");
}

function icon(text) {
    text = (text || "").toLowerCase();

    if (text.includes("thunder")) return "⛈️";
    if (text.includes("rain")) return "🌧️";
    if (text.includes("snow")) return "❄️";
    if (text.includes("cloud")) return "⛅";
    if (text.includes("clear")) return "☀️";

    return "🌦️";
}

function draw() {
    clear();

    const locationLine =
        data.country && data.country !== "Local"
            ? `${data.city}, ${data.country}`
            : data.city;

    console.log(chalk.cyan.bold("┌────────────────────────────┐"));
    console.log(chalk.cyan.bold("│        PIWEATHER           │"));
    console.log(chalk.cyan.bold("├────────────────────────────┤"));

    console.log(chalk.white("│ Location:"));
    console.log(chalk.white(`│  ${locationLine}`));

    console.log(chalk.cyan("├────────────────────────────┤"));

    console.log(chalk.green(`│ Weather: ${icon(data.condition)} ${data.condition}`));
    console.log(chalk.yellow(`│ Temp:    ${data.temp}°F`));
    console.log(chalk.blue(`│ Wind:    ${data.wind}`));
    console.log(chalk.magenta(`│ Rain:    ${data.precip}%`));

    console.log(chalk.cyan("├────────────────────────────┤"));

    console.log(chalk.gray("│ < Prev        Next >      │"));
    console.log(chalk.gray("│ T = search city           │"));
    console.log(chalk.gray("│ Q = quit                  │"));

    console.log(chalk.cyan.bold("└────────────────────────────┘"));
}

async function load(loc) {
    if (loading) return;
    loading = true;

    try {
        const w = await getWeather(loc.lat, loc.lon, loc.city);
        data = {
            city: loc.city,
            country: loc.country,
            ...w
        };
    } catch (e) {
        data = {
            city: "Weather Error",
            country: "",
            temp: "--",
            condition: "Error",
            wind: "--",
            precip: 0
        };
    }

    loading = false;
    draw();
}

async function init() {
    const auto = await getAutoLocation();
    locations.push(auto);

    load(auto);
}

async function askCity() {
    clear();
    process.stdout.write("Enter city: ");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("", async (answer) => {
        rl.close();

        const loc = await searchLocation(answer);

        if (!loc) {
            data = {
                city: answer,
                country: "Not Found",
                temp: "--",
                condition: "Invalid Location",
                wind: "--",
                precip: 0
            };
            return draw();
        }

        locations.push(loc);
        index = locations.length - 1;

        load(loc);
    });
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
    if (!key) return;

    if (key.name === "right") {
        index = (index + 1) % locations.length;
        load(locations[index]);
    }

    if (key.name === "left") {
        index = (index - 1 + locations.length) % locations.length;
        load(locations[index]);
    }

    if (key.name === "t") {
        askCity();
    }

    if (key.name === "q") {
        process.exit();
    }
});

init();
