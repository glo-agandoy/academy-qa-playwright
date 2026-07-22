# Playwright Automation Project

![Playwright](https://img.shields.io/badge/Framework-Playwright-2EAD33)
![NodeJS](https://img.shields.io/badge/Node.js-18%2B-green)
![NPM](https://img.shields.io/badge/Package%20Manager-npm-blue)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)

A modern end-to-end test automation framework built using **Playwright** and **Node.js**. This project is designed to automate web applications following best practices, with support for multiple browsers, reporters, and environments.

---

## 🛠 Prerequisites

Before starting with Playwright, make sure you have the following tools installed on your machine:

### 🔹 Required

- **Node.js 18+**  
  Playwright runs on Node.js.  
  👉 Download: https://nodejs.org/

- **npm 8+** (comes bundled with Node.js)  
  Used to manage project dependencies.

- **Git**  
  Required to clone the repository and manage version control.  
  👉 Download: https://git-scm.com/

### 🔹 Optional / Recommended

- **IDE / Code Editor**  
  Any modern editor will work, but these are recommended:
    - Visual Studio Code (with the official [Playwright Test extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright))
    - IntelliJ IDEA
    - WebStorm

> ℹ️ Unlike Selenium-based frameworks, Playwright does **not** require Java, Selenium Standalone, or separate browser drivers — it manages its own browser binaries (Chromium, Firefox, WebKit) automatically via `npx playwright install`.

---

## ✅ Verify Installation

Run the following commands to confirm everything is installed correctly:

```bash
node -v
npm -v
git --version
npx playwright --version
```

---

## ⚙️ Environment Configuration

This project uses environment variables to manage configuration such as base URLs, credentials, and execution modes.

**Environment variables can be set via:**

- `.env` files
- Command line
- CI pipelines

### Example usage in `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        baseURL: process.env.BASE_URL || 'https://demo.test.app',
    },
});
```

---

## 🚀 How to Run Tests

### Via Terminal

Install dependencies:

```bash
npm install
```

Install the required browsers (Chromium, Firefox, WebKit):

```bash
npx playwright install
```

Run all tests:

```bash
npm run test
```

Run a specific spec file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests in a specific browser project:

```bash
npx playwright test --project=firefox
```

Run tests in headed mode (see the browser):

```bash
npx playwright test --headed
```

Open the interactive UI mode:

```bash
npx playwright test --ui
```

View the HTML report from the last run:

```bash
npx playwright show-report
```
