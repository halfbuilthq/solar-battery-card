import type { HassEntity, HomeAssistant, SolarBatteryCardConfig } from "../src/types";
import { SolarBatteryCard } from "../src/solar-battery-card";

export const config: SolarBatteryCardConfig = {
  type: "custom:solar-battery-card",
  battery_soc: "sensor.soc",
  solar_power: "sensor.solar",
  home_power: "sensor.home",
  battery_power: "sensor.battery",
  grid_power: "sensor.grid",
  solar_energy_today: "sensor.generated",
  home_energy_today: "sensor.consumed",
  battery_energy_today: "sensor.stored",
  export_energy_today: "sensor.exported"
};

export function sensor(value: string | number, unit: string): HassEntity {
  return { entity_id: "sensor.test", state: String(value), attributes: { unit_of_measurement: unit } };
}

export function makeHass(): HomeAssistant {
  return {
    states: {
      "sensor.soc": sensor(50, "%"),
      "sensor.solar": sensor(1234, "W"),
      "sensor.home": sensor(2, "kW"),
      "sensor.battery": sensor(1, "kW"),
      "sensor.grid": sensor(-0.5, "kW"),
      "sensor.generated": sensor(12.4, "kWh"),
      "sensor.consumed": sensor(3, "kWh"),
      "sensor.stored": sensor(2, "kWh"),
      "sensor.exported": sensor(1, "kWh")
    },
    locale: { language: "en-US" },
    callApi: async <T>() => [] as T
  };
}

export class TestCard extends SolarBatteryCard {
  renderForTest() { return this.render(); }
}

export function textOf(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(textOf).join(" ");
  if (value && typeof value === "object" && "values" in value && Array.isArray(value.values)) {
    return value.values.map(textOf).join(" ");
  }
  return "";
}
