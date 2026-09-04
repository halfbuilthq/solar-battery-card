import { localize } from "./localize";
import type { HomeAssistant, SolarBatteryCardConfig } from "./types";

export const DEFAULT_CONFIG: Partial<SolarBatteryCardConfig> = {
  battery_positive_is_charging: true,
  grid_positive_is_export: true,
  show_power_chart: true
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
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power",
  "solar_energy_today",
  "home_energy_today",
  "battery_energy_today",
  "export_energy_today",
  "battery_capacity",
  "battery_positive_is_charging",
  "grid_positive_is_export",
  "show_power_chart"
] as const;

const HELPED_FIELDS = [
  "battery_capacity",
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

function fieldLabel(name: LabelledField): string {
  return localize(`editor.field.${name}` as const);
}

function fieldHelper(name: HelpedField): string {
  return localize(`editor.helper.${name}` as const);
}

export function getConfigForm() {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "",
        title: localize("editor.section.live_power"),
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
        title: localize("editor.section.daily_energy"),
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
        type: "expandable",
        name: "",
        title: localize("editor.section.behaviour"),
        flatten: true,
        schema: [
          {
            name: "battery_capacity",
            selector: { number: { min: 0, max: 500, step: 0.1, unit_of_measurement: "kWh" } }
          },
          { name: "battery_positive_is_charging", selector: { boolean: {} } },
          { name: "grid_positive_is_export", selector: { boolean: {} } },
          { name: "show_power_chart", selector: { boolean: {} } }
        ]
      }
    ],
    computeLabel: (schema: { name?: string }) =>
      schema.name && isLabelledField(schema.name) ? fieldLabel(schema.name) : undefined,
    computeHelper: (schema: { name?: string }) =>
      schema.name && isHelpedField(schema.name) ? fieldHelper(schema.name) : undefined,
    assertConfig: (config: SolarBatteryCardConfig) => validateConfig(config)
  };
}

export function validateConfig(config: SolarBatteryCardConfig): void {
  for (const field of ENTITY_FIELDS) {
    if (!config[field] || typeof config[field] !== "string") {
      throw new Error(
        localize("editor.error.required", undefined, { field: fieldLabel(field) })
      );
    }
  }
}

export function normalizeConfig(config: SolarBatteryCardConfig): SolarBatteryCardConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
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
