#!/bin/bash

cd "$(dirname "$0")"

echo "Starting PiWeather setup..."

if ! command -v node >/dev/null 2>&1; then
    echo "Node.js is required."
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "npm is required."
    exit 1
fi

mkdir -p data

if [ ! -f data/locations.json ]; then
    echo "[]" > data/locations.json
fi

if [ ! -d node_modules ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Launching PiWeather..."

node index.js