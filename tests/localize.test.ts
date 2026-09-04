import { describe, expect, it } from "vitest";
import { TRANSLATIONS, baseLanguage, localize } from "../src/localize";

describe("localization", () => {
  it("falls back to English for unknown languages", () => {
    expect(localize("power.home", "fr")).toBe("Home");
    expect(localize("power.home", undefined)).toBe("Home");
  });

  it("translates known languages", () => {
    expect(localize("power.home", "de")).toBe("Haus");
    expect(localize("energy.generated", "de")).toBe("Erzeugt");
  });

  it("matches on the base language of a regional locale", () => {
    expect(baseLanguage("de-AT")).toBe("de");
    expect(baseLanguage("de_CH")).toBe("de");
    expect(baseLanguage(undefined)).toBe("en");
    expect(localize("power.home", "de-AT")).toBe("Haus");
  });

  it("substitutes placeholders", () => {
    expect(localize("battery.full_by", "en", { time: "14:30" })).toBe("Full by 14:30");
    expect(localize("battery.full_by", "de", { time: "14:30" })).toBe("Voll um 14:30");
    expect(localize("battery.aria_graphic", "en", { percent: 82 })).toBe(
      "Battery 82 percent charged"
    );
  });

  it("keeps every language complete", () => {
    const englishKeys = Object.keys(TRANSLATIONS.en);
    for (const [language, table] of Object.entries(TRANSLATIONS)) {
      expect(Object.keys(table).sort(), `${language} key set`).toEqual(englishKeys.sort());
    }
  });
});
