import { Metric } from "@/lib/types";
import { test, expect } from "@playwright/test";

test("Web Vitals metrics for landing page on path: `/`", async ({ page }) => {
  const metrics: Metric[] = [];

  page.on("console", (msg) => {
    const text = msg.text();
    try {
      const parsed = JSON.parse(text);
      if (
        parsed.name &&
        ["LCP", "CLS", "INP", "FCP", "TTFB", "FID"].includes(parsed.name)
      ) {
        metrics.push(parsed);
      }
    } catch {}
  });

  await page.goto("http://localhost:3000/");
  await page.locator("body").click();
  await new Promise((r) => setTimeout(r, 5000));

  metrics.forEach((metric) => {
    expect(metric?.rating).toBe("good");
  });
});
test("Web Vitals metrics for convert page on path: `/gen`", async ({
  page,
}) => {
  const metrics: Metric[] = [];

  page.on("console", (msg) => {
    const text = msg.text();
    try {
      const parsed = JSON.parse(text);
      if (
        parsed.name &&
        ["LCP", "CLS", "INP", "FCP", "TTFB", "FID"].includes(parsed.name)
      ) {
        metrics.push(parsed);
      }
    } catch {}
  });

  await page.goto("http://localhost:3000/gen");
  await page.locator("body").click();
  await new Promise((r) => setTimeout(r, 5000));

  metrics.forEach((metric) => {
    expect(metric?.rating).toBe("good");
  });
});
test("Web Vitals metrics for ui page on path: `/gen/ui`", async ({ page }) => {
  const metrics: Metric[] = [];

  page.on("console", (msg) => {
    const text = msg.text();
    try {
      const parsed = JSON.parse(text);
      if (
        parsed.name &&
        ["LCP", "CLS", "INP", "FCP", "TTFB", "FID"].includes(parsed.name)
      ) {
        metrics.push(parsed);
      }
    } catch {}
  });

  await page.goto("http://localhost:3000/gen/ui");
  await page.locator("body").click();
  await new Promise((r) => setTimeout(r, 5000));

  metrics.forEach((metric) => {
    expect(metric?.rating).toBe("good");
  });
});
