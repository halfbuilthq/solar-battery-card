# Changelog

All notable changes to this project are documented here. The project follows
Semantic Versioning.

## [Unreleased]

## [0.4.0] - 2026-11-10

### Added

- Independent **Show solar** and **Show battery** switches in the visual editor,
  with matching `show_solar` and `show_battery` YAML options.
- Support for battery-only, solar-only and home/grid configurations. Hidden
  components no longer require sensors or appear in live readings, daily totals,
  chart lines, legends or chart inspection values.
- Layouts, default titles and header icons adapt to the visible components.
  Hiding the battery also removes its graphic, charging status and estimates.
- English and German labels, help text and configuration examples.

### Behaviour

- Both switches default to **on**. Existing cards need no configuration changes.
- Hiding solar also hides its forecasts and returns the chart to the usual
  24-hour power view. Hidden sensors are excluded from history requests.
- Saved sensor selections and options are retained when hidden and restored when
  enabled again. Custom card titles remain unchanged.

### Getting started

Open the card's visual editor and turn off **Show solar** or **Show battery**.
For YAML configuration, add `show_solar: false` for a battery-only system or
`show_battery: false` for a system without a battery. Home and grid power sensors
remain required; both sections can be hidden for a home/grid overview.

### Tests

- 187 unit tests, TypeScript checks and the production build pass.
- Browser regression checks cover 72 visibility/width/language/chart combinations
  alongside 28 existing width/language/unit combinations and battery/date cases.

### Thanks

- Thanks to [@MattCheetham](https://github.com/MattCheetham) for requesting support
  for systems without solar in [#13](https://github.com/halfbuilthq/solar-battery-card/issues/13).

## [0.3.2] - 2026-11-01

### Fixed

- Stack live power readings below their labels at every card width, including
  short Solar/Home labels and W units. Keep long titles and charge lines inside
  narrow cards and apply compact card padding based on the card's own width.
- Shorten battery reserve estimates to “Reserve by” / “Reserve um” and use compact
  dates below SOC. Keep the year when crossing into another year and retain the
  full wording/date in the caption tooltip.

### Tests

- Add a browser regression check against the release bundle for 28 combinations
  of width, language and power units, plus battery states, chart modes and dates.

### Thanks

- Thanks to [@smokermarine](https://github.com/smokermarine) for the report and
  screenshot in [#12](https://github.com/halfbuilthq/solar-battery-card/issues/12).

## [0.3.1] - 2026-10-12

### Fixed

- The live grid tile now switches between Import and Export (Netzbezug and
  Einspeisung in German) and shows a non-negative power value for either direction.
  Both grid sensor sign conventions are supported with the existing
  `grid_positive_is_export` setting.
- Zero grid power now shows a neutral Grid / Netz label. Missing or unavailable
  grid readings show an em dash instead of appearing as zero export.

Daily exported energy remains the cumulative total, independent of the current
grid-flow direction. No configuration changes are required for correctly
configured sensors.

### Thanks

- Thanks to [@whyisthisbroken](https://github.com/whyisthisbroken) for the detailed
  report, sensor readings, and reproduction steps in
  [#11](https://github.com/halfbuilthq/solar-battery-card/issues/11).

## [0.3.0] - 2026-10-11

### Added

- Opt-in blue forecast line in the existing power chart, with daily targets or mapped hourly/half-hourly cumulative forecasts, separate power/energy axes, and Home Assistant-local day boundaries.

- Opt-in total battery capacity and lower SOC reserve, with time-to-full and time-to-reserve estimates and dates across midnight. Legacy capacity behavior remains supported.

- Optional full-day solar forecast below generated energy, using the selected energy unit.

- Configurable W/kW power and Wh/kWh energy display units, preserving existing defaults.

## [0.2.0] - 2026-09-05

### Added

- Added English and German localization for the card and visual editor, with
  regional German locale support and English fallback for unknown languages.
- Localized visible card copy and accessibility labels, including the chart SVG.

### Changed

- Made the visual editor read its locale directly from the Home Assistant
  instance supplied to the editor instead of relying on shared or browser state.
- Localized the default title at render time while preserving all explicit user
  titles unchanged.

## [0.1.6] - 2026-09-02

### Changed

- Clear chart inspection when a touch gesture is cancelled by scrolling.
- Confirmed Home Assistant's current card background variable with the legacy
  card background fallback throughout the card and chart tooltip.

## [0.1.5] - 2026-08-10

- Added keyboard, mouse, and touch inspection to the 24-hour power chart.
- Added Home Assistant theme-aware chart and tooltip surfaces.
