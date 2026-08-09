import { describe, expect, it } from "vitest";
import { cardStyles } from "../src/styles";

describe("theme background fallbacks", () => {
  it("falls back to Home Assistant's current card background variable", () => {
    expect(cardStyles.cssText).toContain(
      "var(--ha-card-background, var(--card-background-color, #fff))"
    );
    expect(cardStyles.cssText).not.toContain("var(--ha-card-background, #fff)");
  });
});
