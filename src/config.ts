import { localize } from "./localize";
import type { HomeAssistant, SolarBatteryCardConfig } from "./types";

export const DEFAULT_CONFIG: Partial<SolarBatteryCardConfig> = {
  battery_positive_is_charging: true,
  grid_positive_is_export: true,
  show_power_chart: true,
  power_unit: "kW",
  energy_unit: "kWh",
  battery_lower_soc: 0,
  show_forecast_line: false,
  solar_forecast_mode: "daily",
  solar_forecast_attribute: "forecast",
  solar_forecast_time_field: "start",
  solar_forecast_value_field: "energy",
  solar_forecast_input_unit: "kWh",
  solar_forecast_interval_minutes: 60,
  solar_forecast_time_is_end: false
};

const ENTITY_FIELDS = [
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power"
] as const;

const LABELLED_FIELDS = [
  "title",
  "power_unit",
  "energy_unit",
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power",
  "solar_energy_today",
  "solar_forecast_today",
  "show_forecast_line",
  "solar_forecast_mode",
  "solar_forecast_attribute",
  "solar_forecast_time_field",
  "solar_forecast_value_field",
  "solar_forecast_input_unit",
  "solar_forecast_interval_minutes",
  "solar_forecast_time_is_end",
  "home_energy_today",
  "battery_energy_today",
  "export_energy_today",
  "battery_capacity",
  "battery_total_capacity",
  "battery_lower_soc",
  "battery_positive_is_charging",
  "grid_positive_is_export",
  "show_power_chart"
] as const;

const HELPED_FIELDS = [
  "solar_forecast_today",
  "show_forecast_line",
  "solar_forecast_mode",
  "solar_forecast_attribute",
  "solar_forecast_time_field",
  "solar_forecast_value_field",
  "solar_forecast_input_unit",
  "solar_forecast_interval_minutes",
  "solar_forecast_time_is_end",
  "battery_capacity",
  "battery_total_capacity",
  "battery_lower_soc",
  "battery_positive_is_charging",
  "grid_positive_is_export"
] as const;

type LabelledField = (typeof LABELLED_FIELDS)[number];
type HelpedField = (typeof HELPED_FIELDS)[number];

function isLabelledField(name: string): name is LabelledField {
  return (LABELLED_FIELDS as readonly string[]).includes(name);
}

function isHelpedField(name: string): name is HelpedField {
  return (HELPED_FIELDS as readonly string[]).includes(name);
}

function fieldLabel(name: LabelledField, locale?: string): string {
  return localize(`editor.field.${name}` as const, locale);
}

function fieldHelper(name: HelpedField, locale?: string): string {
  return localize(`editor.helper.${name}` as const, locale);
}

