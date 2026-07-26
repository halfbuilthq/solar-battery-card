# Solar & Battery Card for Home Assistant

A custom Home Assistant dashboard card focused on solar generation, household
load, battery state, grid flow, and daily energy totals.

## Status

Design direction approved. The next milestone is the production Home Assistant
card and native `getConfigForm()` editor schema.

The verified visual prototype is preserved in [`prototype/`](prototype/).

## Planned card

- Battery state of charge and charging/discharging outlook
- Live solar, home, battery, and grid power in kW
- 24-hour power history
- Daily generated, consumed, stored, imported, and exported energy in kWh
- Native Home Assistant visual configuration using entity selectors
- Responsive dashboard layout
- HACS-compatible packaging

## Proposed configuration

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
grid_energy_today: sensor.grid_export_energy_today
```

Entity names and sign conventions will be finalized during implementation.

## Prototype

```sh
cd prototype
npm install
npm run dev
```

The prototype is a design reference, not the production Home Assistant card.

