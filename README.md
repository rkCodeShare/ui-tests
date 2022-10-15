# UI tests for eBay public website 

This framework is basic implementation of PlayWright with Typescript using page object model.


### To Run Tests
Install node v14+.
Navigate to project root folder in the terminal - ..\ui-tests
Run `npm install` to install dependencies.
Run `npx playwright test` to run all tests.

Tests are running in parallel with 2 workers and on multiple browsers, results are displayed in terminal as well as generated as HTML report placed inside \playwright-report.

Tests are running in headed mode, for better efficiency it can be turned off in playwright config with headless:true setting.