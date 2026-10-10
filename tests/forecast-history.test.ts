import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { config, makeHass, sensor, TestCard } from "./fixtures";
import type { HistoryPoint } from "../src/types";

type Internals = { _loadHistoryIfNeeded(): Promise<void>; _history: HistoryPoint[]; _historyLoading: boolean };
const internal = (card: TestCard) => card as unknown as Internals;
function card() {
  const c = new TestCard(); c.hass = makeHass(); c.setConfig({ ...config, show_forecast_line: true }); return c;
}
beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date("2026-10-11T12:00:00Z")); });
afterEach(() => vi.useRealTimers());

describe("combined chart history", () => {
  it("requests only today in HA's timezone, throttles updates, and refetches at midnight", async () => {
    const c = card(); c.hass!.config = { time_zone: "Australia/Sydney" };
    const call = vi.fn().mockResolvedValue([]); c.hass!.callApi = call;
    await internal(c)._loadHistoryIfNeeded();
    expect(decodeURIComponent(call.mock.calls[0][1])).toContain("2026-10-10T13:00:00.000Z");
    c.setConfig({ ...config, show_forecast_line: true, energy_unit: "Wh" });
    await internal(c)._loadHistoryIfNeeded(); expect(call).toHaveBeenCalledTimes(1);
    vi.setSystemTime(new Date("2026-10-11T13:00:00Z"));
    await internal(c)._loadHistoryIfNeeded(); expect(call).toHaveBeenCalledTimes(2);
    expect(decodeURIComponent(call.mock.calls[1][1])).toContain("2026-10-11T13:00:00.000Z");
  });
  it("restores rolling history when the forecast line is disabled", async () => {
    const c = card(); const call = vi.fn().mockResolvedValue([]); c.hass!.callApi = call;
    await internal(c)._loadHistoryIfNeeded();
    c.setConfig({ ...config, show_forecast_line: false });
    await internal(c)._loadHistoryIfNeeded();
    expect(call).toHaveBeenCalledTimes(2);
    expect(decodeURIComponent(call.mock.calls[1][1])).toContain("2026-10-10T12:00:00.000Z");
  });
  it("ignores an old response after the chart mode changes", async () => {
    const c = card(); let resolveOld!: (value: unknown) => void;
    c.hass!.callApi = vi.fn().mockImplementationOnce(() => new Promise(resolve => { resolveOld = resolve; })).mockResolvedValueOnce([]);
    const pending = internal(c)._loadHistoryIfNeeded();
    c.setConfig({ ...config, show_forecast_line: false });
    await internal(c)._loadHistoryIfNeeded();
    resolveOld([[{ ...sensor(9000, "W"), entity_id: "sensor.solar", last_changed: "2026-10-11T10:00:00Z" }]]);
    await pending;
    expect(internal(c)._history).toEqual([]);
  });
  it("does not request history when the chart is hidden", async () => {
    const c = card(); const call = vi.fn().mockResolvedValue([]); c.hass!.callApi = call;
    c.setConfig({ ...config, show_forecast_line: true, show_power_chart: false });
    await internal(c)._loadHistoryIfNeeded(); expect(call).not.toHaveBeenCalled();
  });
});
