const EN = {
  "editor.section.solar_forecast": "Solar forecast",
  "editor.section.hourly_forecast": "Hourly input mapping",
  "forecast.mode.daily": "Daily total",
  "forecast.mode.hourly": "Hourly / interval data",
  "forecast.heading": "Power & forecast · today",
  "forecast.inspect": "Inspect power and forecast. Use left/right arrows, Home, End or Escape.",
  "forecast.aria": "Today’s solar, home and battery power on the left axis, forecast energy on the right axis",
  "forecast.expected": "Forecast curve",
  "forecast.target": "Daily target",
  "forecast.history_failed": "Power history unavailable. Only current readings are shown.",
  "forecast.missing": "Forecast unavailable. Select a forecast sensor and check its data.",
  "forecast.invalid": "Invalid hourly forecast. Check timestamps, values, units and overlapping intervals.",
  "forecast.incomplete": "Hourly forecast is incomplete for today. Include every interval, with zeros overnight, or select a daily total.",
  "editor.error.forecast_mode": "Forecast format must be daily or hourly.",
  "editor.error.boolean": "{field} must be true or false.",
  "editor.error.forecast_path": "{field} must be a field name or a dotted path.",
  "editor.error.forecast_interval": "Forecast interval must be a whole number of minutes from 1 to 1440.",
  "editor.field.show_forecast_line": "Show forecast line on power chart",
  "editor.field.solar_forecast_mode": "Forecast data format",
  "editor.field.solar_forecast_attribute": "Forecast array attribute",
  "editor.field.solar_forecast_time_field": "Timestamp field",
  "editor.field.solar_forecast_value_field": "Value field",
  "editor.field.solar_forecast_input_unit": "Hourly input unit",
  "editor.field.solar_forecast_interval_minutes": "Interval length",
  "editor.field.solar_forecast_time_is_end": "Timestamps mark interval ends",
  "editor.helper.show_forecast_line": "Adds a blue energy forecast to the power chart and shows today, including future hours. Power uses the left axis; forecast energy uses the right axis.",
  "editor.helper.solar_forecast_mode": "Daily uses the sensor total as a target. Hourly accumulates interval forecasts into a curve.",
  "editor.helper.solar_forecast_attribute": "Hourly only. Attribute containing an array of interval records; dotted paths are supported. Default: forecast.",
  "editor.helper.solar_forecast_time_field": "Hourly only. ISO timestamp with Z or a UTC offset. Default: start. Dotted paths are supported.",
  "editor.helper.solar_forecast_value_field": "Hourly only. Energy per interval or average power, not a running total. Default: energy.",
  "editor.helper.solar_forecast_input_unit": "Energy is per interval; W/kW means average power over the interval. Independent of display units.",
  "editor.helper.solar_forecast_interval_minutes": "Hourly only. Default 60; use 30 for half-hourly data. Supply the full day, including zero-generation intervals.",
  "editor.helper.solar_forecast_time_is_end": "Hourly only. Off means timestamps mark interval starts.",

  "card.default_title": "Solar & storage",
  "card.subtitle": "Battery outlook",
  "card.today": "Today",

  "status.charging": "Charging",
  "status.discharging": "Discharging",
  "status.idle": "Idle",

  "battery.aria_status": "Battery status",
  "battery.full_by": "Full by {time}",
  "battery.reserve_by": "Reserve reached by {time}",
  "battery.at_reserve": "At/below reserve",
  "editor.field.battery_total_capacity": "Total battery capacity",
  "editor.field.battery_lower_soc": "Lower SOC limit",
  "editor.helper.battery_total_capacity": "Optional kWh for the sensor’s full 0–100% SOC range. Overrides usable battery capacity. Requires absolute SOC, not reserve-rescaled SOC.",
  "editor.helper.battery_lower_soc": "Discharge reserve in percent (default 0). A nonzero reserve requires total battery capacity. Does not reduce charging headroom.",
  "editor.error.total_capacity": "Total battery capacity must be a finite number greater than zero.",
  "editor.error.lower_soc": "Lower SOC limit must be a finite percentage from 0 to below 100.",
  "editor.error.reserve_requires_capacity": "Set total battery capacity before using a nonzero lower SOC limit.",
  "battery.charging_now": "Charging now",
  "battery.aria_graphic": "Battery {percent} percent charged",
  "battery.charging": "Charging battery",
  "battery.supplying": "Supplying home",
  "battery.idle": "Battery idle",

  "power.aria": "Current power",
  "power.solar": "Solar",
  "power.home": "Home",
  "power.battery": "Battery",
  "power.export": "Export",

  "chart.heading": "Power \u00b7 24 hours",
  "chart.aria": "Inspect solar, home and battery power history",
  "chart.svg_aria": "Solar, home and battery power for the past 24 hours",
  "chart.axis_start": "24h ago",
  "chart.axis_now": "Now",
  "chart.legend_aria": "Chart legend",
  "chart.history_unavailable": "Live history unavailable \u00b7 showing current profile",

  "energy.aria": "Energy today",
  "energy.generated": "Generated",
  "energy.forecast_today": "Forecast today",
  "editor.field.solar_forecast_today": "Solar forecast today",
  "editor.helper.solar_forecast_today": "Daily: full-day energy sensor in Wh/kWh/MWh, not remaining today. Hourly: sensor containing the configured interval array.",
  "editor.error.forecast_entity": "Solar forecast today must be a sensor entity ID.",
  "energy.consumed": "Consumed",
  "energy.stored": "Stored",
  "energy.exported": "Exported",

  "footer.solar_home_battery_export": "Solar covering home, charging battery and exporting",
  "footer.solar_home_battery": "Solar covering home and charging the battery",
  "footer.solar_home": "Solar covering the current home load",
  "footer.drawing": "Home load is drawing from battery or grid",

  "editor.section.live_power": "Live power",
  "editor.section.daily_energy": "Daily energy",
  "editor.section.behaviour": "Behaviour",
  "editor.field.title": "Title",
  "editor.field.power_unit": "Power display unit",
  "editor.field.energy_unit": "Energy display unit",
  "editor.error.unit": "{field} must use one of the listed units.",
  "editor.field.battery_soc": "Battery state of charge",
  "editor.field.solar_power": "Solar power",
  "editor.field.home_power": "Home power",
  "editor.field.battery_power": "Battery power",
  "editor.field.grid_power": "Grid power",
  "editor.field.solar_energy_today": "Solar energy today",
  "editor.field.home_energy_today": "Home energy today",
  "editor.field.battery_energy_today": "Battery energy stored today",
  "editor.field.export_energy_today": "Grid energy exported today",
  "editor.field.battery_capacity": "Usable battery capacity",
  "editor.field.battery_positive_is_charging": "Positive battery power means charging",
  "editor.field.grid_positive_is_export": "Positive grid power means export",
  "editor.field.show_power_chart": "Show 24-hour power chart",
  "editor.helper.battery_capacity":
    "Optional legacy capacity in kWh. Used to estimate full time only when total battery capacity is not set.",
  "editor.helper.battery_positive_is_charging":
    "Turn this off if your integration reports charging as a negative value.",
  "editor.helper.grid_positive_is_export":
    "Turn this off if your integration reports grid export as a negative value.",
  "editor.error.required": "{field} is required."
} as const;

