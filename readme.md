# Playwright Commands

## Setup
Install Playwright:
    npm install -D @playwright/test

## Run Tests
Run all tests:
    npx playwright test

Run tests with the browser UI:
    npx playwright test --headed

## Debug Tests
Debug a specific test case:
    npx playwright test -g "2: validating" --debug

Debug a test file:
    npx playwright test tests/products-page-ui-behaviour.spec.js --debug

Debug a test file in Chromium:
    npx playwright test tests/products-page-ui-behaviour.spec.js --project=chromium --debug

## Test Report
Show the test report:
    npx playwright show-report