const chalk = require("chalk");


function weatherIcon(condition = "") {

    const text = condition.toLowerCase();

    if (text.includes("thunder")) return "⛈️";
    if (text.includes("rain") || text.includes("shower")) return "🌧️";
    if (text.includes("snow")) return "❄️";
    if (text.includes("fog") || text.includes("mist")) return "🌫️";
    if (text.includes("cloud")) return "☁️";

    return "☀️";
}


function line() {
    console.log(chalk.gray("────────────────────────────"));
}


function loading() {

    console.clear();

    console.log(
        chalk.cyan(`
        ██████╗ ██╗ █████╗
        ██╔══██╗██║██╔══██╗
        ██████╔╝██║███████║
        ██╔═══╝ ██║██╔══██║
        ██║     ██║██║  ██║
        ╚═╝     ╚═╝╚═╝  ╚═╝
        `)
    );

    console.log(
        chalk.white("              PiWeather")
    );

    console.log();

    console.log(
        chalk.yellow("           Loading weather...")
    );

}



function render(location, weather) {

    console.clear();


    const icon =
        weatherIcon(weather.condition);


    console.log(
        chalk.cyan.bold(`
╭────────────────────────────╮
│          PIWEATHER         │
╰────────────────────────────╯
`)
    );


    console.log(
        chalk.white.bold("📍 Location")
    );

    console.log(
        `   ${location.city}`
    );

    if (location.state) {
        console.log(
            `   ${location.state}, ${location.country}`
        );
    } else {
        console.log(
            `   ${location.country}`
        );
    }


    line();


    console.log(
        chalk.white.bold("🌤 Weather")
    );

    console.log(
        `   ${icon} ${weather.condition}`
    );


    line();


    console.log(
        chalk.white.bold("🌡 Temperature")
    );

    console.log(
        `   ${weather.temperature}°${weather.unit}`
    );


    console.log(
        chalk.white.bold("💨 Wind")
    );

    console.log(
        `   ${weather.wind}`
    );


    console.log(
        chalk.white.bold("🌧 Rain Chance")
    );

    console.log(
        `   ${weather.rain}%`
    );


    line();


    console.log(
        chalk.gray(
`Last updated: ${new Date().toLocaleTimeString()}`
        )
    );


    console.log();


    console.log(
        chalk.cyan(
`< Prev     Next >

[T] Add Location
[L] Locations
[R] Remove
[Q] Quit`
        )
    );

}



function error(message) {

    console.clear();

    console.log(
        chalk.red.bold(`
╭────────────────────────────╮
│          ERROR             │
╰────────────────────────────╯
`)
    );

    console.log(message);

}


module.exports = {
    loading,
    render,
    error
};