# Solar & Battery Card for Home Assistant

[![HACS Default](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/github/v/release/halfbuilthq/solar-battery-card)](https://github.com/halfbuilthq/solar-battery-card/releases)
[![CI](https://github.com/halfbuilthq/solar-battery-card/actions/workflows/ci.yml/badge.svg)](https://github.com/halfbuilthq/solar-battery-card/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/github/license/halfbuilthq/solar-battery-card)](LICENSE)

A custom Home Assistant dashboard card focused on solar generation, household
load, battery state, grid flow, and daily energy totals.

![Solar & Battery Card preview](docs/production-preview.png)

## Features

- Battery state of charge and charging/discharging outlook
- Live solar, home, battery, and grid power in kW
- Interactive 24-hour power history with mouse, touch, and keyboard inspection
- Daily generated, consumed, stored, imported, and exported energy in kWh
- Native Home Assistant visual configuration using entity selectors
- Responsive full-width dashboard layout with automatic height
- Available in the default HACS catalogue

## Configuration

```yaml
type: custom:solar-battery-card
title: Solar & storage
battery_soc: sensor.battery_state_of_charge
solar_power: sensor.solar_power
home_power: sensor.home_power
battery_power: sensor.battery_power
grid_power: sensor.grid_power
solar_energy_today: sensor.solar_energy_today
home_energy_today: sensor.home_energy_today
battery_energy_today: sensor.battery_energy_today
export_energy_today: sensor.grid_export_energy_today
battery_capacity: 27
battery_positive_is_charging: true
grid_positive_is_export: true
show_power_chart: true
```

The first five entity fields are required. Daily energy entities and usable
battery capacity are optional.

## Install with HACS

[![Open your Home Assistant instance and open this repository inside HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=halfbuilthq&repository=solar-battery-card&category=plugin)

1. Select the button above, or open **HACS → Dashboard** in Home Assistant.
2. Search for **Solar & Battery Card**—no custom repository is required.
3. Open the repository and select **Download**.
4. Refresh Home Assistant when prompted.
5. Add **Solar & Battery Card** from the dashboard card picker and configure it
   using the visual editor.

## Development

```sh
npm install
npm run dev
```

The development server opens a representative Home Assistant state fixture.

Run the complete verification:

```sh
npm run check
```

The production bundle is emitted to `dist/solar-battery-card.js`.

## Manual installation

1. Copy `dist/solar-battery-card.js` to
   `<config>/www/solar-battery-card.js`.
2. Add `/local/solar-battery-card.js` as a JavaScript module dashboard
   resource.
3. Add the card from Home Assistant's card picker and configure its entities
   in the visual editor.

## Sign conventions

The card defaults to positive battery power meaning charging and positive grid
power meaning export. Both conventions can be reversed in the visual editor.
The selected battery convention is applied consistently to the live status and
the 24-hour chart. Charging is plotted above zero and discharging below zero.

## License

[MIT](LICENSE)
