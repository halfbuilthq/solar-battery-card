import { LitElement, css, html, nothing, svg } from "lit";
import { energyAt, localDay, solarForecast, type EnergyPoint } from "./forecast";
import type { HistoryPoint, HomeAssistant, SolarBatteryCardConfig } from "./types";
import { entity, formatEnergy, formatPower, powerInKw } from "./values";
import { localize } from "./localize";

const LEFT = 64;
const RIGHT = 416;
const TOP = 28;
const BOTTOM = 162;
type PowerKey = "solar" | "home" | "battery";

/** One shared timeline, with independent labelled power and energy scales. */
export class SolarForecastChart extends LitElement {
  static properties = {
    hass: { attribute: false }, config: { attribute: false },
    history: { attribute: false }, historyFailed: { type: Boolean },
    _selected: { state: true }
  };
  hass?: HomeAssistant;
  config?: SolarBatteryCardConfig;
  history: HistoryPoint[] = [];
  historyFailed = false;
  private _selected?: number;
  private _timer?: ReturnType<typeof setInterval>;

  static styles = css`
    :host { display: block; color: var(--primary-text-color, #101521); --forecast-color: #168bba; }
    h2 { font-size: 14px; margin: 0 0 8px; }
    .plot { outline-offset: 3px; border-radius: 4px; }
    svg { display: block; width: 100%; height: auto; min-height: 170px; touch-action: pan-y; }
    text { fill: var(--secondary-text-color, #687286); font-size: 11px; }
    @container (max-width: 360px) { text { font-size: 16px; } }
    .grid { stroke: var(--divider-color, #e2e5e9); stroke-width: 1; }
    .line { fill: none; stroke-width: 2.5; }
    .solar { color: var(--solar-color, #c78a32); stroke: var(--solar-color, #c78a32); }
    .home { color: var(--home-color, #6942b5); stroke: var(--home-color, #6942b5); }
    .battery { color: var(--battery-color, #57874c); stroke: var(--battery-color, #57874c); }
    .line.battery { stroke-dasharray: 7 5; }
    .prediction { color: var(--forecast-color); stroke: var(--forecast-color); }
    .line.prediction { stroke-dasharray: 3 4; }
    .energy-axis { fill: var(--forecast-color); }
    .now { stroke: var(--secondary-text-color, #687286); stroke-dasharray: 2 4; opacity: .5; }
    .selected { stroke: var(--primary-text-color, #101521); opacity: .5; }
    .legend, .inspection { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12px; line-height: 1.5; }
    .legend span { display: inline-flex; align-items: center; gap: 5px; }
    .legend i { display: inline-block; width: 16px; border-top: 2px solid currentColor; }
    .legend .prediction i { border-top-style: dotted; }
    .legend .battery i { border-top-style: dashed; }
    .inspection { margin-top: 6px; overflow-wrap: anywhere; }
    .note { margin: 6px 0 0; font-size: 12px; line-height: 1.5; color: var(--secondary-text-color, #687286); }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this._timer = setInterval(() => this.requestUpdate(), 60_000);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  private inspect(event: PointerEvent, start: number, end: number): void {
    const bounds = (event.currentTarget as SVGElement).getBoundingClientRect();
    if (!bounds.width) return;
    const x = (event.clientX - bounds.left) / bounds.width * 480;
    this._selected = start + Math.min(1, Math.max(0, (x - LEFT) / (RIGHT - LEFT))) * (end - start);
  }
  private navigate(event: KeyboardEvent, start: number, end: number, now: number): void {
    if (event.key === "Escape") { this._selected = undefined; return; }
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    this._selected = event.key === "Home" ? start : event.key === "End" ? end
      : Math.min(end, Math.max(start, (this._selected ?? now) + (event.key === "ArrowLeft" ? -1 : 1) * 3_600_000));
  }

  protected render() {
    if (!this.hass || !this.config) return nothing;
    const config = this.config;
    const locale = this.hass.locale?.language ?? this.hass.language;
    const timeZone = this.hass.config?.time_zone;
    const now = Date.now();
    const day = localDay(new Date(now), timeZone);
    const forecast = solarForecast(entity(this.hass, config.solar_forecast_today), config, day);
    const keys: PowerKey[] = ["solar", "home", "battery"];
    const direction = config.battery_positive_is_charging === false ? -1 : 1;
    const current = {
      solar: powerInKw(entity(this.hass, config.solar_power)),
      home: powerInKw(entity(this.hass, config.home_power)),
      battery: powerInKw(entity(this.hass, config.battery_power))
    };
    if (current.solar !== undefined) current.solar = Math.max(0, current.solar);
    if (current.home !== undefined) current.home = Math.max(0, current.home);
    if (current.battery !== undefined) current.battery *= direction;
    const history = this.history.filter(p => p.timestamp >= day.start && p.timestamp <= now && p.timestamp < day.end)
      .sort((a, b) => a.timestamp - b.timestamp);
    const series = keys.map(key => ({ key, points: [
      ...history.filter(p => Number.isFinite(p[key])).map(p => ({ timestamp: p.timestamp, kwh: p[key] * (key === "battery" ? direction : 1) })),
      ...(current[key] === undefined ? [] : [{ timestamp: now, kwh: current[key]! }])
    ] }));
    const values = series.flatMap(s => s.points.map(p => p.kwh));
    const minimum = Math.min(0, ...values);
    const maximum = Math.max(.1, ...values);
    const energyMaximum = Math.max(1, forecast.totalKwh ?? 0);
    const x = (timestamp: number) => LEFT + (timestamp - day.start) / (day.end - day.start) * (RIGHT - LEFT);
    const powerY = (kw: number) => BOTTOM - (kw - minimum) / (maximum - minimum) * (BOTTOM - TOP);
    const energyY = (kwh: number) => BOTTOM - kwh / energyMaximum * (BOTTOM - TOP);
    const path = (points: EnergyPoint[], y: (n: number) => number) => points.map((p, i) => `${i ? "L" : "M"} ${x(p.timestamp)} ${y(p.kwh)}`).join(" ");
    const selected = this._selected !== undefined && this._selected >= day.start && this._selected <= day.end ? this._selected : undefined;
    const targetLabel = localize(config.solar_forecast_mode === "hourly" ? "forecast.expected" : "forecast.target", locale);
    const time = new Intl.DateTimeFormat(locale, { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    const timeLabel = (timestamp: number) => timestamp === day.end ? "24:00" : time.format(timestamp);

    return html`
      <section aria-label=${localize("forecast.heading", locale)}>
        <h2>${localize("forecast.heading", locale)}</h2>
        <div class="plot" role="group" tabindex="0" aria-label=${localize("forecast.inspect", locale)}
          @keydown=${(event: KeyboardEvent) => this.navigate(event, day.start, day.end, now)}
          @blur=${() => { this._selected = undefined; }}>
          <svg viewBox="0 0 480 195" preserveAspectRatio="none" role="img" aria-label=${localize("forecast.aria", locale)}
            @pointerdown=${(event: PointerEvent) => this.inspect(event, day.start, day.end)}
            @pointermove=${(event: PointerEvent) => this.inspect(event, day.start, day.end)}
            @pointerleave=${(event: PointerEvent) => { if (event.pointerType === "mouse") this._selected = undefined; }}
            @pointercancel=${() => { this._selected = undefined; }}>
            <text x=${LEFT} y="12">${config.power_unit ?? "kW"}</text>
            <text class="energy-axis" x=${RIGHT} y="12" text-anchor="end">${config.energy_unit ?? "kWh"}</text>
            ${[0, .5, 1].map(fraction => svg`
              <line class="grid" x1=${LEFT} x2=${RIGHT} y1=${BOTTOM - fraction * (BOTTOM - TOP)} y2=${BOTTOM - fraction * (BOTTOM - TOP)}></line>
              <text x=${LEFT - 6} y=${BOTTOM - fraction * (BOTTOM - TOP) + 4} text-anchor="end">${formatPower(minimum + (maximum - minimum) * fraction, config.power_unit, { locale }).replace(/\s*(kW|W)$/, "")}</text>
              <text class="energy-axis" x=${RIGHT + 6} y=${energyY(energyMaximum * fraction) + 4}>${formatEnergy(energyMaximum * fraction, config.energy_unit, locale).replace(/\s*(kWh|Wh)$/, "")}</text>
            `)}
            ${[0, .25, .5, .75, 1].map(fraction => {
              const tick = day.start + fraction * (day.end - day.start);
              return svg`<text x=${x(tick)} y="187" text-anchor=${fraction === 0 ? "start" : fraction === 1 ? "end" : "middle"}>${timeLabel(tick)}</text>`;
            })}
            <line class="now" x1=${x(now)} x2=${x(now)} y1=${TOP} y2=${BOTTOM}></line>
            ${series.map(({key, points}) => svg`
              <path class="line ${key}" d=${path(points, powerY)}></path>
              ${points.length ? svg`<circle class=${key} fill="currentColor" cx=${x(points.at(-1)!.timestamp)} cy=${powerY(points.at(-1)!.kwh)} r="3"></circle>` : nothing}
            `)}
            ${forecast.points.length ? svg`<path class="line prediction" d=${path(forecast.points, energyY)}></path>` : nothing}
            ${selected === undefined ? nothing : svg`<line class="selected" x1=${x(selected)} x2=${x(selected)} y1=${TOP} y2=${BOTTOM}></line>`}
          </svg>
        </div>
        <div class="legend">
          ${keys.map(key => html`<span class=${key}><i></i>${localize(`power.${key}`, locale)}</span>`)}
          <span class="prediction"><i></i>${targetLabel}</span>
        </div>
        <div class="inspection" aria-live="polite">
          <span>${selected === undefined ? localize("chart.axis_now", locale) : timeLabel(selected)}</span>
          ${series.map(({key, points}) => html`<span>${localize(`power.${key}`, locale)}: ${formatPower(selected === undefined ? current[key] : energyAt([points], selected), config.power_unit, { locale, signed: key === "battery" })}</span>`)}
          <span>${selected === undefined && config.solar_forecast_mode === "hourly" ? localize("energy.forecast_today", locale) : targetLabel}: ${formatEnergy(selected === undefined ? forecast.totalKwh : energyAt([forecast.points], selected), config.energy_unit, locale)}</span>
        </div>
        ${forecast.status === "ok" ? nothing : html`<p class="note">${localize(
          forecast.status === "incomplete" ? "forecast.incomplete" : forecast.status === "invalid" ? "forecast.invalid" : "forecast.missing", locale)}</p>`}
        ${this.historyFailed ? html`<p class="note">${localize("forecast.history_failed", locale)}</p>` : nothing}
      </section>
    `;
  }
}
if (typeof customElements !== "undefined" && !customElements.get("solar-forecast-chart")) {
  customElements.define("solar-forecast-chart", SolarForecastChart);
}
