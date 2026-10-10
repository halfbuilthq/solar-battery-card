/** Absolute SOC, with reserve expressed on the same 0–100% scale. */
export function batteryEnergy(
  soc: number | undefined,
  capacityKwh: number,
  reserve: number
): { usableKwh: number; toFullKwh: number; aboveReserveKwh: number } | undefined {
  if (soc === undefined || !Number.isFinite(soc) || soc < 0 || soc > 100 ||
      !Number.isFinite(capacityKwh) || capacityKwh <= 0 ||
      !Number.isFinite(reserve) || reserve < 0 || reserve >= 100) return undefined;
  return {
    usableKwh: capacityKwh * ((100 - reserve) / 100),
    toFullKwh: capacityKwh * ((100 - soc) / 100),
    aboveReserveKwh: capacityKwh * (Math.max(soc - reserve, 0) / 100)
  };
}

export type BatteryForecast =
  | { kind: "full" | "reserve"; time: Date }
  | { kind: "at_reserve" };

export function estimateBattery(
  soc: number | undefined,
  powerKw: number | undefined,
  capacityKwh: number,
  reserve = 0,
  now = new Date()
): BatteryForecast | undefined {
  const energy = batteryEnergy(soc, capacityKwh, reserve);
  if (!energy || powerKw === undefined || !Number.isFinite(powerKw) || !Number.isFinite(now.getTime())) {
    return undefined;
  }
  if (powerKw <= 0.05 && energy.aboveReserveKwh === 0) return { kind: "at_reserve" };
  const kind = powerKw > 0.05 ? "full" : powerKw < -0.05 ? "reserve" : undefined;
  if (!kind) return undefined;
  const remainingKwh = kind === "full" ? energy.toFullKwh : energy.aboveReserveKwh;
  if (remainingKwh <= 0) return undefined;
  const time = new Date(now.getTime() + remainingKwh / Math.abs(powerKw) * 3_600_000);
  return Number.isFinite(time.getTime()) ? { kind, time } : undefined;
}

/** Include a date when the estimate falls outside today's local calendar day. */
export function formatForecastTime(
  time: Date,
  locale?: string,
  now = new Date(),
  timeZone?: string
): string {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" });
  const otherDay = day.format(time) !== day.format(now);
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    ...(otherDay ? { year: "numeric", month: "short", day: "numeric" } as const : {})
  }).format(time);
}
