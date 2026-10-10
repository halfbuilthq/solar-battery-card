import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { config, makeHass, TestCard, textOf } from "./fixtures";
import type { HistoryPoint } from "../src/types";

beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date("2026-10-11T12:00:00Z")); });
afterEach(() => vi.useRealTimers());

describe("card display units", () => {
  it("converts all live and daily values without changing the charging forecast", () => {
    const card = new TestCard();
    card.hass = makeHass();
    card.setConfig({ ...config, battery_capacity: 10 });
    const original = textOf(card.renderForTest());
    expect(original).toContain("1.23 kW");
    expect(original).toContain("12.4 kWh");
    card.setConfig({ ...config, battery_capacity: 10, power_unit: "W", energy_unit: "Wh" });
    const changed = textOf(card.renderForTest());
    for (const value of ["1,234 W", "2,000 W", "+1,000 W", "-500 W", "12,400 Wh", "3,000 Wh", "2,000 Wh", "1,000 Wh"]) {
      expect(changed).toContain(value);
    }
    expect(changed.match(/Full by [^ ]+ [AP]M/)?.[0]).toBe(original.match(/Full by [^ ]+ [AP]M/)?.[0]);
    expect(changed).not.toContain("kW");
  });

  it("changes tooltip units without changing the SVG paths", () => {
    const card = new TestCard();
    const chart = card as unknown as {
      _activeChartIndex: number;
      _renderChart(points: HistoryPoint[], locale: string): unknown;
    };
    const points = [{ timestamp: 0, solar: 1.234, home: 2, battery: -0.5 }];
    chart._activeChartIndex = 0;
    card.setConfig(config);
    const before = textOf(chart._renderChart(points, "en-US"));
    card.setConfig({ ...config, power_unit: "W" });
    const after = textOf(chart._renderChart(points, "en-US"));
    expect(after).toContain("1,234 W");
    expect(after).toContain("2,000 W");
    expect(after).toContain("-500 W");
    expect(after.match(/M [^ ]+ [^ ]+ L [^ ]+ [^ ]+/g)).toEqual(before.match(/M [^ ]+ [^ ]+ L [^ ]+ [^ ]+/g));
  });
});

describe("battery model integration", () => {
  it("opts into total capacity, gives it precedence, and restores the legacy path", () => {
    const card = new TestCard();
    card.hass = makeHass();
    card.setConfig({ ...config, battery_capacity: 10 });
    const legacy = textOf(card.renderForTest());
    card.setConfig({ ...config, battery_capacity: 10, battery_total_capacity: 5.12, battery_lower_soc: 10 });
    const advanced = textOf(card.renderForTest());
    expect(advanced).toContain("Full by");
    expect(advanced).not.toBe(legacy);
    card.setConfig({ ...config, battery_total_capacity: 5.12, battery_lower_soc: 10 });
    expect(textOf(card.renderForTest())).toBe(advanced);
    card.setConfig({ ...config, battery_capacity: 10 });
    expect(textOf(card.renderForTest())).toBe(legacy);
  });
  it("respects battery sign settings and keeps forecasts independent of display/solar forecast", () => {
    const card = new TestCard();
    card.hass = makeHass();
    const advanced = { ...config, battery_total_capacity: 5.12, battery_lower_soc: 10, battery_positive_is_charging: false };
    card.setConfig(advanced);
    const before = textOf(card.renderForTest());
    expect(before).toContain("Reserve reached by");
    card.setConfig({ ...advanced, power_unit: "W", energy_unit: "Wh", solar_forecast_today: "sensor.forecast" });
    const after = textOf(card.renderForTest());
    const expectedForecast = before.match(/Reserve reached by [0-9]+:[0-9]+ [AP]M/)?.[0];
    expect(expectedForecast).toBeDefined();
    expect(after).toContain(expectedForecast);
    expect(after).toContain("-1,000 W");
    card.hass.states["sensor.battery"].state = "-1";
    expect(textOf(card.renderForTest())).toContain("Full by");
    card.hass.states["sensor.soc"].state = "5";
    card.hass.states["sensor.battery"].state = "1";
    expect(textOf(card.renderForTest())).toContain("At/below reserve");
  });
  it("never substitutes zero SOC into the advanced estimator for an unavailable reading", () => {
    const card = new TestCard();
    card.hass = makeHass();
    card.setConfig({ ...config, battery_total_capacity: 5.12 });
    card.hass.states["sensor.soc"].state = "unavailable";
    expect(textOf(card.renderForTest())).not.toContain("Full by");
    card.hass.states["sensor.soc"].state = "50";
    card.hass.states["sensor.battery"].state = "unavailable";
    expect(textOf(card.renderForTest())).not.toContain("Full by");
  });
});
