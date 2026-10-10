import { describe, expect, it } from "vitest";
import type { HassEntity } from "../src/types";
import {
  energyInKwh,
  estimateFullTime,
  formatValue,
  formatPower,
  formatEnergy,
  numericState,
  powerInKw
} from "../src/values";

function state(value: string, unit: string): HassEntity {
  return {
    entity_id: "sensor.test",
    state: value,
    attributes: { unit_of_measurement: unit }
  };
}

describe("entity values", () => {
  it("normalizes watts and watt-hours", () => {
    expect(powerInKw(state("5360", "W"))).toBe(5.36);
    expect(energyInKwh(state("21400", "Wh"))).toBe(21.4);
  });

  it("preserves kilowatt units and signs", () => {
    expect(powerInKw(state("-2.15", "kW"))).toBe(-2.15);
    expect(energyInKwh(state("6.8", "kWh"))).toBe(6.8);
  });

  it("treats unavailable states as missing", () => {
    expect(numericState(state("unavailable", "W"))).toBeUndefined();
    expect(numericState(state("not-a-number", "W"))).toBeUndefined();
  });

  it("formats numbers with the supplied locale", () => {
    expect(formatValue(1234.5, "kW", { digits: 1, locale: "en-US" })).toBe(
      "1,234.5 kW"
    );
    expect(formatValue(1234.5, "kW", { digits: 1, locale: "de-DE" })).toBe(
      "1.234,5 kW"
    );
  });
});

describe("battery forecast", () => {
  it("estimates a full time from usable capacity and charge power", () => {
    const now = new Date("2026-07-26T12:00:00+10:00");
    const full = estimateFullTime(75, 2.5, 10, now);
    expect(full?.getTime()).toBe(now.getTime() + 60 * 60 * 1000);
  });

  it("does not forecast while idle or discharging", () => {
    expect(estimateFullTime(75, 0, 10)).toBeUndefined();
    expect(estimateFullTime(75, -2, 10)).toBeUndefined();
  });
});

describe("display units", () => {
  it("preserves defaults and formats base units without decimals", () => {
    expect(formatPower(1.234, undefined, { locale: "en-US" })).toBe("1.23 kW");
    expect(formatPower(-1.234, "W", { signed: true, locale: "en-US" })).toBe("-1,234 W");
    expect(formatPower(1.234, "W", { signed: true, locale: "de-DE" })).toBe("+1.234 W");
    expect(formatPower(0, "W", { signed: true })).toBe("0 W");
    expect(formatEnergy(1.234, undefined, "en-US")).toBe("1.2 kWh");
    expect(formatEnergy(1.234, "Wh", "de-DE")).toBe("1.234 Wh");
    expect(formatEnergy(0, "Wh")).toBe("0 Wh");
    expect(formatPower(undefined, "W")).toBe("—");
    expect(formatEnergy(undefined, "Wh")).toBe("—");
  });
  it("gives equivalent displays for equivalent sensor inputs", () => {
    expect(formatPower(powerInKw(state("1234", "W")), "W"))
      .toBe(formatPower(powerInKw(state("1.234", "kW")), "W"));
    for (const [value, unit] of [["1234", "Wh"], ["1.234", "kWh"], ["0.001234", "MWh"]]) {
      expect(formatEnergy(energyInKwh(state(value, unit)), "Wh", "en-US")).toBe("1,234 Wh");
    }
  });
});
