import type { HassEntity, HomeAssistant } from "./types";

const UNAVAILABLE_STATES = new Set(["unknown", "unavailable", "none", ""]);

export function numericState(entity: HassEntity | undefined): number | undefined {
  if (!entity || UNAVAILABLE_STATES.has(entity.state.toLowerCase())) return undefined;
  const value = Number(entity.state);
  return Number.isFinite(value) ? value : undefined;
}

export function powerInKw(entity: HassEntity | undefined): number | undefined {
  const value = numericState(entity);
  if (value === undefined) return undefined;

  const unit = entity?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  if (unit === "w") return value / 1000;
  if (unit === "mw") return value / 1_000_000;
  return value;
}

export function energyInKwh(entity: HassEntity | undefined): number | undefined {
  const value = numericState(entity);
  if (value === undefined) return undefined;

  const unit = entity?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  if (unit === "wh") return value / 1000;
  if (unit === "mwh") return value * 1000;
  return value;
}

export function formatValue(
  value: number | undefined,
  unit: string,
  options: { signed?: boolean; digits?: number; locale?: string } = {}
): string {
  if (value === undefined) return "—";
  const digits = options.digits ?? 2;
  const formatted = new Intl.NumberFormat(options.locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    signDisplay: options.signed ? "exceptZero" : "auto"
  }).format(value);
  return `${formatted} ${unit}`;
}

export function entity(hass: HomeAssistant | undefined, entityId: string | undefined) {
  return entityId && hass ? hass.states[entityId] : undefined;
}

export function estimateFullTime(
  stateOfCharge: number | undefined,
  chargingPowerKw: number,
  capacityKwh: number | undefined,
  now = new Date()
): Date | undefined {
  if (
    stateOfCharge === undefined ||
    !capacityKwh ||
    capacityKwh <= 0 ||
    chargingPowerKw <= 0 ||
    stateOfCharge >= 100
  ) {
    return undefined;
  }

  const remainingKwh = ((100 - stateOfCharge) / 100) * capacityKwh;
  return new Date(now.getTime() + (remainingKwh / chargingPowerKw) * 60 * 60 * 1000);
}

