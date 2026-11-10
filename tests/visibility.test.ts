import { describe, expect, it, vi } from "vitest";
import { cardTitle, getConfigForm, normalizeConfig, validateConfig } from "../src/config";
import { SolarBatteryCardEditor } from "../src/editor";
import { SolarForecastChart } from "../src/forecast-chart";
import { config, makeHass, sensor, TestCard, textOf } from "./fixtures";
import type { HistoryPoint, SolarBatteryCardConfig } from "../src/types";

type Internals = {
  _loadHistoryIfNeeded(): Promise<void>;
  _history: HistoryPoint[];
  _activeChartIndex: number;
  _renderChart(points: HistoryPoint[], locale: string): unknown;
};
const internal = (card: TestCard) => card as unknown as Internals;
const minimal = { type: config.type, home_power: config.home_power, grid_power: config.grid_power };

function fieldNames(fields: Array<{ name: string; schema?: unknown }>): string[] {
  return fields.flatMap(field => [field.name, ...fieldNames((field.schema ?? []) as typeof fields)]);
}

describe("component visibility configuration", () => {
  it("keeps both components visible by default and preserves explicit choices", () => {
    expect(normalizeConfig(config)).toMatchObject({ show_solar: true, show_battery: true });
    expect(normalizeConfig({ ...config, show_solar: false, show_battery: false })).toMatchObject({ show_solar: false, show_battery: false });
  });
  it("requires sensors only for visible components, with home/grid always required", () => {
    expect(() => validateConfig({ ...minimal, show_solar: false, show_battery: false })).not.toThrow();
    expect(() => validateConfig({ ...minimal, show_solar: false, battery_soc: config.battery_soc, battery_power: config.battery_power })).not.toThrow();
    expect(() => validateConfig({ ...minimal, show_battery: false, solar_power: config.solar_power })).not.toThrow();
    expect(() => validateConfig({ ...minimal, show_solar: false })).toThrow("Battery state of charge");
    expect(() => validateConfig({ ...minimal, show_battery: false })).toThrow("Solar power");
    for (const field of ["home_power", "grid_power"]) {
      expect(() => validateConfig({ ...minimal, show_solar: false, show_battery: false, [field]: "" })).toThrow("is required");
    }
  });
  it.each(["show_solar", "show_battery"])("rejects nonboolean %s", field => {
    expect(() => validateConfig({ ...config, [field]: "false" } as SolarBatteryCardConfig)).toThrow("must be true or false");
  });
  it("defers hidden settings validation until the component is enabled", () => {
    const hidden = { ...minimal, show_solar: false, show_battery: false, battery_lower_soc: 100, solar_forecast_today: "invalid" };
    expect(() => validateConfig(hidden)).not.toThrow();
    expect(() => validateConfig({ ...hidden, show_solar: true })).toThrow("sensor entity ID");
    expect(() => validateConfig({ ...hidden, show_battery: true })).toThrow("Lower SOC");
  });
  it("adapts only the default title", () => {
    expect(cardTitle({ ...config, show_solar: false })).toBe("Battery & home");
    expect(cardTitle({ ...config, show_battery: false })).toBe("Solar & home");
    expect(cardTitle({ ...config, show_solar: false, show_battery: false })).toBe("Home energy");
    expect(cardTitle({ ...config, show_battery: false, title: "My system" })).toBe("My system");
  });
  it("hides related editor fields and restores saved settings on re-enable", () => {
    const editor = new SolarBatteryCardEditor();
    editor.hass = makeHass();
    editor.setConfig(config);
    const dispatch = vi.spyOn(editor, "dispatchEvent").mockReturnValue(true);
    const change = (value: SolarBatteryCardConfig) => (editor as unknown as { _valueChanged(e: CustomEvent): void })._valueChanged(new CustomEvent("value-changed", { detail: { value } }));
    change({ ...config, show_solar: false, show_battery: false });
    const names = fieldNames(editor.getLocalizedForm().schema);
    expect(names).toEqual(expect.arrayContaining(["show_solar", "show_battery", "home_power", "grid_power"]));
    expect(names.some(name => /^(solar_|battery_)/.test(name))).toBe(false);
    expect(names).not.toContain("show_forecast_line");
    const saved = (dispatch.mock.calls[0][0] as CustomEvent).detail.config;
    expect(saved).toMatchObject(config);
    change({ ...saved, show_solar: true, show_battery: true });
    expect(fieldNames(editor.getLocalizedForm().schema)).toContain("battery_soc");
    expect(fieldNames(editor.getLocalizedForm().schema)).toContain("solar_forecast_today");
    expect((dispatch.mock.calls[1][0] as CustomEvent).detail.config).toMatchObject(config);
    expect(getConfigForm("de-DE").computeLabel({ name: "show_solar" })).toBe("Solar anzeigen");
    expect(getConfigForm("de-DE").computeLabel({ name: "show_battery" })).toBe("Batterie anzeigen");
  });
});

