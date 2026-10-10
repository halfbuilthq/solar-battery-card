export interface HassEntity {
  entity_id: string;
  state: string;
  last_changed?: string;
  last_updated?: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    device_class?: string;
    [key: string]: unknown;
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  config?: { time_zone?: string };
  callApi<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: unknown
  ): Promise<T>;
  locale?: {
    language?: string;
    number_format?: string;
    time_format?: string;
  };
  language?: string;
}

export interface SolarBatteryCardConfig {
  type: string;
  title?: string;
  battery_soc: string;
  solar_power: string;
  home_power: string;
  battery_power: string;
  grid_power: string;
  solar_energy_today?: string;
  solar_forecast_today?: string;
  show_forecast_line?: boolean;
  solar_forecast_mode?: "daily" | "hourly";
  solar_forecast_attribute?: string;
  solar_forecast_time_field?: string;
  solar_forecast_value_field?: string;
  solar_forecast_input_unit?: "Wh" | "kWh" | "MWh" | "W" | "kW";
  solar_forecast_interval_minutes?: number;
  solar_forecast_time_is_end?: boolean;
  home_energy_today?: string;
  battery_energy_today?: string;
  export_energy_today?: string;
  power_unit?: "W" | "kW";
  energy_unit?: "Wh" | "kWh";
  battery_capacity?: number;
  battery_total_capacity?: number;
  battery_lower_soc?: number;
  battery_positive_is_charging?: boolean;
  grid_positive_is_export?: boolean;
  show_power_chart?: boolean;
}

export interface HistoryPoint {
  timestamp: number;
  solar: number;
  home: number;
  battery: number;
}

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<{
      createCardElement(
        config: Record<string, unknown>
      ): HTMLElement | Promise<HTMLElement>;
    }>;
    customCards?: Array<{
      type: string;
      name: string;
      preview?: boolean;
      description?: string;
      documentationURL?: string;
    }>;
  }

  interface HTMLElementTagNameMap {
    "solar-battery-card": HTMLElement;
    "solar-battery-card-editor": HTMLElement;
  }
}