export function getConfigForm(locale?: string) {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "",
        title: localize("editor.section.live_power", locale),
        flatten: true,
        schema: [
          {
            type: "grid",
            name: "",
            flatten: true,
            column_min_width: "220px",
            schema: [
              { name: "battery_soc", required: true, selector: { entity: { domain: "sensor" } } },
              { name: "solar_power", required: true, selector: { entity: { domain: "sensor" } } },
              { name: "home_power", required: true, selector: { entity: { domain: "sensor" } } },
              { name: "battery_power", required: true, selector: { entity: { domain: "sensor" } } },
              { name: "grid_power", required: true, selector: { entity: { domain: "sensor" } } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: localize("editor.section.daily_energy", locale),
        flatten: true,
        schema: [
          {
            type: "grid",
            name: "",
            flatten: true,
            column_min_width: "220px",
            schema: [
              { name: "solar_energy_today", selector: { entity: { domain: "sensor" } } },
              { name: "home_energy_today", selector: { entity: { domain: "sensor" } } },
              { name: "battery_energy_today", selector: { entity: { domain: "sensor" } } },
              { name: "export_energy_today", selector: { entity: { domain: "sensor" } } }
            ]
          }
        ]
      },
      {
        type: "expandable", name: "", flatten: true,
        title: localize("editor.section.solar_forecast", locale),
        schema: [
          { name: "solar_forecast_today", selector: { entity: { domain: "sensor" } } },
          { name: "show_forecast_line", selector: { boolean: {} } },
          { name: "solar_forecast_mode", selector: { select: { options: [
            { value: "daily", label: localize("forecast.mode.daily", locale) },
            { value: "hourly", label: localize("forecast.mode.hourly", locale) }
          ] } } },
          {
            type: "expandable", name: "", flatten: true,
            title: localize("editor.section.hourly_forecast", locale),
            schema: [
              { name: "solar_forecast_attribute", selector: { text: {} } },
              { name: "solar_forecast_time_field", selector: { text: {} } },
              { name: "solar_forecast_value_field", selector: { text: {} } },
              { name: "solar_forecast_input_unit", selector: { select: { options: ["Wh", "kWh", "MWh", "W", "kW"] } } },
              { name: "solar_forecast_interval_minutes", selector: { number: { min: 1, max: 1440, step: 1, mode: "box", unit_of_measurement: "min" } } },
              { name: "solar_forecast_time_is_end", selector: { boolean: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: localize("editor.section.behaviour", locale),
        flatten: true,
        schema: [
          { name: "power_unit", selector: { select: { options: ["W", "kW"] } } },
          { name: "energy_unit", selector: { select: { options: ["Wh", "kWh"] } } },
          {
            name: "battery_capacity",
            selector: { number: { min: 0, max: 500, step: 0.1, unit_of_measurement: "kWh" } }
          },
          { name: "battery_total_capacity", selector: { number: { min: 0.01, step: 0.01, mode: "box", unit_of_measurement: "kWh" } } },
          { name: "battery_lower_soc", selector: { number: { min: 0, max: 99.99, step: 0.01, mode: "box", unit_of_measurement: "%" } } },
          { name: "battery_positive_is_charging", selector: { boolean: {} } },
          { name: "grid_positive_is_export", selector: { boolean: {} } },
          { name: "show_power_chart", selector: { boolean: {} } }
        ]
      }
    ],
    computeLabel: (schema: { name?: string }) =>
      schema.name && isLabelledField(schema.name)
        ? fieldLabel(schema.name, locale)
        : undefined,
    computeHelper: (schema: { name?: string }) =>
      schema.name && isHelpedField(schema.name)
        ? fieldHelper(schema.name, locale)
        : undefined,
    assertConfig: (config: SolarBatteryCardConfig) => validateConfig(config, locale)
  };
}

export function validateConfig(
  config: SolarBatteryCardConfig,
  locale?: string
): void {
  config = normalizeConfig(config);
  for (const [field, allowed] of [["power_unit", ["W", "kW"]], ["energy_unit", ["Wh", "kWh"]]] as const) {
    if (!(allowed as readonly unknown[]).includes(config[field])) {
      throw new Error(localize("editor.error.unit", locale, { field: fieldLabel(field, locale) }));
    }
  }
  if (config.solar_forecast_today !== undefined &&
      (typeof config.solar_forecast_today !== "string" || !/^sensor\.[a-z0-9_]+$/.test(config.solar_forecast_today))) {
    throw new Error(localize("editor.error.forecast_entity", locale));
  }
  if (!["daily", "hourly"].includes(config.solar_forecast_mode!)) {
    throw new Error(localize("editor.error.forecast_mode", locale));
  }
  for (const field of ["show_forecast_line", "solar_forecast_time_is_end"] as const) {
    if (typeof config[field] !== "boolean") throw new Error(localize("editor.error.boolean", locale, { field: fieldLabel(field, locale) }));
  }
  if (config.solar_forecast_mode === "hourly") {
    for (const field of ["solar_forecast_attribute", "solar_forecast_time_field", "solar_forecast_value_field"] as const) {
      if (typeof config[field] !== "string" || !/^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*$/.test(config[field]!)) {
        throw new Error(localize("editor.error.forecast_path", locale, { field: fieldLabel(field, locale) }));
      }
    }
    if (!["Wh", "kWh", "MWh", "W", "kW"].includes(config.solar_forecast_input_unit!)) {
      throw new Error(localize("editor.error.unit", locale, { field: fieldLabel("solar_forecast_input_unit", locale) }));
    }
    const minutes = config.solar_forecast_interval_minutes;
    if (typeof minutes !== "number" || !Number.isInteger(minutes) || minutes < 1 || minutes > 1440) {
      throw new Error(localize("editor.error.forecast_interval", locale));
    }
  }
  const capacity = config.battery_total_capacity;
  const reserve = config.battery_lower_soc ?? 0;
  if (capacity !== undefined && (typeof capacity !== "number" || !Number.isFinite(capacity) || capacity <= 0)) {
    throw new Error(localize("editor.error.total_capacity", locale));
  }
  if (typeof reserve !== "number" || !Number.isFinite(reserve) || reserve < 0 || reserve >= 100) {
    throw new Error(localize("editor.error.lower_soc", locale));
  }
  if (reserve !== 0 && capacity === undefined) {
    throw new Error(localize("editor.error.reserve_requires_capacity", locale));
  }
  for (const field of ENTITY_FIELDS) {
    if (!config[field] || typeof config[field] !== "string") {
      throw new Error(
        localize("editor.error.required", locale, {
          field: fieldLabel(field, locale)
        })
      );
    }
  }
}

export function cardTitle(
  config: SolarBatteryCardConfig,
  locale?: string
): string {
  return config.title !== undefined
    ? config.title
    : localize("card.default_title", locale);
}

export function normalizeConfig(config: SolarBatteryCardConfig): SolarBatteryCardConfig {
  const cleaned = { ...config };
  for (const field of ["power_unit", "energy_unit", "solar_forecast_today", "battery_total_capacity", "battery_lower_soc", "show_forecast_line", "solar_forecast_mode", "solar_forecast_attribute", "solar_forecast_time_field", "solar_forecast_value_field", "solar_forecast_input_unit", "solar_forecast_interval_minutes", "solar_forecast_time_is_end"] as const) {
    const value: unknown = cleaned[field];
    if (value === undefined || value === null || value === "") delete cleaned[field];
  }
  return {
    ...DEFAULT_CONFIG,
    ...cleaned,
    type: config.type || "custom:solar-battery-card"
  } as SolarBatteryCardConfig;
}

function findEntity(
  hass: HomeAssistant | undefined,
  deviceClass: string,
  nameTerms: string[]
): string {
  if (!hass) return "";

  const match = Object.values(hass.states).find((entity) => {
    if (entity.attributes.device_class !== deviceClass) return false;
    const haystack = `${entity.entity_id} ${entity.attributes.friendly_name ?? ""}`.toLowerCase();
    return nameTerms.some((term) => haystack.includes(term));
  });

  return match?.entity_id ?? "";
}

export function getStubConfig(hass?: HomeAssistant): SolarBatteryCardConfig {
  return normalizeConfig({
    type: "custom:solar-battery-card",
    battery_soc:
      findEntity(hass, "battery", ["battery", "storage"]) || "sensor.battery_state_of_charge",
    solar_power: findEntity(hass, "power", ["solar", "pv"]) || "sensor.solar_power",
    home_power: findEntity(hass, "power", ["home", "house", "load"]) || "sensor.home_power",
    battery_power:
      findEntity(hass, "power", ["battery", "storage"]) || "sensor.battery_power",
    grid_power: findEntity(hass, "power", ["grid"]) || "sensor.grid_power"
  });
}
