import { describe, expect, it } from "vitest";
import {
  chartPositionPercent,
  nearestChartPointIndex
} from "../src/chart";

describe("chart inspection", () => {
  it("selects the nearest history point and clamps to the chart", () => {
    expect(nearestChartPointIndex(100, 100, 480, 24)).toBe(0);
    expect(nearestChartPointIndex(340, 100, 480, 24)).toBe(12);
    expect(nearestChartPointIndex(900, 100, 480, 24)).toBe(23);
  });

  it("positions the selected point as a percentage", () => {
    expect(chartPositionPercent(0, 24)).toBe(0);
    expect(chartPositionPercent(23, 24)).toBe(100);
    expect(chartPositionPercent(5, 1)).toBe(0);
  });
});
