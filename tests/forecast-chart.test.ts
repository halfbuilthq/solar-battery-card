import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SolarForecastChart } from "../src/forecast-chart";
import { config, makeHass, sensor, TestCard, textOf } from "./fixtures";
import { normalizeConfig, validateConfig } from "../src/config";
import type { SolarBatteryCardConfig } from "../src/types";

class Chart extends SolarForecastChart { renderForTest() { return this.render(); } }
type Internals = { _selected?: number; navigate(event: KeyboardEvent, start: number, end: number, now: number): void };
const asInternal = (chart: Chart) => chart as unknown as Internals;
function chart() {
  const chart = new Chart();
  chart.config = { ...config, solar_forecast_today: "sensor.forecast", show_forecast_line: true };
  chart.hass = makeHass();
  chart.hass.states["sensor.forecast"] = sensor(28.6, "kWh");
  return chart;
}
beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date("2026-10-11T12:00:00Z")); });
afterEach(() => vi.useRealTimers());

describe("forecast chart", () => {
  it("is opt-in, uses one chart, and follows the power chart visibility", () => {
    const card = new TestCard(); card.hass = makeHass();
    card.setConfig(config); expect(card.getCardSize()).toBe(12);
    expect(normalizeConfig(config).show_forecast_line).toBe(false);
    card.setConfig({ ...config, show_forecast_line: true });
    expect(card.getCardSize()).toBe(12);
    expect(textOf(card.renderForTest())).not.toContain("Power · 24 hours");
    card.setConfig({ ...config, show_power_chart: false, show_forecast_line: true });
    expect(card.getCardSize()).toBe(8);
    expect(textOf(card.renderForTest())).not.toContain("Power · 24 hours");
  });
  it("renders a daily target in selected energy units and localizes its labels", () => {
    const c = chart();
    expect(textOf(c.renderForTest())).toContain("Daily target 28.6 kWh");
    c.config = { ...c.config!, energy_unit: "Wh" };
    expect(textOf(c.renderForTest())).toContain("Daily target 28,600 Wh");
    c.hass!.locale = { language: "de-DE" };
    expect(textOf(c.renderForTest())).toContain("Tagesziel 28.600 Wh");
  });
  it("supports keyboard inspection and never displays future power", () => {
    const c = chart();
    const internal = asInternal(c);
    const start = Date.parse("2026-10-11T00:00:00Z"); const end = start + 86_400_000;
    internal.navigate({ key: "End", preventDefault: vi.fn() } as unknown as KeyboardEvent, start, end, Date.now());
    expect(textOf(c.renderForTest())).toContain("Solar —");
    expect(textOf(c.renderForTest())).toContain("24:00");
    internal.navigate({ key: "Escape" } as KeyboardEvent, start, end, Date.now());
    expect(internal._selected).toBeUndefined();
  });
  it("handles missing forecasts and failed history without a synthetic curve", () => {
    const c = chart(); delete c.hass!.states["sensor.forecast"];
    c.historyFailed = true;
    const output = textOf(c.renderForTest());
    expect(output).toContain("Forecast unavailable");
    expect(output).toContain("Power history unavailable");
    expect(c.history).toEqual([]);
    expect(output).toContain("Solar 1.23 kW");
  });
  it("keeps power readings independent from the forecast energy scale and battery sign", () => {
    const c = chart();
    c.config = { ...c.config!, battery_positive_is_charging: false, power_unit: "W", energy_unit: "Wh" };
    const output = textOf(c.renderForTest());
    expect(output).toContain("Solar 1,234 W");
    expect(output).toContain("Battery -1,000 W");
    expect(output).toContain("Daily target 28,600 Wh");
  });
  it("excludes yesterday and future power samples from inspection", () => {
    const c = chart();
    c.history = [
      { timestamp: Date.parse("2026-10-10T23:00Z"), solar: 999, home: 999, battery: 999 },
      { timestamp: Date.parse("2026-10-11T13:00Z"), solar: 999, home: 999, battery: 999 }
    ];
    asInternal(c)._selected = Date.parse("2026-10-11T13:00Z");
    expect(textOf(c.renderForTest())).toContain("Solar —");
    expect(textOf(c.renderForTest())).not.toContain("999");
  });

});

describe("forecast mapping validation", () => {
  it("preserves mappings and explicit false values in editor round trips", () => {
    const value = normalizeConfig({ ...config, solar_forecast_mode: "hourly", solar_forecast_attribute: "data.periods", solar_forecast_time_is_end: false });
    expect(value.solar_forecast_attribute).toBe("data.periods");
    expect(value.solar_forecast_time_is_end).toBe(false);
    expect(() => validateConfig(value)).not.toThrow();
  });
  it.each([
    { solar_forecast_mode: "weekly" },
    { show_forecast_line: "true" },
    { solar_forecast_mode: "hourly", solar_forecast_input_unit: "%" },
    { solar_forecast_mode: "hourly", solar_forecast_attribute: "data[0]" },
    { solar_forecast_mode: "hourly", solar_forecast_interval_minutes: 0 },
    { solar_forecast_mode: "hourly", solar_forecast_interval_minutes: 1441 },
    { solar_forecast_mode: "hourly", solar_forecast_interval_minutes: NaN },
    { solar_forecast_mode: "hourly", solar_forecast_interval_minutes: 30.5 }
  ])("rejects invalid settings %j", changes => {
    expect(() => validateConfig({ ...config, ...changes } as SolarBatteryCardConfig)).toThrow();
  });
});
