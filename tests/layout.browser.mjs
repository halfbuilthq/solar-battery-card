import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright";

const bundle = await readFile(resolve(process.env.SOLAR_LAYOUT_BUNDLE || "dist/solar-battery-card.js"));
const screenshotDirectory = process.env.SOLAR_LAYOUT_SCREENSHOTS;
const server = createServer((request, response) => {
  response.setHeader("Content-Type", request.url === "/card.js" ? "application/javascript" : "text/html");
  response.end(request.url === "/card.js" ? bundle : `<!doctype html><html><head>
    <style>
      :root { font-family: system-ui, sans-serif; background: #111; --primary-text-color: #eee;
        --secondary-text-color: #aaa; --ha-card-background: #1c1c1c; --divider-color: #343434;
        --success-color: #4caf50; --warning-color: #ffb300; --info-color: #2196f3; }
      body { margin: 16px; } solar-battery-card { display: block; margin: auto; }
    </style><script type="module" src="/card.js"></script></head>
    <body><solar-battery-card></solar-battery-card></body></html>`);
});
await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
let browser;
try {
  browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.clock.setFixedTime(new Date("2026-10-30T20:43:00Z"));
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.waitForFunction(() => customElements.get("solar-battery-card"));

  async function configure({ width = 430, language = "de-DE", units = "W", battery = "discharging", chart = "history", legacy = false, showSolar = true, showBattery = true } = {}) {
    await page.evaluate(async (options) => {
      const card = document.querySelector("solar-battery-card");
      const sensor = (entity_id, state, unit_of_measurement) => ({ entity_id, state: String(state), attributes: { unit_of_measurement } });
      card.style.width = `${options.width}px`;
      card.setConfig({ type: "custom:solar-battery-card", title: "Solar/Speicher/Strom",
        show_solar: options.showSolar, show_battery: options.showBattery,
        battery_soc: options.showBattery ? "sensor.soc" : undefined, solar_power: options.showSolar ? "sensor.solar" : undefined, home_power: "sensor.home",
        battery_power: options.showBattery ? "sensor.battery" : undefined, grid_power: "sensor.grid", solar_energy_today: "sensor.generated",
        home_energy_today: "sensor.consumed", battery_energy_today: "sensor.stored", export_energy_today: "sensor.exported",
        battery_total_capacity: options.legacy ? undefined : 10, battery_capacity: options.legacy ? 10 : undefined,
        battery_lower_soc: options.legacy ? 0 : 35, power_unit: options.units,
        show_power_chart: options.chart !== "hidden", show_forecast_line: options.chart === "forecast",
        solar_forecast_today: "sensor.forecast" });
      card.hass = { locale: { language: options.language }, config: { time_zone: "Europe/Berlin" },
        callApi: async () => [], states: {
          "sensor.soc": sensor("sensor.soc", options.battery === "reserve" ? 35 : 60, "%"),
          "sensor.solar": sensor("sensor.solar", 0, "W"), "sensor.home": sensor("sensor.home", 237, "W"),
          "sensor.battery": sensor("sensor.battery", options.battery === "charging" ? 319 : options.battery === "idle" ? 0 : -319, "W"),
          "sensor.grid": sensor("sensor.grid", 22, "W"), "sensor.generated": sensor("sensor.generated", 8.9, "kWh"),
          "sensor.consumed": sensor("sensor.consumed", 5.6, "kWh"), "sensor.stored": sensor("sensor.stored", 3.9, "kWh"),
          "sensor.exported": sensor("sensor.exported", 3.1, "kWh"), "sensor.forecast": sensor("sensor.forecast", 8.2, "kWh")
        } };
      await card.updateComplete;
    }, { width, language, units, battery, chart, legacy, showSolar, showBattery });
  }

  await configure();
  if (screenshotDirectory) {
    await mkdir(screenshotDirectory, { recursive: true });
    await page.locator("solar-battery-card").screenshot({ path: resolve(screenshotDirectory, "german-430.png") });
  }

  let cases = 0;
  for (const language of ["en-AU", "de-DE"]) {
    for (const units of ["W", "kW"]) {
      for (const width of [280, 320, 360, 390, 430, 506, 768]) {
        await configure({ width, language, units });
        const result = await page.locator("solar-battery-card").evaluate((card) => {
          const root = card.shadowRoot;
          const box = root.querySelector("ha-card").getBoundingClientRect();
          const tiles = [...root.querySelectorAll(".power-stat")].map((tile) => {
            const label = tile.querySelector("span").getBoundingClientRect();
            const value = tile.querySelector("strong").getBoundingClientRect();
            return { label: tile.querySelector("span").textContent, stacked: value.top >= label.bottom - 1 };
          });
          const overflow = [...root.querySelectorAll(".header,.status,.battery-hero,.battery-graphic,.charge-line,.power-stat,.power-stat strong,.forecast")]
            .filter((element) => { const rect = element.getBoundingClientRect(); return rect.left < box.left - 1 || rect.right > box.right + 1; })
            .map((element) => element.className);
          return { tiles, overflow, forecast: root.querySelector(".forecast").textContent.trim(), title: root.querySelector(".forecast").title };
        });
        assert(result.tiles.every((tile) => tile.stacked), `Values beside labels at ${width}px ${language} ${units}: ${JSON.stringify(result.tiles)}`);
        assert.deepEqual(result.overflow, [], `Overflow at ${width}px ${language} ${units}`);
        assert(result.forecast.startsWith(language === "de-DE" ? "Reserve um" : "Reserve by"), "Use the compact reserve wording");
        assert(!result.forecast.includes("2026"), "Same-year estimate should omit the year visually");
        assert(result.title.includes("2026"), "Tooltip should preserve the full date");
        cases++;
      }
    }
  }

  for (const battery of ["charging", "discharging", "reserve", "idle"]) {
    for (const chart of ["history", "forecast", "hidden"]) {
      await configure({ battery, chart, width: 390 });
      const forecast = page.locator("solar-battery-card .forecast");
      assert((await forecast.textContent()).trim().length > 0);
      assert.equal(await page.locator("solar-battery-card .power-stat").count(), 4);
    }
  }
  let visibilityCases = 0;
  for (const showSolar of [true, false]) {
    for (const showBattery of [true, false]) {
      for (const chart of ["history", "forecast", "hidden"]) {
        for (const language of ["en-AU", "de-DE"]) {
          for (const width of [280, 390, 768]) {
            await configure({ showSolar, showBattery, chart, language, width });
            const card = page.locator("solar-battery-card");
            assert.equal(await card.locator(".battery-hero").count(), Number(showBattery));
            assert.equal(await card.locator(".status").count(), Number(showBattery));
            assert.equal(await card.locator(".power-stat").count(), 2 + Number(showSolar) + Number(showBattery));
            assert.equal(await card.locator(".energy-stat").count(), 2 + Number(showSolar) + Number(showBattery));
            assert.equal(await card.locator(".power-stat.solar,.energy-stat.solar").count(), showSolar ? 2 : 0);
            assert.equal(await card.locator(".power-stat.battery,.energy-stat.battery").count(), showBattery ? 2 : 0);
            assert.equal(await card.locator("solar-forecast-chart").count(), Number(showSolar && chart === "forecast"));
            if (chart !== "hidden") {
              const forecast = showSolar && chart === "forecast";
              const plot = card.locator(forecast ? "solar-forecast-chart .plot" : ".chart-wrap");
              await plot.focus(); await page.keyboard.press("Home");
              const chartRoot = forecast ? card.locator("solar-forecast-chart") : card.locator(".chart-section");
              assert.equal(await chartRoot.locator(forecast ? ".line.solar" : ".chart-line.solar").count(), Number(showSolar));
              assert.equal(await chartRoot.locator(forecast ? ".line.battery" : ".chart-line.battery").count(), Number(showBattery));
              assert.equal(await chartRoot.locator(".legend .solar").count(), Number(showSolar));
              assert.equal(await chartRoot.locator(".legend .battery").count(), Number(showBattery));
              const inspection = await chartRoot.locator(forecast ? ".inspection" : ".chart-tooltip").textContent();
              if (!showSolar) assert(!inspection.includes("Solar"));
              if (!showBattery) assert(!/Battery|Batterie/.test(inspection));
            }
            const overflow = await card.evaluate(card => {
              const root = card.shadowRoot; const box = root.querySelector("ha-card").getBoundingClientRect();
              return [...root.querySelectorAll(".header,.power-stat,.energy-stat,.chart-section,.footer")]
                .filter(el => { const rect = el.getBoundingClientRect(); return rect.left < box.left - 1 || rect.right > box.right + 1; })
                .map(el => el.className);
            });
            assert.deepEqual(overflow, [], `Visibility overflow ${showSolar}/${showBattery}/${width}/${language}/${chart}`);
            if (screenshotDirectory && width === 390 && language === "en-AU" && chart === "history") {
              await card.screenshot({ path: resolve(screenshotDirectory, `visibility-solar-${showSolar}-battery-${showBattery}.png`) });
            }
            visibilityCases++;
          }
        }
      }
    }
  }

  await configure({ legacy: true, battery: "charging", language: "en-AU" });
  assert.match(await page.locator("solar-battery-card .forecast").textContent(), /Full by/);
  await page.clock.setFixedTime(new Date("2026-12-31T20:43:00Z"));
  await configure();
  assert.match(await page.locator("solar-battery-card .forecast").textContent(), /2027/);

  if (screenshotDirectory) {
    await page.clock.setFixedTime(new Date("2026-10-30T20:43:00Z"));
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.evaluate(() => document.body.innerHTML = "<main style='display:flex;align-items:flex-start;justify-content:center;gap:24px'><solar-battery-card></solar-battery-card><div id='second'></div></main>");
    await configure();
    await page.evaluate(async () => {
      const first = document.querySelector("solar-battery-card");
      const second = document.createElement("solar-battery-card");
      second.style.width = "506px";
      second.setConfig({ type: "custom:solar-battery-card", title: "Solar & storage", battery_soc: "sensor.soc", solar_power: "sensor.solar", home_power: "sensor.home", battery_power: "sensor.battery", grid_power: "sensor.grid", battery_total_capacity: 10, battery_lower_soc: 35 });
      second.hass = { ...first.hass, locale: { language: "en-AU" } };
      document.querySelector("#second").append(second); await second.updateComplete;
    });
    await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
    await page.screenshot({ path: resolve(screenshotDirectory, "layout-1280x800.png") });

  }
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log(`Passed ${visibilityCases} visibility/width/locale/chart combinations and ${cases} width/locale/unit combinations, four battery states, both charts, hidden chart, legacy estimate, year boundary and full-date tooltips.`);
} finally {
  await browser?.close();
  await new Promise((done) => server.close(done));
}
