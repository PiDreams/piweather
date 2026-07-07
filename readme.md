# 🌦️ PiWeather

A lightweight terminal-based weather dashboard designed to run like a dedicated Raspberry Pi weather device.

PiWeather provides real-time weather information, automatic location detection, saved locations, and an interactive terminal interface with keyboard controls.

---

## ✨ Features

- 🌍 Automatic location detection
- 🔎 Search locations worldwide
- 💾 Save and manage multiple locations
- 🔄 Switch between saved locations
- 🌤 Real-time weather updates
- 🌡 Temperature monitoring
- 💨 Wind speed information
- 🌧 Precipitation probability
- 🌫 Weather condition icons
- 🎨 Modern colored terminal interface
- 🖥 Raspberry Pi-inspired dashboard design
- 🔑 No API keys required

---

## 📸 Preview

```
╭────────────────────────────╮
│          PIWEATHER         │
╰────────────────────────────╯

📍 Location
   South Bend International Airport
   Indiana, United States

────────────────────────────

🌤 Weather
   🌫️ Mostly Clear then Patchy Fog

🌡 Temperature
   62°F

💨 Wind
   0 to 5 mph

🌧 Rain Chance
   0%

────────────────────────────

Last updated: 10:42 PM

< Prev     Next >

[T] Add Location
[L] Locations
[R] Remove
[Q] Quit
```

---

# 🚀 Installation

## Requirements

- Node.js 18+
- npm
- Internet connection

---

## Install

Clone the repository:

```bash
git clone https://github.com/pidreams/piweather.git
```

Enter the directory:

```bash
cd piweather
```

Run the installer:

```bash
chmod +x start.sh
./start.sh
```

The startup script will:

- Check your environment
- Install dependencies
- Create required directories
- Create storage files
- Start PiWeather

---

# 🛠 Manual Setup

Install dependencies:

```bash
npm install
```

Start PiWeather:

```bash
node index.js
```

---

# ⌨️ Controls

| Key | Action |
| --- | --- |
| ← | Previous location |
| → | Next location |
| T | Add/search location |
| L | View saved locations |
| R | Remove current location |
| Q | Quit PiWeather |

---

# 🌎 Location Support

PiWeather supports locations worldwide.

Examples:

- United States
- Canada
- United Kingdom
- Europe
- Asia
- Australia
- Any supported city worldwide

Locations can be searched and saved directly inside PiWeather.

---

# 🗂 Project Structure

```
piweather/
│
├── index.js
├── start.sh
├── package.json
├── package-lock.json
│
├── src/
│   ├── api/
│   │   ├── weather.js
│   │   ├── geocode.js
│   │   └── location.js
│   │
│   ├── controls/
│   │   └── keyboard.js
│   │
│   ├── storage/
│   │   └── locations.js
│   │
│   └── ui/
│       └── display.js
│
└── data/
    └── locations.json
```

---

# 🔧 Storage

PiWeather stores saved locations locally.

Saved locations are stored in:

```
data/locations.json
```

Your saved locations will remain available after restarting PiWeather.

---

# 🌐 APIs

PiWeather uses free services that do not require API keys.

Used for:

- Weather data
- Location searching
- Automatic location detection

---

# 🖥 Raspberry Pi Support

PiWeather is designed for Raspberry Pi devices and small terminal displays.

Possible uses:

- Raspberry Pi weather station
- Desktop terminal dashboard
- Home weather display
- Dedicated weather device

---

# 🛣 Roadmap

Future features:

- [ ] Touchscreen support
- [ ] Weather alerts
- [ ] Radar display
- [ ] Custom themes
- [ ] Boot animations
- [ ] Hardware sensor support
- [ ] Full kiosk mode
- [ ] Web dashboard

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

# 📄 License

MIT License

---

# 💙 Created by PiDreams

Built for Raspberry Pi enthusiasts, developers, and anyone who wants a simple weather dashboard in their terminal.