describe("component visibility rendering and history", () => {
  it.each([[false, true], [true, false], [false, false]])("renders solar=%s battery=%s without hidden readings", (show_solar, show_battery) => {
    const card = new TestCard(); card.hass = makeHass();
    card.setConfig({ ...config, show_solar, show_battery });
    const output = textOf(card.renderForTest());
    expect(output).toContain("Home"); expect(output).toContain("Import");
    if (!show_solar) { expect(output).not.toContain("Solar"); expect(output).not.toContain("Generated"); }
    if (!show_battery) { expect(output).not.toContain("Battery"); expect(output).not.toContain("Charging"); expect(output).not.toContain("Stored"); }
    const points = [{ timestamp: 0, solar: 999, home: 2, battery: -999 }];
    internal(card)._activeChartIndex = 0;
    const chart = textOf(internal(card)._renderChart(points, "en-US"));
    if (!show_solar) expect(chart).not.toContain("Solar");
    if (!show_battery) expect(chart).not.toContain("Battery");
    if (!show_solar && !show_battery) expect(chart).not.toContain("999");
  });
  it("drops battery from the forecast chart, including its scale and inspection", () => {
    class Chart extends SolarForecastChart { renderForTest() { return this.render(); } }
    const chart = new Chart(); chart.hass = makeHass();
    chart.config = { ...config, show_battery: false };
    chart.hass.states["sensor.battery"] = sensor(-999, "kW");
    const output = textOf(chart.renderForTest());
    expect(output).not.toContain("Battery"); expect(output).not.toContain("999");
    expect(output).toContain("Solar"); expect(output).toContain("Daily target");
  });
  it("refetches only visible history and restores solar forecast mode when re-enabled", async () => {
    const card = new TestCard(); card.hass = makeHass();
    const call = vi.fn().mockResolvedValue([]); card.hass.callApi = call;
    card.setConfig({ ...config, show_forecast_line: true });
    await internal(card)._loadHistoryIfNeeded();
    card.setConfig({ ...config, show_solar: false, show_battery: false, show_forecast_line: true });
    await internal(card)._loadHistoryIfNeeded();
    const url = new URL(`http://ha/${call.mock.calls[1][1]}`);
    expect(url.searchParams.get("filter_entity_id")).toBe("sensor.home");
    expect(textOf(card.renderForTest())).toContain("Power · 24 hours");
    expect(decodeURIComponent(url.pathname)).toContain(new Date(Date.now() - 86_400_000).toISOString().slice(0, 16));
    card.setConfig({ ...config, show_forecast_line: true });
    await internal(card)._loadHistoryIfNeeded();
    expect(call).toHaveBeenCalledTimes(3);
    expect(decodeURIComponent(call.mock.calls[2][1])).toContain("sensor.solar,sensor.home,sensor.battery");
    expect(textOf(card.renderForTest())).not.toContain("Power · 24 hours");
  });
  it("ignores a pending response for components that were hidden", async () => {
    const card = new TestCard(); card.hass = makeHass(); card.setConfig(config);
    let resolveOld!: (value: unknown) => void;
    card.hass.callApi = vi.fn().mockImplementationOnce(() => new Promise(resolve => { resolveOld = resolve; })).mockResolvedValue([]);
    const pending = internal(card)._loadHistoryIfNeeded();
    card.setConfig({ ...config, show_solar: false });
    await internal(card)._loadHistoryIfNeeded();
    resolveOld([[{ ...sensor(999, "kW"), entity_id: "sensor.solar", last_changed: new Date().toISOString() }]]);
    await pending;
    expect(internal(card)._history).toEqual([]);
  });
});
