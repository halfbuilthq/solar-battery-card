import { describe, expect, it } from "vitest";
import {
  cardTitle,
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

  it("localizes only a missing title and preserves every explicit title", () => {
    expect(cardTitle(validConfig, "de-DE")).toBe("Solar & Speicher");
    expect(
      cardTitle({ ...validConfig, title: "Solar & storage" }, "de-DE")
    ).toBe("Solar & storage");
    expect(
      cardTitle({ ...validConfig, title: "Garage solar" }, "de-DE")
    ).toBe("Garage solar");
  });

  it("provides a built-in HA form schema and stub config", () => {
    const form = getConfigForm();
    const stub = getStubConfig();
    expect(form.schema.length).toBeGreaterThan(0);
    expect(stub.type).toBe("custom:solar-battery-card");
    expect(stub).not.toHaveProperty("title");
  });
});

describe("display configuration", () => {
  it("defaults cleared units and accepts supported choices", () => {
    expect(normalizeConfig(validConfig)).toMatchObject({ power_unit: "kW", energy_unit: "kWh" });
    expect(() => validateConfig({ ...validConfig, power_unit: "W", energy_unit: "Wh" })).not.toThrow();
    expect(normalizeConfig({ ...validConfig, power_unit: null } as unknown as SolarBatteryCardConfig).power_unit).toBe("kW");
  });
  it("rejects unsupported units", () => {
    expect(() => validateConfig({ ...validConfig, power_unit: "kWh" } as unknown as SolarBatteryCardConfig)).toThrow("Power display unit");
    expect(() => validateConfig({ ...validConfig, energy_unit: "W" } as unknown as SolarBatteryCardConfig)).toThrow("Energy display unit");
  });
});

describe("battery configuration", () => {
  it("preserves legacy capacity without inferring total capacity", () => {
    const normalized = normalizeConfig({ ...validConfig, battery_capacity: 4.608 });
    expect(normalized.battery_capacity).toBe(4.608);
    expect(normalized.battery_total_capacity).toBeUndefined();
    expect(normalized.battery_lower_soc).toBe(0);
    expect(() => validateConfig({ ...validConfig, battery_capacity: 0 })).not.toThrow();
  });
  it("accepts both fields and supports clearing optional inputs", () => {
    expect(() => validateConfig({ ...validConfig, battery_capacity: 4.608, battery_total_capacity: 5.12, battery_lower_soc: 10 })).not.toThrow();
    const cleared = normalizeConfig({ ...validConfig, battery_total_capacity: null, battery_lower_soc: "" } as unknown as SolarBatteryCardConfig);
    expect(cleared.battery_total_capacity).toBeUndefined();
    expect(cleared.battery_lower_soc).toBe(0);
    expect(() => validateConfig(cleared)).not.toThrow();
  });
  it.each([0, -1, Infinity, NaN, "5.12"])("rejects total capacity %s", value => {
    expect(() => validateConfig({ ...validConfig, battery_total_capacity: value } as SolarBatteryCardConfig)).toThrow("Total battery capacity");
  });
  it.each([-1, 100, Infinity, NaN, "10"])("rejects reserve %s", value => {
    expect(() => validateConfig({ ...validConfig, battery_total_capacity: 5.12, battery_lower_soc: value } as SolarBatteryCardConfig)).toThrow("Lower SOC limit");
  });
  it("requires total capacity for a nonzero reserve, including with a legacy capacity", () => {
    expect(() => validateConfig({ ...validConfig, battery_capacity: 5.12, battery_lower_soc: 10 })).toThrow("Set total battery capacity");
    expect(() => validateConfig({ ...validConfig, battery_lower_soc: 0 })).not.toThrow();
  });
});
