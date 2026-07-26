import { describe, expect, it } from "vitest";
import {
  getConfigForm,
  getStubConfig,
  normalizeConfig,
  validateConfig
} from "../src/config";
import type { SolarBatteryCardConfig } from "../src/types";

const validConfig: SolarBatteryCardConfig = {
  type: "custom:solar-battery-card",
  battery_soc: "sensor.battery_soc",
  solar_power: "sensor.solar_power",
  home_power: "sensor.home_power",
  battery_power: "sensor.battery_power",
  grid_power: "sensor.grid_power"
};

describe("card configuration", () => {
  it("requires the five live entities", () => {
    expect(() => validateConfig(validConfig)).not.toThrow();
    expect(() => validateConfig({ ...validConfig, grid_power: "" })).toThrow(
      "Grid power is required"
    );
  });

  it("applies safe sign and chart defaults", () => {
    expect(normalizeConfig(validConfig)).toMatchObject({
      battery_positive_is_charging: true,
      grid_positive_is_export: true,
      show_power_chart: true
    });
  });

  it("provides a built-in HA form schema and stub config", () => {
    const form = getConfigForm();
    expect(form.schema.length).toBeGreaterThan(0);
    expect(getStubConfig().type).toBe("custom:solar-battery-card");
  });
});

