import { describe, expect, it } from "vitest";
import { batteryEnergy, estimateBattery, formatForecastTime } from "../src/battery";

const now = new Date("2026-10-11T12:00:00Z");
function hours(soc: number, power: number, reserve = 10): number | undefined {
  const forecast = estimateBattery(soc, power, 5.12, reserve, now);
  return forecast && "time" in forecast ? (forecast.time.getTime() - now.getTime()) / 3_600_000 : undefined;
}

describe("absolute SOC battery model", () => {
  it("uses total capacity for charging and subtracts reserve only for discharging", () => {
    const energy = batteryEnergy(50, 5.12, 10)!;
    expect(energy.usableKwh).toBeCloseTo(4.608);
    expect(energy.toFullKwh).toBeCloseTo(2.56);
    expect(energy.aboveReserveKwh).toBeCloseTo(2.048);
    expect(hours(50, 1)).toBeCloseTo(2.56);
    expect(hours(50, -1)).toBeCloseTo(2.048);
    expect(hours(50, 1, 20)).toBe(hours(50, 1, 0));
    expect(hours(50, -1, 0)).toBeCloseTo(2.56);
    expect(hours(50, -1, 20)).toBeCloseTo(1.536);
  });
  it("handles full, reserve and below-reserve states", () => {
    expect(estimateBattery(100, 1, 5.12, 10, now)).toBeUndefined();
    expect(estimateBattery(10, -1, 5.12, 10, now)).toEqual({ kind: "at_reserve" });
    expect(estimateBattery(5, 0, 5.12, 10, now)).toEqual({ kind: "at_reserve" });
    expect(estimateBattery(5, 1, 5.12, 10, now)?.kind).toBe("full");
    expect(estimateBattery(100, -1, 5.12, 10, now)?.kind).toBe("reserve");
  });
  it.each([-0.05, 0, 0.05])("suppresses estimates at idle power %s", power => {
    expect(estimateBattery(50, power, 5.12, 10, now)).toBeUndefined();
  });
  it.each([undefined, NaN, Infinity, -1, 101])("rejects invalid SOC %s", soc => {
    expect(estimateBattery(soc, 1, 5.12, 10, now)).toBeUndefined();
  });
  it.each([undefined, NaN, Infinity, -Infinity])("rejects invalid power %s", power => {
    expect(estimateBattery(50, power, 5.12, 10, now)).toBeUndefined();
  });
  it.each([0, -1, NaN, Infinity])("rejects invalid total capacity %s", capacity => {
    expect(estimateBattery(50, 1, capacity, 10, now)).toBeUndefined();
  });
  it.each([-1, 100, NaN, Infinity])("rejects invalid reserve %s", reserve => {
    expect(estimateBattery(50, 1, 5.12, reserve, now)).toBeUndefined();
  });
  it("rejects invalid or overflowing dates", () => {
    expect(estimateBattery(50, 1, 5.12, 10, new Date(NaN))).toBeUndefined();
    expect(estimateBattery(50, 1, Number.MAX_VALUE, 10, now)).toBeUndefined();
  });
});

describe("forecast dates", () => {
  it("shows a date across midnight, including the year across New Year", () => {
    const now = new Date("2026-12-31T23:00:00Z");
    expect(formatForecastTime(new Date("2026-12-31T23:30:00Z"), "en-US", now, "UTC")).toBe("11:30 PM");
    expect(formatForecastTime(new Date("2027-01-01T01:00:00Z"), "en-US", now, "UTC")).toContain("Jan 1, 2027");
    expect(formatForecastTime(new Date("2027-01-01T01:00:00Z"), "de-DE", now, "UTC")).toContain("2027");
  });
  it("uses the Home Assistant timezone to decide whether the calendar day changed", () => {
    const now = new Date("2026-10-11T12:00:00Z");
    const later = new Date("2026-10-11T14:00:00Z");
    expect(formatForecastTime(later, "en-US", now, "UTC")).toBe("2:00 PM");
    expect(formatForecastTime(later, "en-US", now, "Australia/Sydney")).toContain("Oct 12, 2026");
  });
});
