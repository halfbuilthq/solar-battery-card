import { describe, expect, it } from "vitest";
import { SolarBatteryCard } from "../src/solar-battery-card";
import type {
  HistoryPoint,
  HomeAssistant,
  SolarBatteryCardConfig
} from "../src/types";

interface TemplateLike {
  strings: readonly string[];
  values: readonly unknown[];
}

const validConfig: SolarBatteryCardConfig = {
  type: "custom:solar-battery-card",
  battery_soc: "sensor.battery_soc",
  solar_power: "sensor.solar_power",
  home_power: "sensor.home_power",
  battery_power: "sensor.battery_power",
  grid_power: "sensor.grid_power"
};

function hass(language: string): HomeAssistant {
  return {
    states: {},
    callApi: async <T>() => [] as T,
    locale: { language }
  };
}

class TestSolarBatteryCard extends SolarBatteryCard {
  renderForTest() {
    return this.render();
  }
}

function renderedText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value)) return value.map(renderedText).join(" ");
  if (
    value &&
    typeof value === "object" &&
    "values" in value &&
    Array.isArray((value as TemplateLike).values)
  ) {
    return (value as TemplateLike).values.map(renderedText).join(" ");
  }
  return "";
}

function renderCard(config: SolarBatteryCardConfig): string {
  const card = new TestSolarBatteryCard();
  card.hass = hass("de-DE");
  card.setConfig(config);
  return renderedText(card.renderForTest());
}

describe("localized card rendering", () => {
  it("renders the localized default for a config without a title", () => {
    expect(renderCard(validConfig)).toContain("Solar & Speicher");
  });

  it("preserves an explicit legacy default title", () => {
    const output = renderCard({ ...validConfig, title: "Solar & storage" });
    expect(output).toContain("Solar & storage");
    expect(output).not.toContain("Solar & Speicher");
  });

  it("preserves an explicitly customized title", () => {
    const output = renderCard({ ...validConfig, title: "Garage solar" });
    expect(output).toContain("Garage solar");
    expect(output).not.toContain("Solar & Speicher");
  });

  it("localizes the chart SVG accessibility label", () => {
    const card = new TestSolarBatteryCard();
    const points: HistoryPoint[] = [
      { timestamp: 0, solar: 1, home: 1, battery: 0 }
    ];
    const chart = (
      card as unknown as {
        _renderChart(points: HistoryPoint[], locale?: string): TemplateLike;
      }
    )._renderChart(points, "de-CH");
    const labelIndex = chart.strings.findIndex(
      (part) => part.includes("role=\"img\"") && part.includes("aria-label=")
    );

    expect(labelIndex).toBeGreaterThanOrEqual(0);
    expect(chart.values[labelIndex]).toBe(
      "Solar-, Haus- und Batterieleistung der letzten 24 Stunden"
    );
  });
});
