import { describe, expect, it } from "vitest";
import { config, makeHass, sensor, TestCard, textOf } from "./fixtures";

function powerTiles(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(powerTiles);
  if (value && typeof value === "object" && "strings" in value && "values" in value) {
    const template = value as { strings: readonly string[]; values: unknown[] };
    if (template.strings.some((part) => part.includes('class="power-stat '))) {
      return [textOf(value)];
    }
    return template.values.flatMap(powerTiles);
  }
  return [];
}

function gridTile(card: TestCard): string {
  const tiles = powerTiles(card.renderForTest());
  expect(tiles).toHaveLength(4);
  return tiles[3];
}

describe("live grid flow", () => {
  for (const locale of ["en-US", "de-DE"]) {
    for (const unit of ["W", "kW"] as const) {
      it.each([
        [false, 161.228, "import"],
        [false, -161.228, "export"],
        [true, 161.228, "export"],
        [true, -161.228, "import"]
      ] as const)(`${locale}, ${unit}: positive-is-export=%s, sensor=%s shows %s`, (positiveIsExport, watts, direction) => {
        const card = new TestCard();
        card.hass = makeHass();
        card.hass.locale = { language: locale };
        card.hass.states[config.grid_power] = sensor(watts, "W");
        card.setConfig({ ...config, grid_positive_is_export: positiveIsExport, power_unit: unit });
        const label = direction === "import"
          ? locale === "de-DE" ? "Netzbezug" : "Import"
          : locale === "de-DE" ? "Einspeisung" : "Export";
        const value = unit === "W" ? "161 W" : locale === "de-DE" ? "0,16 kW" : "0.16 kW";
        expect(gridTile(card)).toContain(`${label} ${value}`);
      });
    }
  }

  it.each([[-0.5, "Import"], [0.5, "Export"]])("preserves the default sign convention for %s kW", (value, label) => {
    const card = new TestCard();
    card.hass = makeHass();
    card.hass.states[config.grid_power] = sensor(value, "kW");
    card.setConfig(config);
    expect(gridTile(card)).toContain(`${label} 0.50 kW`);
  });

  it.each([true, false])("shows neutral zero without a negative sign, positive-is-export=%s", (positiveIsExport) => {
    const card = new TestCard();
    card.hass = makeHass();
    card.setConfig({ ...config, grid_positive_is_export: positiveIsExport, power_unit: "W" });
    for (const value of ["0", "-0"]) {
      card.hass.states[config.grid_power] = sensor(value, "W");
      expect(gridTile(card)).toContain("Grid 0 W");
    }
  });

  it.each([undefined, "unavailable", "unknown", "not-a-number", "", "Infinity"])("shows missing grid reading %s as unavailable", (state) => {
    const card = new TestCard();
    card.hass = makeHass();
    if (state === undefined) delete card.hass.states[config.grid_power];
    else card.hass.states[config.grid_power] = sensor(state, "W");
    card.setConfig(config);
    expect(gridTile(card)).toContain("Grid —");
  });

  it("updates direction on the same card and preserves daily exported energy", () => {
    const card = new TestCard();
    card.setConfig({ ...config, grid_positive_is_export: false, power_unit: "W" });
    for (const [state, expected] of [
      ["161.228", "Netzbezug 161 W"],
      ["-161.228", "Einspeisung 161 W"],
      ["0", "Netz 0 W"],
      ["unavailable", "Netz —"],
      ["161.228", "Netzbezug 161 W"]
    ]) {
      const hass = makeHass();
      hass.locale = { language: "de-DE" };
      hass.states[config.grid_power] = sensor(state, "W");
      card.hass = hass;
      expect(gridTile(card)).toContain(expected);
      expect(textOf(card.renderForTest())).toContain("Eingespeist 1,0 kWh");
    }
  });

  it.each([true, false])("only announces exporting in the footer during export, positive-is-export=%s", (positiveIsExport) => {
    const card = new TestCard();
    card.hass = makeHass();
    card.hass.states[config.solar_power] = sensor(5, "kW");
    card.setConfig({ ...config, grid_positive_is_export: positiveIsExport });
    const exportSign = positiveIsExport ? 1 : -1;
    for (const value of [-0.5, 0, 0.5]) {
      card.hass.states[config.grid_power] = sensor(value * exportSign, "kW");
      const output = textOf(card.renderForTest());
      expect(output.includes("Solar covering home, charging battery and exporting")).toBe(value > 0);
    }
  });
});
