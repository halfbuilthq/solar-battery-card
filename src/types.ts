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
  home_energy_today?: string;
  battery_energy_today?: string;
  export_energy_today?: string;
  battery_capacity?: number;
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
