import { describe, expect, it } from "vitest";
import { config, makeHass, TestCard, textOf } from "./fixtures";
import type { HistoryPoint } from "../src/types";

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
