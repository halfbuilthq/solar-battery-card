import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    color: var(--primary-text-color, #111522);
    font-family: var(
      --paper-font-body1_-_font-family,
      ui-sans-serif,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif
    );
  }

  * {
    box-sizing: border-box;
  }

  ha-card {
    display: block;
    overflow: hidden;
    padding: 18px;
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    box-shadow: var(
      --ha-card-box-shadow,
      0 10px 28px rgba(25, 37, 55, 0.11)
    );
  }

  .card {
    container-type: inline-size;
  }

  .header,
  .title-group,
  .status,
  .charge-line,
  .section-heading,
  .legend,
  .footer {
    display: flex;
    align-items: center;
  }

  .header {
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 14px;
  }

  .title-group {
    min-width: 0;
    gap: 14px;
  }

  .icon-tile {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 11px;
    color: var(--info-color, #1976d2);
    background: color-mix(in srgb, var(--info-color, #1976d2) 10%, transparent);
  }

  .icon-tile svg {
    width: 25px;
    height: 25px;
    fill: currentColor;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    overflow: hidden;
    color: var(--primary-text-color, #101521);
    font-size: 21px;
    font-weight: 720;
    line-height: 1.15;
    letter-spacing: -0.35px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subtitle {
    margin-top: 4px;
    color: var(--secondary-text-color, #687286);
    font-size: 14px;
  }

  .status {
    gap: 8px;
    flex: 0 0 auto;
    padding: 9px 14px;
    border-radius: 999px;
    color: var(--success-color, #27863a);
    background: color-mix(
      in srgb,
      var(--success-color, #2d963f) 11%,
      var(--ha-card-background, #fff)
    );
    font-size: 13px;
    font-weight: 700;
  }

  .status.discharging {
    color: var(--warning-color, #d97706);
    background: color-mix(
      in srgb,
      var(--warning-color, #d97706) 11%,
      var(--ha-card-background, #fff)
    );
  }

  .status.idle {
    color: var(--secondary-text-color, #687286);
    background: color-mix(
      in srgb,
      var(--secondary-text-color, #687286) 9%,
      var(--ha-card-background, #fff)
    );
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }

  .battery-hero {
    display: grid;
    grid-template-columns: minmax(132px, 1fr) minmax(155px, 1.7fr);
    align-items: center;
    gap: 13px 24px;
    padding: 15px 20px 13px;
    border: 1px solid
      color-mix(in srgb, var(--success-color, #2d963f) 28%, transparent);
    border-radius: 11px;
    background: color-mix(
      in srgb,
      var(--success-color, #2d963f) 4%,
      var(--ha-card-background, #fff)
    );
  }

  .percentage {
    color: var(--primary-text-color, #101521);
    font-size: 54px;
    font-weight: 780;
    line-height: 0.95;
    letter-spacing: -3px;
  }

  .percentage span {
    margin-left: 3px;
    font-size: 27px;
    letter-spacing: -1px;
  }

  .forecast {
    display: block;
    margin-top: 8px;
    color: var(--success-color, #2d963f);
    font-size: 16px;
    line-height: 1.2;
  }

  .battery-graphic {
    position: relative;
    width: 100%;
    max-width: 220px;
    height: 66px;
    margin-left: auto;
  }

  .battery-shell {
    position: absolute;
    inset: 0 10px 0 0;
    overflow: hidden;
    padding: 7px;
    border: 3px solid var(--primary-text-color, #2f394c);
    border-radius: 11px;
  }

  .battery-fill {
    height: 100%;
    border-radius: 5px;
    background: var(--success-color, #2d963f);
    transition: width 300ms ease;
  }

  .battery-cap {
    position: absolute;
    right: 0;
    top: 22px;
    width: 11px;
    height: 23px;
    border-radius: 0 4px 4px 0;
    background: var(--primary-text-color, #2f394c);
  }

  .charge-line {
    grid-column: 1 / -1;
    justify-content: space-between;
    gap: 18px;
    padding-top: 12px;
    border-top: 1px solid
      color-mix(in srgb, var(--success-color, #2d963f) 18%, transparent);
    color: var(--secondary-text-color, #687286);
    font-size: 16px;
  }

  .charge-line strong {
    color: var(--primary-text-color, #101521);
    font-size: 25px;
    letter-spacing: -0.7px;
    white-space: nowrap;
  }

  .power-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 18px 1px 16px;
    border-bottom: 1px solid var(--divider-color, #e2e5e9);
  }

  .power-stat {
    min-width: 0;
    padding: 0 7px;
    text-align: center;
  }

  .power-stat + .power-stat {
    border-left: 1px solid var(--divider-color, #e2e5e9);
  }

  .power-stat span,
  .power-stat strong,
  .energy-stat span,
  .energy-stat strong {
    display: block;
  }

  .power-stat span {
    font-size: 14px;
    font-weight: 700;
  }

  .power-stat strong {
    margin-top: 5px;
    color: var(--primary-text-color, #101521);
    font-size: 19px;
    letter-spacing: -0.35px;
    white-space: nowrap;
  }

  .solar {
    color: var(--warning-color, #df8700);
  }

  .home {
    color: #6d35c4;
  }

  .battery {
    color: var(--success-color, #2d963f);
  }

  .export {
    color: var(--info-color, #1976d2);
  }

  .chart-section {
    padding: 12px 9px 13px;
  }

  .section-heading {
    justify-content: space-between;
    gap: 16px;
  }

  .section-heading h2 {
    font-size: 14px;
    font-weight: 750;
  }

  .section-heading time,
  .chart-axis,
  .legend {
    color: var(--secondary-text-color, #687286);
  }

  .section-heading time {
    font-size: 13px;
  }

  .chart-wrap {
    height: 126px;
    margin-top: 10px;
  }

  .chart-wrap svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .grid-line {
    stroke: var(--divider-color, #e5e8ed);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  .chart-line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    vector-effect: non-scaling-stroke;
  }

  .chart-line.solar {
    stroke: var(--warning-color, #df8700);
  }

  .end-dot.solar {
    fill: var(--warning-color, #df8700);
  }

  .chart-line.home {
    stroke: #6d35c4;
  }

  .end-dot.home {
    fill: #6d35c4;
  }

  .chart-line.battery {
    stroke: var(--success-color, #2d963f);
  }

  .end-dot.battery {
    fill: var(--success-color, #2d963f);
  }

  .chart-line.battery {
    stroke-dasharray: 7 7;
  }

  .chart-axis {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    font-size: 11px;
  }

  .legend {
    gap: clamp(24px, 10cqw, 64px);
    margin-top: 12px;
    font-size: 12px;
  }

  .legend span {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .legend i {
    width: 19px;
    height: 3px;
    border-radius: 3px;
    background: currentColor;
  }

  .legend .battery i {
    background: repeating-linear-gradient(
      90deg,
      currentColor 0 8px,
      transparent 8px 13px
    );
  }

  .energy-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-top: 1px solid var(--divider-color, #e2e5e9);
    border-bottom: 1px solid var(--divider-color, #e2e5e9);
  }

  .energy-stat {
    display: flex;
    min-height: 65px;
    align-items: center;
    gap: 14px;
    padding: 10px 17px;
  }

  .energy-stat:nth-child(odd) {
    border-right: 1px solid var(--divider-color, #e2e5e9);
  }

  .energy-stat:nth-child(n + 3) {
    border-top: 1px solid var(--divider-color, #e2e5e9);
  }

  .energy-stat i {
    width: 3px;
    height: 43px;
    flex: 0 0 auto;
    border-radius: 3px;
    background: currentColor;
  }

  .energy-stat span {
    color: var(--secondary-text-color, #687286);
    font-size: 12px;
  }

  .energy-stat strong {
    margin-top: 3px;
    color: var(--primary-text-color, #101521);
    font-size: 19px;
    letter-spacing: -0.35px;
  }

  .footer {
    gap: 14px;
    padding-top: 14px;
    color: var(--success-color, #2d963f);
  }

  .footer span:last-child {
    color: var(--secondary-text-color, #687286);
    font-size: 12px;
    line-height: 1.35;
  }

  .history-note {
    margin: 8px 0 -2px;
    color: var(--secondary-text-color, #687286);
    font-size: 11px;
    text-align: right;
  }

  @container (max-width: 430px) {
    ha-card {
      padding: 14px;
    }

    .header {
      gap: 9px;
    }

    .title-group {
      gap: 10px;
    }

    h1 {
      font-size: 19px;
    }

    .subtitle {
      font-size: 12px;
    }

    .status {
      padding: 8px 10px;
      font-size: 12px;
    }

    .battery-hero {
      gap: 13px;
      padding-inline: 15px;
    }

    .percentage {
      font-size: 49px;
    }

    .battery-graphic {
      height: 59px;
    }

    .battery-cap {
      top: 19px;
      height: 22px;
    }

    .power-stat {
      padding-inline: 4px;
    }

    .power-stat span {
      font-size: 12px;
    }

    .power-stat strong {
      font-size: 16px;
    }
  }

  @container (max-width: 335px) {
    .battery-hero {
      grid-template-columns: 1fr;
    }

    .battery-graphic {
      width: 90%;
      max-width: none;
      margin-inline: auto;
    }

    .power-stats {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 14px;
    }

    .power-stat:nth-child(3) {
      border-left: 0;
    }

    .energy-stats {
      grid-template-columns: 1fr;
    }

    .energy-stat:nth-child(odd) {
      border-right: 0;
    }

    .energy-stat + .energy-stat {
      border-top: 1px solid var(--divider-color, #e2e5e9);
    }
  }
`;
