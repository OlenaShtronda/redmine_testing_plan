# Redmine Testing Plan

This project contains an automated E2E test suite for the **Redmine** website using **Playwright**, structured with the Page Object Model and integrated with **Allure** for reporting.

📊 **Live Allure Report:**  
https://olenashtronda.github.io/redmine_testing_plan/

## Project Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── pages.js
├── src/
│   └── pages/
│       ├── BasePage.js
│       ├── HomePage.js
│       ├── IssuesPage.js
│       └── RegistrationPage.js
├── tests/
│   ├── issues.spec.js
│   └── registration.spec.js
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

## Installation

```bash
# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps
```

## Running Tests
```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Run a specific test
npx playwright test tests/registration.spec.js

# Run tests in specific browser
npx playwright test --project=chromium
```

## Allure Reporting
```bash
# Generate report manually
npx allure generate allure-results --clean -o allure-report

# Open locally
npx allure open allure-report
```

## Test Coverage

### Registration Page Tests (`registration.spec.js`)
- Registration with empty required fields
- Registration with a short password

### Issues Page Tests (`issues.spec.js`)
- Filtering issues by "Tracker"
- Adding columns through the "Options" menu
- Sorting issues by IDs

## Configuration

### Tests run on multiple browsers:
- Chromium
- Firefox
- WebKit

### Base URL
https://www.redmine.org

## Page Object Model
The project uses POM pattern for better maintainability:

- BasePage: Contains common methods (navigate, open, assertions)
- HomePage: Handles main page navigation
- RegistrationPage: Manages registration form interactions
- IssuesPage: Handles issues page filters and options

## CI/CD Pipeline
Automated workflow on push to main branch:

- Checkout repository
- Setup Node.js environment
- Install dependencies and browsers
- Run Playwright tests
- Generate Allure report with history
- Deploy report to GitHub Pages

## License

ISC

## Repository

https://github.com/OlenaShtronda/redmine_testing_plan
