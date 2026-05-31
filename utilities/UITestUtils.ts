import { test as base_test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";


let URL: string;

switch (process.env.evn) {
  case "qa":
    URL = process.env.QA_URL || "";
    break;
  case "stg":
    URL = process.env.STG_URL || "";
    break;
  case "uat":
    URL = process.env.UAT_URL || "";
    break;
  default:
    throw new Error("Invalid environment specified in .env file");
}


//Extends the base test with custom UI setup.
export const test = base_test.extend({page: async ({ page }, use: Function) => {

  // add the steps that are needed for UI setup here ...
    await page.goto(`${URL}`);
    // domcontentloaded is more reliable than networkidle for JS-heavy sites
    await page.waitForLoadState("domcontentloaded");


    // do not touch
    BasePage.setPage(page); // Set the page in BasePage for global access
    await use(page); // Use the page in the test functions

  },
});


export { expect };