export type TranslationKey = keyof typeof EN;

const DE: Record<TranslationKey, string> = {
  "editor.section.solar_forecast": "Solarprognose",
  "editor.section.hourly_forecast": "Zuordnung der Intervalldaten",
  "forecast.mode.daily": "Tagessumme",
  "forecast.mode.hourly": "Stündliche / Intervalldaten",
  "forecast.heading": "Leistung & Prognose · heute",
  "forecast.inspect": "Leistung und Prognose untersuchen. Pfeiltasten, Pos1, Ende oder Escape verwenden.",
  "forecast.aria": "Heutige Solar-, Haus- und Batterieleistung links, Prognoseenergie rechts",
  "forecast.expected": "Prognosekurve",
  "forecast.target": "Tagesziel",
  "forecast.history_failed": "Leistungsverlauf nicht verfügbar. Nur aktuelle Werte werden angezeigt.",
  "forecast.missing": "Prognose nicht verfügbar. Prognosesensor auswählen und Daten prüfen.",
  "forecast.invalid": "Ungültige Intervallprognose. Zeitstempel, Werte, Einheiten und überlappende Intervalle prüfen.",
  "forecast.incomplete": "Die Intervallprognose für heute ist unvollständig. Alle Intervalle mit nächtlichen Nullwerten liefern oder eine Tagessumme wählen.",
  "editor.error.forecast_mode": "Das Prognoseformat muss daily oder hourly sein.",
  "editor.error.boolean": "{field} muss true oder false sein.",
  "editor.error.forecast_path": "{field} muss ein Feldname oder ein Pfad mit Punkten sein.",
  "editor.error.forecast_interval": "Das Prognoseintervall muss eine ganze Minutenzahl von 1 bis 1440 sein.",
  "editor.field.show_forecast_line": "Prognoselinie im Leistungsdiagramm anzeigen",
  "editor.field.solar_forecast_mode": "Format der Prognosedaten",
  "editor.field.solar_forecast_attribute": "Attribut mit Prognoseliste",
  "editor.field.solar_forecast_time_field": "Zeitstempelfeld",
  "editor.field.solar_forecast_value_field": "Wertefeld",
  "editor.field.solar_forecast_input_unit": "Einheit der Intervallwerte",
  "editor.field.solar_forecast_interval_minutes": "Intervalllänge",
  "editor.field.solar_forecast_time_is_end": "Zeitstempel markieren das Intervallende",
  "editor.helper.show_forecast_line": "Ergänzt eine blaue Energieprognose im Leistungsdiagramm für den heutigen Tag, einschließlich zukünftiger Stunden. Leistung links, Prognoseenergie rechts.",
  "editor.helper.solar_forecast_mode": "Täglich nutzt den Sensorwert als Tagesziel. Stündlich summiert Intervallprognosen zu einer Kurve.",
  "editor.helper.solar_forecast_attribute": "Nur stündlich. Attribut mit einer Liste von Intervallen; Pfade mit Punkten sind möglich. Standard: forecast.",
  "editor.helper.solar_forecast_time_field": "Nur stündlich. ISO-Zeitstempel mit Z oder UTC-Versatz. Standard: start. Pfade mit Punkten sind möglich.",
  "editor.helper.solar_forecast_value_field": "Nur stündlich. Energie pro Intervall oder mittlere Leistung, keine laufende Summe. Standard: energy.",
  "editor.helper.solar_forecast_input_unit": "Energie gilt pro Intervall; W/kW bedeutet mittlere Leistung im Intervall. Unabhängig von der Anzeigeeinheit.",
  "editor.helper.solar_forecast_interval_minutes": "Nur stündlich. Standard 60; für halbstündliche Daten 30 wählen. Den ganzen Tag einschließlich Null-Intervallen liefern.",
  "editor.helper.solar_forecast_time_is_end": "Nur stündlich. Aus bedeutet: Zeitstempel markieren den Intervallbeginn.",

  "card.default_title": "Solar & Speicher",
  "card.subtitle": "Batterie-Prognose",
  "card.today": "Heute",

  "status.charging": "L\u00e4dt",
  "status.discharging": "Entl\u00e4dt",
  "status.idle": "Bereit",

  "battery.aria_status": "Batteriestatus",
  "battery.full_by": "Voll um {time}",
  "battery.reserve_by": "Reserve erreicht um {time}",
  "battery.at_reserve": "Reserve erreicht/unterschritten",
  "editor.field.battery_total_capacity": "Gesamte Batteriekapazität",
  "editor.field.battery_lower_soc": "Untere SOC-Grenze",
  "editor.helper.battery_total_capacity": "Optionale kWh für den gesamten SOC-Bereich von 0–100 %. Hat Vorrang vor der nutzbaren Kapazität. Benötigt absoluten, nicht auf die Reserve umgerechneten SOC.",
  "editor.helper.battery_lower_soc": "Entladereserve in Prozent (Standard 0). Eine Reserve größer als null benötigt die Gesamtkapazität. Verringert nicht die zum Vollladen benötigte Energie.",
  "editor.error.total_capacity": "Die Gesamtkapazität muss eine endliche Zahl größer als null sein.",
  "editor.error.lower_soc": "Die untere SOC-Grenze muss ein endlicher Prozentwert von 0 bis unter 100 sein.",
  "editor.error.reserve_requires_capacity": "Für eine untere SOC-Grenze größer als null zuerst die Gesamtkapazität angeben.",
  "battery.charging_now": "L\u00e4dt gerade",
  "battery.aria_graphic": "Batterie zu {percent} Prozent geladen",
  "battery.charging": "Batterie wird geladen",
  "battery.supplying": "Versorgt das Haus",
  "battery.idle": "Batterie im Leerlauf",

  "power.aria": "Aktuelle Leistung",
  "power.solar": "Solar",
  "power.home": "Haus",
  "power.battery": "Batterie",
  "power.export": "Einspeisung",

  "chart.heading": "Leistung \u00b7 24 Stunden",
  "chart.aria": "Verlauf von Solar-, Haus- und Batterieleistung untersuchen",
  "chart.svg_aria": "Solar-, Haus- und Batterieleistung der letzten 24 Stunden",
  "chart.axis_start": "vor 24 h",
  "chart.axis_now": "Jetzt",
  "chart.legend_aria": "Diagrammlegende",
  "chart.history_unavailable":
    "Verlauf nicht verf\u00fcgbar \u00b7 aktuelles Profil wird gezeigt",

  "energy.aria": "Energie heute",
  "energy.generated": "Erzeugt",
  "energy.forecast_today": "Prognose heute",
  "editor.field.solar_forecast_today": "Solarprognose heute",
  "editor.helper.solar_forecast_today": "Täglich: Energie für den ganzen Tag in Wh/kWh/MWh, nicht verbleibende Energie. Stündlich: Sensor mit der konfigurierten Intervallliste.",
  "editor.error.forecast_entity": "Solarprognose heute muss die Entitäts-ID eines Sensors sein.",
  "energy.consumed": "Verbraucht",
  "energy.stored": "Gespeichert",
  "energy.exported": "Eingespeist",

  "footer.solar_home_battery_export":
    "Solar deckt das Haus, l\u00e4dt die Batterie und speist ein",
  "footer.solar_home_battery": "Solar deckt das Haus und l\u00e4dt die Batterie",
  "footer.solar_home": "Solar deckt den aktuellen Hausverbrauch",
  "footer.drawing": "Hausverbrauch wird aus Batterie oder Netz gedeckt",

  "editor.section.live_power": "Aktuelle Leistung",
  "editor.section.daily_energy": "Tagesenergie",
  "editor.section.behaviour": "Verhalten",
  "editor.field.title": "Titel",
  "editor.field.power_unit": "Anzeigeeinheit für Leistung",
  "editor.field.energy_unit": "Anzeigeeinheit für Energie",
  "editor.error.unit": "{field} muss eine der aufgeführten Einheiten verwenden.",
  "editor.field.battery_soc": "Batterieladestand",
  "editor.field.solar_power": "Solarleistung",
  "editor.field.home_power": "Hausverbrauch",
  "editor.field.battery_power": "Batterieleistung",
  "editor.field.grid_power": "Netzleistung",
  "editor.field.solar_energy_today": "Solarenergie heute",
  "editor.field.home_energy_today": "Hausverbrauch heute",
  "editor.field.battery_energy_today": "Heute in die Batterie geladen",
  "editor.field.export_energy_today": "Heute ins Netz eingespeist",
  "editor.field.battery_capacity": "Nutzbare Batteriekapazit\u00e4t",
  "editor.field.battery_positive_is_charging":
    "Positive Batterieleistung bedeutet Laden",
  "editor.field.grid_positive_is_export": "Positive Netzleistung bedeutet Einspeisung",
  "editor.field.show_power_chart": "24-Stunden-Diagramm anzeigen",
  "editor.helper.battery_capacity":
    "Optionale bisherige Kapazität in kWh. Wird nur ohne Gesamtkapazität zur Ladezeitschätzung verwendet.",
  "editor.helper.battery_positive_is_charging":
    "Deaktivieren, wenn deine Integration das Laden als negativen Wert meldet.",
  "editor.helper.grid_positive_is_export":
    "Deaktivieren, wenn deine Integration die Einspeisung als negativen Wert meldet.",
  "editor.error.required": "{field} ist erforderlich."
};

export const TRANSLATIONS: Record<string, Partial<Record<TranslationKey, string>>> = {
  en: EN,
  de: DE
};

export function baseLanguage(locale: string | undefined): string {
  if (!locale) return "en";
  const [language] = locale.toLowerCase().split(/[-_]/);
  return language || "en";
}

export function localize(
  key: TranslationKey,
  locale?: string,
  placeholders?: Record<string, string | number>
): string {
  const language = baseLanguage(locale);
  const template = TRANSLATIONS[language]?.[key] ?? EN[key];

  if (!placeholders) return template;

  return Object.entries(placeholders).reduce(
    (text, [name, value]) => text.split(`{${name}}`).join(String(value)),
    template
  );
}
