import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://enmacc.com/",
    chromeWebSecurity: false,
    viewportWidth: 1320,
    viewportHeight: 800,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
