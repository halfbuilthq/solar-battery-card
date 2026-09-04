const EN = {
  "card.default_title": "Solar & storage",
  "card.subtitle": "Battery outlook",
  "card.today": "Today",

  "status.charging": "Charging",
  "status.discharging": "Discharging",
  "status.idle": "Idle",

  "battery.aria_status": "Battery status",
  "battery.full_by": "Full by {time}",
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
  "chart.axis_start": "24h ago",
  "chart.axis_now": "Now",
  "chart.legend_aria": "Chart legend",
  "chart.history_unavailable": "Live history unavailable \u00b7 showing current profile",

  "energy.aria": "Energy today",
  "energy.generated": "Generated",
  "energy.consumed": "Consumed",
  "energy.stored": "Stored",
  "energy.exported": "Exported",

  "footer.solar_home_battery_export": "Solar covering home, charging battery and exporting",
  "footer.solar_home_battery": "Solar covering home and charging the battery",
  "footer.solar_home": "Solar covering the current home load",
  "footer.drawing": "Home load is drawing from battery or grid",

  "picker.description": "A battery-first solar, power and daily energy overview.",

  "editor.section.live_power": "Live power",
  "editor.section.daily_energy": "Daily energy",
  "editor.section.behaviour": "Behaviour",
  "editor.field.title": "Title",
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
    "Optional. Used to estimate when the battery will be full.",
  "editor.helper.battery_positive_is_charging":
    "Turn this off if your integration reports charging as a negative value.",
  "editor.helper.grid_positive_is_export":
    "Turn this off if your integration reports grid export as a negative value.",
  "editor.error.required": "{field} is required."
} as const;

export type TranslationKey = keyof typeof EN;

const DE: Record<TranslationKey, string> = {
  "card.default_title": "Solar & Speicher",
  "card.subtitle": "Batterie-Prognose",
  "card.today": "Heute",

  "status.charging": "L\u00e4dt",
  "status.discharging": "Entl\u00e4dt",
  "status.idle": "Bereit",

  "battery.aria_status": "Batteriestatus",
  "battery.full_by": "Voll um {time}",
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
  "chart.axis_start": "vor 24 h",
  "chart.axis_now": "Jetzt",
  "chart.legend_aria": "Diagrammlegende",
  "chart.history_unavailable":
    "Verlauf nicht verf\u00fcgbar \u00b7 aktuelles Profil wird gezeigt",

  "energy.aria": "Energie heute",
  "energy.generated": "Erzeugt",
  "energy.consumed": "Verbraucht",
  "energy.stored": "Gespeichert",
  "energy.exported": "Eingespeist",

  "footer.solar_home_battery_export":
    "Solar deckt das Haus, l\u00e4dt die Batterie und speist ein",
  "footer.solar_home_battery": "Solar deckt das Haus und l\u00e4dt die Batterie",
  "footer.solar_home": "Solar deckt den aktuellen Hausverbrauch",
  "footer.drawing": "Hausverbrauch wird aus Batterie oder Netz gedeckt",

  "picker.description":
    "Solar-, Leistungs- und Tagesenergie\u00fcbersicht mit Fokus auf den Speicher.",

  "editor.section.live_power": "Aktuelle Leistung",
  "editor.section.daily_energy": "Tagesenergie",
  "editor.section.behaviour": "Verhalten",
  "editor.field.title": "Titel",
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
    "Optional. Dient der Sch\u00e4tzung, wann die Batterie voll ist.",
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

// The card knows the Home Assistant locale from `hass`, but `getConfigForm()` is
// static and never sees it. The card records the locale here so the editor can
// reuse it; the browser language is the fallback before the first render.
let activeLocale: string | undefined;

export function setActiveLocale(locale: string | undefined): void {
  if (locale) activeLocale = locale;
}

function browserLocale(): string | undefined {
  return typeof navigator === "undefined" ? undefined : navigator.language;
}

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
  const language = baseLanguage(locale ?? activeLocale ?? browserLocale());
  const template = TRANSLATIONS[language]?.[key] ?? EN[key];

  if (!placeholders) return template;

  return Object.entries(placeholders).reduce(
    (text, [name, value]) => text.split(`{${name}}`).join(String(value)),
    template
  );
}
