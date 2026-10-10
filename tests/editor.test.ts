import { afterEach, describe, expect, it, vi } from "vitest";
import { getConfigForm } from "../src/config";
import { SolarBatteryCardEditor } from "../src/editor";
import { SolarBatteryCard } from "../src/solar-battery-card";
import type { HomeAssistant, SolarBatteryCardConfig } from "../src/types";

const validConfig: SolarBatteryCardConfig = {
  type: "custom:solar-battery-card",
  battery_soc: "sensor.battery_soc",
  solar_power: "sensor.solar_power",
  home_power: "sensor.home_power",
  battery_power: "sensor.battery_power",
  grid_power: "sensor.grid_power"
};

function hass(
  localeLanguage?: string,
  legacyLanguage?: string
): HomeAssistant {
  return {
    states: {},
    callApi: async <T>() => [] as T,
    locale: localeLanguage === undefined ? {} : { language: localeLanguage },
    language: legacyLanguage
  };
}

function sectionTitles(editor: SolarBatteryCardEditor): string[] {
  return editor
    .getLocalizedForm()
    .schema.map((item) => ("title" in item ? item.title : undefined))
    .filter((title): title is string => typeof title === "string");
}

describe("solar battery card editor", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses English labels and section headings from its supplied hass", () => {
    const editor = new SolarBatteryCardEditor();
    editor.hass = hass("en-GB", "de-DE");
    const form = editor.getLocalizedForm();

    expect(form.computeLabel({ name: "battery_soc" })).toBe(
      "Battery state of charge"
    );
    expect(sectionTitles(editor)).toEqual([
      "Live power",
      "Daily energy",
      "Behaviour"
    ]);
  });

  it("uses German labels and section headings from its supplied hass", () => {
    const editor = new SolarBatteryCardEditor();
    editor.hass = hass("de-AT", "en-US");
    const form = editor.getLocalizedForm();

    expect(form.computeLabel({ name: "battery_soc" })).toBe(
      "Batterieladestand"
    );
    expect(sectionTitles(editor)).toEqual([
      "Aktuelle Leistung",
      "Tagesenergie",
      "Verhalten"
    ]);
  });

  it("falls back to hass.language when locale.language is absent", () => {
    const editor = new SolarBatteryCardEditor();
    editor.hass = hass(undefined, "de-CH");

    expect(editor.getLocalizedForm().computeLabel({ name: "title" })).toBe(
      "Titel"
    );
  });

  it("does not depend on browser locale or another card instance", () => {
    vi.stubGlobal("navigator", { language: "de-DE" });
    const card = new SolarBatteryCard();
    card.hass = hass("de-DE");
    card.setConfig(validConfig);
    (
      card as unknown as {
        render(): unknown;
      }
    ).render();

    const editor = new SolarBatteryCardEditor();
    editor.hass = hass("en-US");

    expect(editor.getLocalizedForm().computeLabel({ name: "title" })).toBe(
      "Title"
    );
  });

  it("creates the custom editor after ensuring HA's form is loaded", async () => {
    const elements = new Map<string, unknown>();
    const loadForm = vi.fn(() => {
      elements.set("ha-form", class HaForm {});
    });
    const createCardElement = vi.fn(() => ({
      constructor: { getConfigElement: loadForm }
    }));
    const createElement = vi.fn((name: string) => ({ localName: name }));
    vi.stubGlobal("customElements", {
      get: (name: string) => elements.get(name)
    });
    vi.stubGlobal("window", {
      loadCardHelpers: async () => ({ createCardElement })
    });
    vi.stubGlobal("document", { createElement });

    const editor = await SolarBatteryCard.getConfigElement();

    expect(createCardElement).toHaveBeenCalledWith({ type: "button" });
    expect(loadForm).toHaveBeenCalledOnce();
    expect(createElement).toHaveBeenCalledWith("solar-battery-card-editor");
    expect(editor).toMatchObject({ localName: "solar-battery-card-editor" });
  });
});

describe("editor configuration changes", () => {
  it("retains both capacity fields, emits valid changes and permits clearing controls", () => {
    const editor = new SolarBatteryCardEditor();
    editor.hass = hass("en-US");
    const initial = { ...validConfig, battery_capacity: 4.608, battery_total_capacity: 5.12, battery_lower_soc: 10 };
    editor.setConfig(initial);
    const dispatch = vi.spyOn(editor, "dispatchEvent").mockReturnValue(true);
    const change = (value: unknown) => (editor as unknown as { _valueChanged(event: CustomEvent): void })._valueChanged(new CustomEvent("value-changed", { detail: { value } }));
    change({ ...initial, power_unit: "W" });
    expect((dispatch.mock.calls[0][0] as CustomEvent).detail.config).toMatchObject({ ...initial, power_unit: "W" });
    change({ ...initial, battery_total_capacity: null });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect((editor as unknown as { _error: string })._error).toContain("Set total battery capacity");
    change({ ...initial, battery_total_capacity: null, battery_lower_soc: null });
    const saved = (dispatch.mock.calls[1][0] as CustomEvent).detail.config;
    expect(saved.battery_capacity).toBe(4.608);
    expect(saved.battery_total_capacity).toBeUndefined();
    expect(saved.battery_lower_soc).toBe(0);
  });
  it("localizes new settings and validation", () => {
    const form = getConfigForm("de-DE");
    expect(form.computeLabel({ name: "battery_total_capacity" })).toBe("Gesamte Batteriekapazität");
    expect(form.computeLabel({ name: "solar_forecast_today" })).toBe("Solarprognose heute");
    expect(form.computeHelper({ name: "battery_total_capacity" })).toContain("0–100");
    expect(() => form.assertConfig({ ...validConfig, battery_lower_soc: 100 })).toThrow("SOC-Grenze");
  });
});
