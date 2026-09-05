import { LitElement, css, html, nothing } from "lit";
import { getConfigForm } from "./config";
import type { HomeAssistant, SolarBatteryCardConfig } from "./types";

type ConfigElementCardConstructor = Function & {
  getConfigElement?: () => HTMLElement | Promise<HTMLElement>;
};

export async function ensureHaFormLoaded(): Promise<void> {
  if (customElements.get("ha-form")) return;

  const helpers = await window.loadCardHelpers?.();
  const buttonCard = await helpers?.createCardElement({ type: "button" });
  const constructor = buttonCard?.constructor as
    | ConfigElementCardConstructor
    | undefined;
  await constructor?.getConfigElement?.();

  if (!customElements.get("ha-form")) {
    throw new Error("Home Assistant's form editor is unavailable.");
  }
}

export class SolarBatteryCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true }
  };

  hass?: HomeAssistant;
  private _config?: SolarBatteryCardConfig;

  static styles = css`
    :host {
      display: block;
    }
  `;

  setConfig(config: SolarBatteryCardConfig): void {
    const form = this.getLocalizedForm();
    form.assertConfig(config);
    this._config = config;
  }

  getLocalizedForm() {
    const locale = this.hass?.locale?.language ?? this.hass?.language;
    return getConfigForm(locale);
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const form = this.getLocalizedForm();
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${form.schema}
        .computeLabel=${form.computeLabel}
        .computeHelper=${form.computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(event: CustomEvent): void {
    event.stopPropagation();
    const config = event.detail.value as SolarBatteryCardConfig;
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: true,
        composed: true,
        detail: { config }
      })
    );
  }
}
