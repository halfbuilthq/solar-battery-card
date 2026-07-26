import "../src/solar-battery-card";
import type { HassEntity, HomeAssistant } from "../src/types";
import type { SolarBatteryCard } from "../src/solar-battery-card";
import "./styles.css";

function sensor(
  entityId: string,
  state: number,
  unit: string,
  deviceClass: string
): HassEntity {
  return {
    entity_id: entityId,
    state: String(state),
    last_changed: new Date().toISOString(),
    attributes: {
      friendly_name: entityId
        .split(".")[1]
        .split("_")
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join(" "),
      unit_of_measurement: unit,
      device_class: deviceClass
    }
  };
}

const states: Record<string, HassEntity> = {
  "sensor.battery_state_of_charge": sensor(
    "sensor.battery_state_of_charge",
    78,
    "%",
    "battery"
  ),
  "sensor.solar_power": sensor("sensor.solar_power", 5360, "W", "power"),
  "sensor.home_power": sensor("sensor.home_power", 2370, "W", "power"),
  "sensor.battery_power": sensor("sensor.battery_power", 2150, "W", "power"),
  "sensor.grid_power": sensor("sensor.grid_power", 840, "W", "power"),
  "sensor.solar_energy_today": sensor(
    "sensor.solar_energy_today",
    21.4,
    "kWh",
    "energy"
  ),
  "sensor.home_energy_today": sensor(
    "sensor.home_energy_today",
    11.9,
    "kWh",
    "energy"
  ),
  "sensor.battery_energy_today": sensor(
    "sensor.battery_energy_today",
    6.8,
    "kWh",
    "energy"
  ),
  "sensor.grid_export_energy_today": sensor(
    "sensor.grid_export_energy_today",
    2.7,
    "kWh",
    "energy"
  )
};

const profiles: Record<string, number[]> = {
  "sensor.solar_power": [0, 40, 180, 900, 2700, 4400, 5360, 5000, 3750, 1700, 500],
  "sensor.home_power": [1450, 1400, 1500, 1700, 1900, 1950, 2300, 2200, 2500, 2420, 2370],
  "sensor.battery_power": [0, 0, 50, 300, 850, 1550, 2150, 2050, 1500, 700, 250]
};

const hass: HomeAssistant = {
  states,
  locale: {
    language: "en-AU",
    number_format: "language",
    time_format: "12"
  },
  async callApi<T>(_method: "GET" | "POST" | "PUT" | "DELETE", _path: string) {
    const now = Date.now();
    const response = Object.entries(profiles).map(([entityId, values]) =>
      values.map((value, index) => ({
        ...states[entityId],
        state: String(value),
        last_changed: new Date(
          now - (values.length - 1 - index) * 2.4 * 60 * 60 * 1000
        ).toISOString()
      }))
    );
    return response as T;
  }
};

const card = document.querySelector("solar-battery-card") as SolarBatteryCard;
card.setConfig({
  type: "custom:solar-battery-card",
  title: "Solar & storage",
  battery_soc: "sensor.battery_state_of_charge",
  solar_power: "sensor.solar_power",
  home_power: "sensor.home_power",
  battery_power: "sensor.battery_power",
  grid_power: "sensor.grid_power",
  solar_energy_today: "sensor.solar_energy_today",
  home_energy_today: "sensor.home_energy_today",
  battery_energy_today: "sensor.battery_energy_today",
  export_energy_today: "sensor.grid_export_energy_today",
  battery_capacity: 27,
  battery_positive_is_charging: true,
  grid_positive_is_export: true,
  show_power_chart: true
});
card.hass = hass;

