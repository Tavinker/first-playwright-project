Playwright main commands:
- install playwright to start a project: npm install -D @playwright/test   
- run the test file: npx playwright test
- run the test file with interface: npx playwright test --headed
- show the test report: npx playwright show-report
- run the interface test debugging step by step by testcase: npx playwright test -g "2: validating" --debug
- run the interface test debugging step by step by test file: npx playwright test tests/products-page-ui-behaviour.spec.js --debug
- run the interface test debugging step by step by test file in a specif browser: npx playwright test tests/products-page-ui-behaviour.spec.js --project=chromium --debug