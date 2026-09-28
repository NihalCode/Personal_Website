import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const viewports = [
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 360, height: 800 },
];

test("heading, contact, and claims are present", async ({ page }) => {
  await page.goto("/");
  const heading = page.getByRole("heading", { level: 1, name: "Nihal Samavedam" });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveCSS("opacity", "1");
  await expect(page.getByRole("radio", { name: /Scene/ })).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(1);
  const text = await page.locator("body").innerText();
  expect(text.indexOf("samavedam2@wisc.edu")).toBeLessThan(text.indexOf("nihalsamavedam0902@gmail.com"));
  expect(text).toContain("$40,000");
  expect(text).not.toMatch(/331|9311656141|53715/);
  const cursor = await page.evaluate(() => getComputedStyle(document.documentElement).cursor);
  expect(cursor).not.toBe("none");
});

test("keyboard changes the room state", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /Scene/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: /Structure/ })).toHaveAttribute("aria-checked", "true");
  await page.keyboard.press("3");
  await expect(page.getByRole("radio", { name: /Description/ })).toHaveAttribute("aria-checked", "true");
});

test("support example is keyboard operable", async ({ page }) => {
  await page.goto("/");
  const alert = page.getByRole("radio", { name: /Alert/ });
  await alert.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: /Reading/ })).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("This sample is not a live ticket")).toBeVisible();
});

test("axe finds no serious or critical violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
  expect(serious).toEqual([]);
});

test("viewports keep the name and controls", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("radio", { name: /Scene/ })).toBeVisible();
    await page.screenshot({
      path: `docs/qa/${viewport.width}x${viewport.height}.png`,
      fullPage: false,
    });
  }
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("state changes stay immediate and the heading stays visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("radio", { name: /Description/ }).click();
    await expect(page.getByRole("radio", { name: /Description/ })).toHaveAttribute("aria-checked", "true");
    await expect(page.getByRole("heading", { name: "Description" })).toBeVisible();
  });
});
