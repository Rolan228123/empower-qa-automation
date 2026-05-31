import { test, expect } from "../../utilities/UITestUtils";

test.describe("EPIC-02 | Navigation | Page Routing @navigation @regression", () => {

  test("TC-13 | /tools page loads successfully", async ({ page }) => {
    await page.goto(process.env.QA_URL + "/tools");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveTitle(/Empower/);
  });

  test("TC-14 | /about-us page loads successfully", async ({ page }) => {
    await page.goto(process.env.QA_URL + "/about-us");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveTitle(/Empower/);
  });

  test("TC-15 | /contact page loads successfully", async ({ page }) => {
    await page.goto(process.env.QA_URL + "/contact");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveTitle(/Empower/);
  });

  test("TC-16 | /privacy page loads successfully", async ({ page }) => {
    await page.goto(process.env.QA_URL + "/privacy");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveTitle(/Empower/);
  });

  test("TC-17 | /login-v1 page loads successfully", async ({ page }) => {
    await page.goto(process.env.QA_URL + "/login-v1");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveTitle(/Login/i);
  });

});
