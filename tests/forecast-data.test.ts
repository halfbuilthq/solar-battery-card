import { describe, expect, it } from "vitest";
import { energyAt, localDay, solarForecast } from "../src/forecast";
import { config, sensor } from "./fixtures";
import type { SolarBatteryCardConfig } from "../src/types";

const day = localDay(new Date("2026-10-11T12:00:00Z"), "UTC");
const hourly = { ...config, solar_forecast_mode: "hourly" } as const;
const rows = (start = day.start, end = day.end, minutes = 60, value: unknown = 1) =>
  Array.from({ length: Math.ceil((end - start) / (minutes * 60_000)) }, (_, i) => ({ start: new Date(start + i * minutes * 60_000).toISOString(), energy: value }));
function source(data: unknown) { return { ...sensor("unknown", ""), attributes: { forecast: data } }; }

describe("local forecast day", () => {
  it.each([
    ["2026-03-29T12:00:00Z", "Europe/Berlin", 23],
    ["2026-10-25T12:00:00Z", "Europe/Berlin", 25],
    ["2026-10-04T12:00:00Z", "Australia/Sydney", 23],
    ["2026-04-05T12:00:00Z", "Australia/Sydney", 25]
  ])("respects DST on %s in %s", (date, zone, hours) => {
    const window = localDay(new Date(date), zone);
    expect((window.end - window.start) / 3_600_000).toBe(hours);
    const forecast = solarForecast(source(rows(window.start, window.end)), hourly, window);
    expect(forecast.totalKwh).toBe(hours);
  });
  it("uses HA's date rather than UTC or the browser's date", () => {
    const window = localDay(new Date("2026-10-11T18:00:00Z"), "Australia/Sydney");
    expect(new Date(window.start).toISOString()).toBe("2026-10-11T13:00:00.000Z");
    expect(new Date(window.end).toISOString()).toBe("2026-10-12T13:00:00.000Z");
  });
});

describe("forecast series", () => {
  it("draws a daily total as a horizontal target, including zero", () => {
    for (const value of [0, 28.6]) {
      const result = solarForecast(sensor(value, "kWh"), config, day);
      expect(result).toEqual({ status: "ok", totalKwh: value, points: [
        { timestamp: day.start, kwh: value }, { timestamp: day.end, kwh: value }
      ] });
    }
  });
  it.each([["Wh", 1000], ["kWh", 1], ["MWh", .001], ["W", 1000], ["kW", 1]] as const)("converts %s intervals to cumulative energy", (unit, value) => {
    const result = solarForecast(source(rows(day.start, day.end, 60, value)), { ...hourly, solar_forecast_input_unit: unit }, day);
    expect(result.status).toBe("ok");
    expect(result.totalKwh).toBeCloseTo(24);
    expect(result.points[12]).toEqual({ timestamp: day.start + 12 * 3_600_000, kwh: 12 });
  });
  it("supports half-hour average power, end timestamps, nested fields and unordered records", () => {
    const records = rows(day.start + 1_800_000, day.end + 1_800_000, 30, "2000")
      .reverse().map(row => ({ period: { end: row.start }, power: { average: row.energy } }));
    const entity = { ...sensor("unknown", ""), attributes: { data: { records } } };
    const result = solarForecast(entity, { ...hourly,
      solar_forecast_attribute: "data.records", solar_forecast_time_field: "period.end",
      solar_forecast_value_field: "power.average", solar_forecast_input_unit: "W",
      solar_forecast_time_is_end: true, solar_forecast_interval_minutes: 30
    }, day);
    expect(result.totalKwh).toBe(48);
    expect(result.points).toHaveLength(49);
  });
  it("clips intervals at midnight and prorates energy across the boundary", () => {
    const result = solarForecast(source(rows(day.start - 1_800_000, day.end + 1_800_000)), hourly, day);
    expect(result.totalKwh).toBe(24);
    expect(result.points[1].kwh).toBe(.5);
  });
  it("ignores other days and respects explicit timestamp offsets", () => {
    const data = rows(day.start, day.end);
    data[0].start = "2026-10-11T11:00:00+11:00";
    const result = solarForecast(source([...rows(day.start - 86_400_000, day.start), ...data, ...rows(day.end, day.end + 86_400_000)]), hourly, day);
    expect(result.totalKwh).toBe(24);
  });
  it("does not assume missing hours are zero", () => {
    for (const data of [rows().slice(1), rows().slice(0, -1), rows().filter((_, i) => i !== 12)]) {
      expect(solarForecast(source(data), hourly, day)).toEqual({ status: "incomplete", points: [] });
    }
  });
  it.each([null, true, "", " ", "NaN", "Infinity", -1])("rejects invalid interval value %s", value => {
    expect(solarForecast(source(rows(day.start, day.end, 60, value)), hourly, day).status).toBe("invalid");
  });
  it("rejects duplicate/overlapping records and timezone-free timestamps", () => {
    expect(solarForecast(source([...rows(), rows()[0]]), hourly, day).status).toBe("invalid");
    const data = rows(); data[0].start = "2026-10-11T00:00:00";
    expect(solarForecast(source(data), hourly, day).status).toBe("invalid");
  });
  it("rejects missing arrays and non-finite accumulated energy", () => {
    expect(solarForecast(source({}), hourly, day).status).toBe("missing");
    expect(solarForecast(undefined, hourly, day).status).toBe("missing");
    expect(solarForecast(source(rows(day.start, day.end, 60, Number.MAX_VALUE)), hourly, day).status).toBe("invalid");
    expect(solarForecast(source(rows()), { ...hourly, solar_forecast_input_unit: "invalid" } as unknown as SolarBatteryCardConfig, day).status).toBe("invalid");
  });
});

describe("chart interpolation", () => {
  it("interpolates only inside available segments", () => {
    const segments = [[{ timestamp: 0, kwh: 0 }, { timestamp: 100, kwh: 10 }]];
    expect(energyAt(segments, 50)).toBe(5);
    expect(energyAt(segments, -1)).toBeUndefined();
    expect(energyAt(segments, 101)).toBeUndefined();
  });
});
