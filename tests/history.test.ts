import { describe, expect, it } from "vitest";
import { fetchPowerHistory } from "../src/history";
import type { HassEntity, HomeAssistant } from "../src/types";

function sample(entityId: string, value: number, time: string): HassEntity {
  return {
    entity_id: entityId,
    state: String(value),
    last_changed: time,
    attributes: {}
  };
}

describe("power history", () => {
  it("converts recorded watts to kW and interpolates between samples", async () => {
    const start = new Date("2026-07-25T12:00:00Z");
    const end = new Date("2026-07-26T12:00:00Z");
    const ids = {
      solar: "sensor.solar",
      home: "sensor.home",
      battery: "sensor.battery"
    };
    const reference = (entityId: string): HassEntity => ({
      entity_id: entityId,
      state: "0",
      attributes: { unit_of_measurement: "W" }
    });
    const hass: HomeAssistant = {
      states: {
        [ids.solar]: reference(ids.solar),
        [ids.home]: reference(ids.home),
        [ids.battery]: reference(ids.battery)
      },
      async callApi<T>() {
        return [
          [
            sample(ids.solar, 0, start.toISOString()),
            sample(ids.solar, 2400, end.toISOString())
          ],
          [
            sample(ids.home, 1000, start.toISOString()),
            sample(ids.home, 2000, end.toISOString())
          ],
          [
            sample(ids.battery, 0, start.toISOString()),
            sample(ids.battery, -1200, end.toISOString())
          ]
        ] as T;
      }
    };

    const points = await fetchPowerHistory(hass, ids, end);
    expect(points).toHaveLength(24);
    expect(points[0].solar).toBe(0);
    expect(points.at(-1)?.solar).toBe(2.4);
    expect(points[12].solar).toBeGreaterThan(1.2);
    expect(points.at(-1)?.battery).toBe(-1.2);
  });
});
