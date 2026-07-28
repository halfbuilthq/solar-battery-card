import { mdiBatteryCharging } from "@mdi/js";
import { LitElement, html, nothing, svg, type PropertyValues } from "lit";
import { cardStyles } from "./styles";
import {
  getConfigForm,
  getStubConfig,
  normalizeConfig,
  validateConfig
} from "./config";
import {
  chartPositionPercent,
  chartTooltipPosition,
  nearestChartPointIndex
} from "./chart";
import { fetchPowerHistory } from "./history";
import type {
  HistoryPoint,
  HomeAssistant,
  SolarBatteryCardConfig
} from "./types";
import {
  energyInKwh,
  entity,
  estimateFullTime,
  formatValue,
  numericState,
  powerInKw
} from "./values";

const CHART_WIDTH = 480;
const CHART_HEIGHT = 126;
const HISTORY_REFRESH_MS = 5 * 60 * 1000;

type ChartKey = "solar" | "home" | "battery";
type ChartPointer = ReturnType<typeof chartTooltipPosition>;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function chartCoordinates(
  points: HistoryPoint[],
  key: ChartKey,
  minValue: number,
  maxValue: number
): Array<[number, number]> {
  if (points.length === 0) return [];
  const range = Math.max(0.1, maxValue - minValue);
  return points.map((point, index) => [
    (index / Math.max(1, points.length - 1)) * CHART_WIDTH,
    4 + ((maxValue - point[key]) / range) * (CHART_HEIGHT - 8)
  ]);
}

function smoothPath(coordinates: Array<[number, number]>): string {
  if (coordinates.length === 0) return "";
  if (coordinates.length === 1) {
    return `M 0 ${coordinates[0][1]} L ${CHART_WIDTH} ${coordinates[0][1]}`;
  }

  return coordinates.slice(1).reduce((path, [x, y], index) => {
    const [previousX, previousY] = coordinates[index];
    const midpoint = (previousX + x) / 2;
    return `${path} C ${midpoint} ${previousY}, ${midpoint} ${y}, ${x} ${y}`;
  }, `M ${coordinates[0][0]} ${coordinates[0][1]}`);
}

function fallbackHistory(
  solar: number,
  home: number,
  battery: number,
  now = Date.now()
): HistoryPoint[] {
  const solarShape = [0, 0.02, 0.08, 0.28, 0.58, 0.86, 1, 0.93, 0.7, 0.32, 0.08];
  const homeShape = [0.58, 0.59, 0.6, 0.68, 0.76, 0.78, 0.92, 0.88, 1, 0.98, 1.04];
  const batteryShape = [0.25, 0.25, 0.27, 0.38, 0.58, 0.78, 1, 0.96, 0.7, 0.36, 0.2];

  return solarShape.map((shape, index) => ({
    timestamp: now - (solarShape.length - 1 - index) * 2.4 * 60 * 60 * 1000,
    solar: shape * Math.max(solar, 0.1),
    home: homeShape[index] * Math.max(home, 0.1),
    battery: batteryShape[index] * battery
  }));
}

