import type { HomeAssistant, SolarBatteryCardConfig } from "./types";

export const DEFAULT_CONFIG: Partial<SolarBatteryCardConfig> = {
  title: "Solar & storage",
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

const FIELD_LABELS: Record<string, string> = {
  title: "Title",
  battery_soc: "Battery state of charge",
  solar_power: "Solar power",
  home_power: "Home power",
  battery_power: "Battery power",
  grid_power: "Grid power",
  solar_energy_today: "Solar energy today",
  home_energy_today: "Home energy today",
  battery_energy_today: "Battery energy stored today",
  export_energy_today: "Grid energy exported today",
  battery_capacity: "Usable battery capacity",
  battery_positive_is_charging: "Positive battery power means charging",
  grid_positive_is_export: "Positive grid power means export",
  show_power_chart: "Show 24-hour power chart"
};

const FIELD_HELPERS: Record<string, string> = {
  battery_capacity: "Optional. Used to estimate when the battery will be full.",
  battery_positive_is_charging:
    "Turn this off if your integration reports charging as a negative value.",
  grid_positive_is_export:
    "Turn this off if your integration reports grid export as a negative value."
};

export function getConfigForm() {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "",
        title: "Live power",
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
        title: "Daily energy",
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
        title: "Behaviour",
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
      schema.name ? FIELD_LABELS[schema.name] : undefined,
    computeHelper: (schema: { name?: string }) =>
      schema.name ? FIELD_HELPERS[schema.name] : undefined,
    assertConfig: (config: SolarBatteryCardConfig) => validateConfig(config)
  };
}

export function validateConfig(config: SolarBatteryCardConfig): void {
  for (const field of ENTITY_FIELDS) {
    if (!config[field] || typeof config[field] !== "string") {
      throw new Error(`${FIELD_LABELS[field]} is required.`);
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

