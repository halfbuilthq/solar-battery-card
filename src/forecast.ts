import type { HassEntity, SolarBatteryCardConfig } from "./types";
import { forecastInKwh } from "./values";

export interface EnergyPoint { timestamp: number; kwh: number }
export interface DayWindow { start: number; end: number }
export interface SolarForecast {
  status: "ok" | "missing" | "invalid" | "incomplete";
  points: EnergyPoint[];
  totalKwh?: number;
}

const days = new Map<string, DayWindow>();

/** Find calendar boundaries in HA's timezone, including 23/25-hour DST days. */
export function localDay(now: Date, timeZone?: string): DayWindow {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit"
  });
  const keyAt = (timestamp: number) => {
    const parts = formatter.formatToParts(timestamp);
    return ["year", "month", "day"].map(type => parts.find(p => p.type === type)!.value).join("-");
  };
  const timestamp = now.getTime();
  const today = keyAt(timestamp);
  const key = `${formatter.resolvedOptions().timeZone}:${today}`;
  const cached = days.get(key);
  if (cached) return cached;
  const boundary = (low: number, high: number, after: boolean) => {
    while (high - low > 1) {
      const middle = Math.floor((low + high) / 2);
      const date = keyAt(middle);
      if (date < today || (after && date === today)) low = middle;
      else high = middle;
    }
    return high;
  };
  const window = {
    start: boundary(timestamp - 36 * 3_600_000, timestamp, false),
    end: boundary(timestamp, timestamp + 36 * 3_600_000, true)
  };
  if (days.size >= 8) days.delete(days.keys().next().value!);
  days.set(key, window);
  return window;
}

function field(object: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) =>
    value && typeof value === "object" && Object.prototype.hasOwnProperty.call(value, key)
      ? (value as Record<string, unknown>)[key] : undefined, object);
}

function timestamp(value: unknown): number | undefined {
  // Offsets are required: never guess a provider's local timezone or epoch unit.
  if (typeof value !== "string" || !/T.*(?:Z|[+-]\d{2}:\d{2})$/i.test(value)) return undefined;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function solarForecast(
  source: HassEntity | undefined,
  config: SolarBatteryCardConfig,
  day: DayWindow
): SolarForecast {
  const fail = (status: SolarForecast["status"]): SolarForecast => ({ status, points: [] });
  if (!source) return fail("missing");
  if (config.solar_forecast_mode !== "hourly") {
    const totalKwh = forecastInKwh(source);
    return totalKwh === undefined ? fail("missing") : {
      status: "ok", totalKwh,
      points: [{ timestamp: day.start, kwh: totalKwh }, { timestamp: day.end, kwh: totalKwh }]
    };
  }
  const rows = field(source.attributes, config.solar_forecast_attribute ?? "forecast");
  if (!Array.isArray(rows) || rows.length === 0) return fail("missing");
  const interval = (config.solar_forecast_interval_minutes ?? 60) * 60_000;
  const unit = config.solar_forecast_input_unit ?? "kWh";
  if (!Number.isFinite(interval) || interval <= 0 ||
      !["Wh", "kWh", "MWh", "W", "kW"].includes(unit)) return fail("invalid");
  const intervals: Array<{ start: number; end: number; kwh: number }> = [];
  for (const row of rows) {
    const time = timestamp(field(row, config.solar_forecast_time_field ?? "start"));
    if (time === undefined) return fail("invalid");
    const start = config.solar_forecast_time_is_end ? time - interval : time;
    const end = start + interval;
    if (end <= day.start || start >= day.end) continue;
    const raw = field(row, config.solar_forecast_value_field ?? "energy");
    if ((typeof raw !== "number" && typeof raw !== "string") || String(raw).trim() === "") return fail("invalid");
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0) return fail("invalid");
    const energy = unit === "Wh" ? value / 1000 : unit === "MWh" ? value * 1000
      : unit === "W" ? value / 1000 * interval / 3_600_000
      : unit === "kW" ? value * interval / 3_600_000 : value;
    const clippedStart = Math.max(start, day.start);
    const clippedEnd = Math.min(end, day.end);
    intervals.push({ start: clippedStart, end: clippedEnd, kwh: energy * (clippedEnd - clippedStart) / interval });
  }
  intervals.sort((a, b) => a.start - b.start);
  let cursor = day.start;
  let totalKwh = 0;
  const points: EnergyPoint[] = [{ timestamp: cursor, kwh: 0 }];
  for (const item of intervals) {
    if (item.start < cursor) return fail("invalid"); // Duplicate or overlapping intervals.
    if (item.start > cursor) return fail("incomplete"); // Missing energy must not be counted as zero.
    totalKwh += item.kwh;
    if (!Number.isFinite(totalKwh)) return fail("invalid");
    cursor = item.end;
    points.push({ timestamp: cursor, kwh: totalKwh });
  }
  if (cursor !== day.end) return fail("incomplete");
  return { status: "ok", points, totalKwh };
}

export function energyAt(segments: EnergyPoint[][], time: number): number | undefined {
  for (const points of segments) {
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (time === point.timestamp) return point.kwh;
      const previous = points[i - 1];
      if (previous && time > previous.timestamp && time < point.timestamp) {
        return previous.kwh + (point.kwh - previous.kwh) * (time - previous.timestamp) / (point.timestamp - previous.timestamp);
      }
    }
  }
  return undefined;
}
