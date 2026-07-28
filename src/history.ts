import type { HassEntity, HistoryPoint, HomeAssistant } from "./types";
import { powerInKw } from "./values";

type HistoryResponse = HassEntity[][];

interface PowerEntities {
  solar: string;
  home: string;
  battery: string;
}

const HISTORY_HOURS = 24;
const BUCKET_COUNT = 24;

function seriesByEntity(
  response: HistoryResponse,
  entityId: string
): HassEntity[] {
  return (
    response.find((series) => series.some((state) => state.entity_id === entityId)) ??
    []
  );
}

function normalizedPower(state: HassEntity | undefined, reference: HassEntity | undefined) {
  if (!state) return 0;
  return (
    powerInKw({
      ...state,
      attributes: {
        ...reference?.attributes,
        ...state.attributes
      }
    }) ?? 0
  );
}

function valueAt(
  series: HassEntity[],
  timestamp: number,
  reference: HassEntity | undefined
): number {
  if (series.length === 0) return 0;

  let before = series[0];
  let after = series.at(-1) ?? series[0];

  for (const state of series) {
    const stateTime = Date.parse(state.last_changed ?? state.last_updated ?? "");
    if (!Number.isFinite(stateTime)) continue;
    if (stateTime <= timestamp) before = state;
    if (stateTime >= timestamp) {
      after = state;
      break;
    }
  }

  const beforeTime = Date.parse(before.last_changed ?? before.last_updated ?? "");
  const afterTime = Date.parse(after.last_changed ?? after.last_updated ?? "");
  const beforeValue = normalizedPower(before, reference);
  const afterValue = normalizedPower(after, reference);

  if (
    !Number.isFinite(beforeTime) ||
    !Number.isFinite(afterTime) ||
    beforeTime === afterTime
  ) {
    return beforeValue;
  }

  const progress = Math.min(
    1,
    Math.max(0, (timestamp - beforeTime) / (afterTime - beforeTime))
  );
  return beforeValue + (afterValue - beforeValue) * progress;
}

export async function fetchPowerHistory(
  hass: HomeAssistant,
  entities: PowerEntities,
  now = new Date()
): Promise<HistoryPoint[]> {
  const end = now;
  const start = new Date(end.getTime() - HISTORY_HOURS * 60 * 60 * 1000);
  const entityIds = [entities.solar, entities.home, entities.battery];
  const path =
    `history/period/${encodeURIComponent(start.toISOString())}` +
    `?end_time=${encodeURIComponent(end.toISOString())}` +
    `&filter_entity_id=${encodeURIComponent(entityIds.join(","))}` +
    "&minimal_response&no_attributes&significant_changes_only=0";

  const response = await hass.callApi<HistoryResponse>("GET", path);
  const solar = seriesByEntity(response, entities.solar);
  const home = seriesByEntity(response, entities.home);
  const battery = seriesByEntity(response, entities.battery);

  return Array.from({ length: BUCKET_COUNT }, (_, index) => {
    const timestamp =
      start.getTime() + (index / (BUCKET_COUNT - 1)) * (end.getTime() - start.getTime());
    return {
      timestamp,
      solar: Math.max(0, valueAt(solar, timestamp, hass.states[entities.solar])),
      home: Math.max(0, valueAt(home, timestamp, hass.states[entities.home])),
      battery: valueAt(battery, timestamp, hass.states[entities.battery])
    };
  });
}
