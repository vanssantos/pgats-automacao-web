const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    runMode: 2,    
    openMode: 0
  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
