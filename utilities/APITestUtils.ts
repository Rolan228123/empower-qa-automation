import { test as base_test, expect, APIRequestContext } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();


// Extends the base test with a pre-configured API context.
export const test = base_test.extend<{ apiContext: APIRequestContext }>({

  apiContext: async ({ playwright }, use) => {

    const apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL?.replace(/"/g, "").trim(),
      extraHTTPHeaders: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(process.env.API_AUTH_TOKEN && {
          "Authorization": `Bearer ${process.env.API_AUTH_TOKEN?.replace(/"/g, "").trim()}`,
        }),
      },
    });

    await use(apiContext);
    await apiContext.dispose();

  },
});


export { expect };
