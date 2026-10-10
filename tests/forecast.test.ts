import { describe, expect, it } from "vitest";
import { forecastInKwh } from "../src/values";
import { config, makeHass, sensor, TestCard, textOf } from "./fixtures";
import { normalizeConfig, validateConfig } from "../src/config";
import type { SolarBatteryCardConfig } from "../src/types";

describe("solar forecast", () => {
  it.each([[18600, "Wh"], [18.6, "kWh"], [0.0186, "MWh"], [18.6, " kWh "]])("normalizes %s %s", (value, unit) => {
    expect(forecastInKwh(sensor(value, unit))).toBeCloseTo(18.6);
  });
  it.each(["unknown", "unavailable", "none", "", " ", "NaN", "Infinity", "-1"])("rejects %s", value => {
    expect(forecastInKwh(sensor(value, "kWh"))).toBeUndefined();
  });
  it.each(["W", "kW", "%", "", "foo"])("rejects unit %s", unit => {
    expect(forecastInKwh(sensor(18, unit))).toBeUndefined();
  });
  it("accepts zero and handles a missing entity", () => {
    expect(forecastInKwh(sensor(0, "kWh"))).toBe(0);
    expect(forecastInKwh(undefined)).toBeUndefined();
  });
  it("hides an unconfigured forecast and independently displays configured states", () => {
    const card = new TestCard();
    card.hass = makeHass();
    card.setConfig(config);
    expect(textOf(card.renderForTest())).not.toContain("Forecast today");
    card.setConfig({ ...config, solar_energy_today: undefined, solar_forecast_today: "sensor.forecast", energy_unit: "Wh" });
    expect(textOf(card.renderForTest())).toMatch(/Forecast today\s+—/);
    card.hass.states["sensor.forecast"] = sensor(18.6, "kWh");
    expect(textOf(card.renderForTest())).toMatch(/Forecast today\s+18,600 Wh/);
    card.hass.states["sensor.forecast"] = sensor(0, "kWh");
    expect(textOf(card.renderForTest())).toMatch(/Forecast today\s+0 Wh/);
    card.hass.locale = { language: "de-DE" };
    expect(textOf(card.renderForTest())).toContain("Prognose heute");
  });
  it("validates the entity and permits clearing it", () => {
    expect(normalizeConfig({ ...config, solar_forecast_today: "" }).solar_forecast_today).toBeUndefined();
    expect(() => validateConfig({ ...config, solar_forecast_today: "sensor.forecast" })).not.toThrow();
    expect(() => validateConfig({ ...config, solar_forecast_today: 12 } as unknown as SolarBatteryCardConfig)).toThrow("sensor entity ID");
  });
});