export class SolarBatteryCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _history: { state: true },
    _historyLoading: { state: true },
    _historyFailed: { state: true },
    _activeChartIndex: { state: true },
    _chartPointer: { state: true }
  };

  static styles = cardStyles;

  hass?: HomeAssistant;
  private _config?: SolarBatteryCardConfig;
  private _history: HistoryPoint[] = [];
  private _historyLoading = false;
  private _historyFailed = false;
  private _activeChartIndex?: number;
  private _chartPointer?: ChartPointer;
  private _lastHistoryKey = "";
  private _lastHistoryFetch = 0;

  static getConfigForm() {
    return getConfigForm();
  }

  static getStubConfig(hass?: HomeAssistant) {
    return getStubConfig(hass);
  }

  setConfig(config: SolarBatteryCardConfig): void {
    validateConfig(config);
    this._config = normalizeConfig({ ...config });
  }

  getCardSize(): number {
    return this._config?.show_power_chart === false ? 8 : 12;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 3
    };
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("hass") || changedProperties.has("_config")) {
      queueMicrotask(() => void this._loadHistoryIfNeeded());
    }
  }

  private async _loadHistoryIfNeeded(): Promise<void> {
    const config = this._config;
    const hass = this.hass;
    if (!config || !hass || config.show_power_chart === false) return;

    const key = [config.solar_power, config.home_power, config.battery_power].join("|");
    const now = Date.now();
    if (
      this._historyLoading ||
      (key === this._lastHistoryKey && now - this._lastHistoryFetch < HISTORY_REFRESH_MS)
    ) {
      return;
    }

    this._historyLoading = true;
    this._historyFailed = false;
    this._lastHistoryKey = key;
    this._lastHistoryFetch = now;

    try {
      this._history = await fetchPowerHistory(hass, {
        solar: config.solar_power,
        home: config.home_power,
        battery: config.battery_power
      });
    } catch {
      this._history = [];
      this._historyFailed = true;
    } finally {
      this._historyLoading = false;
    }
  }

  private _inspectChart(event: PointerEvent, pointCount: number): void {
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this._chartPointer = chartTooltipPosition(
      event.clientX - bounds.left,
      event.clientY - bounds.top,
      bounds.width,
      bounds.height
    );
    const index = nearestChartPointIndex(
      event.clientX,
      bounds.left,
      bounds.width,
      pointCount
    );
    if (index !== this._activeChartIndex) this._activeChartIndex = index;
  }

  private _leaveChart(event: PointerEvent): void {
    if (event.pointerType === "mouse") {
      this._activeChartIndex = undefined;
      this._chartPointer = undefined;
    }
  }

  private _navigateChart(event: KeyboardEvent, pointCount: number): void {
    this._chartPointer = undefined;
    if (event.key === "Escape") {
      this._activeChartIndex = undefined;
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const current = this._activeChartIndex ?? pointCount - 1;
    this._activeChartIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? pointCount - 1
          : clamp(current + (event.key === "ArrowLeft" ? -1 : 1), 0, pointCount - 1);
  }

  private _renderChart(points: HistoryPoint[], locale?: string) {
    const values = points.flatMap((point) => [
      point.solar,
      point.home,
      point.battery
    ]);
    const minValue = Math.min(0, ...values);
    const maxValue = Math.max(
      0.1,
      ...values
    );
    const range = Math.max(0.1, maxValue - minValue);
    const zeroY = 4 + (maxValue / range) * (CHART_HEIGHT - 8);
    const series: Array<{ key: ChartKey; path: string; end: [number, number] }> = (
      ["solar", "home", "battery"] as ChartKey[]
    ).map((key) => {
      const coordinates = chartCoordinates(points, key, minValue, maxValue);
      return {
        key,
        path: smoothPath(coordinates),
        end: coordinates.at(-1) ?? [CHART_WIDTH, CHART_HEIGHT]
      };
    });
    const activeIndex =
      this._activeChartIndex === undefined
        ? undefined
        : clamp(this._activeChartIndex, 0, points.length - 1);
    const activePoint =
      activeIndex === undefined ? undefined : points[activeIndex];
    const activeX =
      activeIndex === undefined
        ? undefined
        : (activeIndex / Math.max(1, points.length - 1)) * CHART_WIDTH;
    const activePosition =
      activeIndex === undefined
        ? undefined
        : chartPositionPercent(activeIndex, points.length);
    const activeCoordinates =
      activeIndex === undefined
        ? []
        : (["solar", "home", "battery"] as ChartKey[]).map((key) => ({
            key,
            coordinate: chartCoordinates(points, key, minValue, maxValue)[activeIndex]
          }));
    const tooltipPlacement =
      this._chartPointer?.placement ??
      (activePosition !== undefined && activePosition > 64
        ? "place-left"
        : "place-right");
    const tooltipStyle = this._chartPointer
      ? `left: ${this._chartPointer.x}px; top: ${this._chartPointer.top}px`
      : `left: ${activePosition ?? 0}%`;
    const tooltipTime = activePoint
      ? new Intl.DateTimeFormat(locale, {
          hour: "numeric",
          minute: "2-digit"
        }).format(activePoint.timestamp)
      : "";

    return html`
      <div
        class="chart-wrap"
        role="group"
        tabindex="0"
        aria-label="Inspect solar, home and battery power history"
        @pointerdown=${(event: PointerEvent) => this._inspectChart(event, points.length)}
        @pointermove=${(event: PointerEvent) => this._inspectChart(event, points.length)}
        @pointerleave=${this._leaveChart}
        @keydown=${(event: KeyboardEvent) => this._navigateChart(event, points.length)}
        @blur=${() => {
          this._activeChartIndex = undefined;
          this._chartPointer = undefined;
        }}
      >
        <svg
          viewBox="0 0 ${CHART_WIDTH} ${CHART_HEIGHT}"
          role="img"
          aria-label="Solar, home and battery power for the past 24 hours"
          preserveAspectRatio="none"
        >
          ${[0, 1, 2, 3].map((index) => {
            const y = (index / 3) * CHART_HEIGHT;
            return svg`<line class="grid-line" x1="0" y1=${y} x2=${CHART_WIDTH} y2=${y}></line>`;
          })}
          ${[0, 1, 2, 3, 4].map((index) => {
            const x = (index / 4) * CHART_WIDTH;
            return svg`<line class="grid-line" x1=${x} y1="0" x2=${x} y2=${CHART_HEIGHT}></line>`;
          })}
          <line
            class="zero-line"
            x1="0"
            y1=${zeroY}
            x2=${CHART_WIDTH}
            y2=${zeroY}
          ></line>
          ${series.map(
            ({ key, path, end }) => svg`
              <path class="chart-line ${key}" d=${path}></path>
              <circle class="end-dot ${key}" cx=${end[0]} cy=${end[1]} r="4.5"></circle>
            `
          )}
          ${activeX === undefined
            ? nothing
            : svg`
                <line
                  class="inspection-line"
                  x1=${activeX}
                  y1="0"
                  x2=${activeX}
                  y2=${CHART_HEIGHT}
                ></line>
                ${activeCoordinates.map(
                  ({ key, coordinate }) => svg`
                    <circle
                      class="inspection-dot ${key}"
                      cx=${coordinate[0]}
                      cy=${coordinate[1]}
                      r="5"
                    ></circle>
                  `
                )}
              `}
        </svg>
        ${activePoint && activePosition !== undefined
          ? html`
              <div
                class="chart-tooltip ${tooltipPlacement}"
                style=${tooltipStyle}
                aria-live="polite"
              >
                <time>${tooltipTime}</time>
                ${[
                  { key: "solar", label: "Solar", value: activePoint.solar, signed: false },
                  { key: "home", label: "Home", value: activePoint.home, signed: false },
                  {
                    key: "battery",
                    label: "Battery",
                    value: activePoint.battery,
                    signed: true
                  }
                ].map(
                  (item) => html`
                    <div class="tooltip-item ${item.key}">
                      <span><i></i>${item.label}</span>
                      <strong>
                        ${formatValue(item.value, "kW", {
                          signed: item.signed,
                          locale
                        })}
                      </strong>
                    </div>
                  `
                )}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  protected render() {
    const config = this._config;
    if (!config) return nothing;

    const hass = this.hass;
    const locale = hass?.locale?.language ?? hass?.language;
    const stateOfCharge = clamp(
      numericState(entity(hass, config.battery_soc)) ?? 0,
      0,
      100
    );
    const solarPower = Math.max(0, powerInKw(entity(hass, config.solar_power)) ?? 0);
    const homePower = Math.max(0, powerInKw(entity(hass, config.home_power)) ?? 0);
    const batteryRaw = powerInKw(entity(hass, config.battery_power)) ?? 0;
    const gridRaw = powerInKw(entity(hass, config.grid_power)) ?? 0;
    const batteryDirection =
      config.battery_positive_is_charging === false ? -1 : 1;
    const chargingPower = batteryDirection * batteryRaw;
    const exportPower =
      (config.grid_positive_is_export === false ? -1 : 1) * gridRaw;
    const status =
      chargingPower > 0.05 ? "charging" : chargingPower < -0.05 ? "discharging" : "idle";
    const statusLabel =
      status === "charging" ? "Charging" : status === "discharging" ? "Discharging" : "Idle";
    const fullTime = estimateFullTime(
      stateOfCharge,
      Math.max(0, chargingPower),
      config.battery_capacity
    );
    const timeFormatter = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit"
    });
    const chartPoints: HistoryPoint[] =
      this._history.length > 1
        ? this._history.map((point) => ({
            ...point,
            battery: batteryDirection * point.battery
          }))
        : fallbackHistory(solarPower, homePower, chargingPower);

    const energyStats = [
      {
        label: "Generated",
        value: energyInKwh(entity(hass, config.solar_energy_today)),
        tone: "solar"
      },
      {
        label: "Consumed",
        value: energyInKwh(entity(hass, config.home_energy_today)),
        tone: "home"
      },
      {
        label: "Stored",
        value: energyInKwh(entity(hass, config.battery_energy_today)),
        tone: "battery"
      },
      {
        label: "Exported",
        value: energyInKwh(entity(hass, config.export_energy_today)),
        tone: "export"
      }
    ];

    const footer =
      solarPower >= homePower && chargingPower > 0.05 && exportPower > 0.05
        ? "Solar covering home, charging battery and exporting"
        : solarPower >= homePower && chargingPower > 0.05
          ? "Solar covering home and charging the battery"
          : solarPower >= homePower
            ? "Solar covering the current home load"
            : "Home load is drawing from battery or grid";

    return html`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${mdiBatteryCharging}></path></svg>
              </div>
              <div>
                <h1>${config.title || "Solar & storage"}</h1>
                <p class="subtitle">Battery outlook <span aria-hidden="true">·</span> Today</p>
              </div>
            </div>
            <div class="status ${status}">
              <span class="dot"></span>
              ${statusLabel}
            </div>
          </header>

          <section class="battery-hero" aria-label="Battery status">
            <div>
              <div class="percentage">${Math.round(stateOfCharge)}<span>%</span></div>
              <strong class="forecast">
                ${fullTime
                  ? `Full by ${timeFormatter.format(fullTime)}`
                  : status === "charging"
                    ? "Charging now"
                    : statusLabel}
              </strong>
            </div>
            <div
              class="battery-graphic"
              role="img"
              aria-label="Battery ${Math.round(stateOfCharge)} percent charged"
            >
              <div class="battery-shell">
                <div class="battery-fill" style="width: ${stateOfCharge}%"></div>
              </div>
              <div class="battery-cap"></div>
            </div>
            <div class="charge-line">
              <span>
                ${status === "charging"
                  ? "Charging battery"
                  : status === "discharging"
                    ? "Supplying home"
                    : "Battery idle"}
              </span>
              <strong>
                ${formatValue(chargingPower, "kW", {
                  signed: true,
                  locale
                })}
              </strong>
            </div>
          </section>

          <section class="power-stats" aria-label="Current power">
            ${[
              { label: "Solar", value: solarPower, tone: "solar", signed: false },
              { label: "Home", value: homePower, tone: "home", signed: false },
              { label: "Battery", value: chargingPower, tone: "battery", signed: true },
              { label: "Export", value: exportPower, tone: "export", signed: false }
            ].map(
              (item) => html`
                <div class="power-stat ${item.tone}">
                  <span>${item.label}</span>
                  <strong>
                    ${formatValue(item.value, "kW", {
                      signed: item.signed,
                      locale
                    })}
                  </strong>
                </div>
              `
            )}
          </section>

          ${config.show_power_chart === false
            ? nothing
            : html`
                <section class="chart-section">
                  <div class="section-heading">
                    <h2>Power · 24 hours</h2>
                    <time>${timeFormatter.format(new Date())}</time>
                  </div>
                  ${this._renderChart(chartPoints, locale)}
                  <div class="chart-axis" aria-hidden="true">
                    <span>24h ago</span>
                    <span>18h</span>
                    <span>12h</span>
                    <span>6h</span>
                    <span>Now</span>
                  </div>
                  <div class="legend" aria-label="Chart legend">
                    <span class="solar"><i></i>Solar</span>
                    <span class="home"><i></i>Home</span>
                    <span class="battery"><i></i>Battery</span>
                  </div>
                  ${this._historyFailed
                    ? html`<p class="history-note">Live history unavailable · showing current profile</p>`
                    : nothing}
                </section>
              `}

          <section class="energy-stats" aria-label="Energy today">
            ${energyStats.map(
              (item) => html`
                <div class="energy-stat ${item.tone}">
                  <i aria-hidden="true"></i>
                  <div>
                    <span>${item.label}</span>
                    <strong>${formatValue(item.value, "kWh", { digits: 1, locale })}</strong>
                  </div>
                </div>
              `
            )}
          </section>

          <footer class="footer">
            <span class="dot" aria-hidden="true"></span>
            <span>${footer}</span>
          </footer>
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get("solar-battery-card")) {
  customElements.define("solar-battery-card", SolarBatteryCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "solar-battery-card")) {
  window.customCards.push({
    type: "solar-battery-card",
    name: "Solar & Battery Card",
    preview: true,
    description: "A battery-first solar, power and daily energy overview."
  });
}
