# Empower QA Automation Framework

Playwright + TypeScript TDD automation framework targeting [empower.com](https://www.empower.com).  
Built on a battle-tested template by **Rolan Vataev** as a portfolio project for the Senior QA Automation Engineer role at Empower.

---

## Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | UI automation engine |
| TypeScript | Type-safe test code |
| Page Object Model | Locator and action abstraction |
| Custom Fixtures | Centralized test setup via `UITestUtils` / `APITestUtils` |
| dotenv | Environment-based config (no hardcoded URLs or credentials) |
| GitHub Actions | Two-stage CI/CD: smoke gate → full regression |

---

## Project structure

```
empower-automation/
├── pages/                          # Page Object Model classes
│   ├── BasePage.ts                 # Base class — shared locator & frame helpers
│   ├── HomePage.ts                 # empower.com home page
│   ├── LoginPage.ts                # /login-v1 login selection page
│   └── NavigationPage.ts           # Global navigation
├── tests/
│   ├── epic01-homepage/
│   │   ├── user-story01-page-load.spec.ts
│   │   └── user-story02-footer.spec.ts
│   ├── epic02-navigation/
│   │   ├── user-story01-nav-links.spec.ts
│   │   └── user-story02-page-routing.spec.ts
│   ├── epic03-login/
│   │   └── user-story01-login-options.spec.ts
│   └── epic04-smoke/
│       └── user-story01-seo-accessibility.spec.ts
├── utilities/
│   ├── UITestUtils.ts              # UI fixture — auto-navigates to baseURL
│   └── APITestUtils.ts             # API fixture — pre-configured request context
├── .github/
│   └── workflows/
│       └── playwright.yml          # Two-stage CI: smoke → regression
├── .env                            # Local config (not committed)
├── .env.example                    # Template for environment setup
└── playwright.config.ts            # Browser projects, retries, reporters
```

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Configure environment
cp .env.example .env
# Edit .env — URL is already set to https://www.empower.com

# 4. Run smoke tests (fast, ~30 seconds)
npm run test:smoke

# 5. Run full suite
npm run test:all

# 6. View HTML report
npm run report
```

---

## Test tags

Every test is tagged for targeted execution:

| Tag | Command | What runs |
|-----|---------|-----------|
| `@smoke` | `npm run test:smoke` | Critical path — runs on every PR |
| `@homepage` | `npm run test:homepage` | All home page tests |
| `@navigation` | `npm run test:navigation` | Nav + routing tests |
| `@login` | `npm run test:login` | Login page tests |
| `@accessibility` | `npm run test:accessibility` | a11y checks |
| `@security` | `npm run test:security` | HTTPS + exposure checks |
| `@regression` | `npm run test:regression` | Full regression suite |

---

## Test coverage — 32 test cases

### EPIC-01 | Home Page (TC-01 to TC-09)
Page load, hero heading, CTAs, footer links, navigation to login.

### EPIC-02 | Navigation (TC-10 to TC-18)
Logo, nav links, routing to /tools, /about-us, /contact, /privacy, /login-v1.

### EPIC-03 | Login Page (TC-19 to TC-23)
Login selection page heading, 5 login options present, correct portal routing per account type.

### EPIC-04 | Smoke — SEO, Accessibility, Security (TC-24 to TC-32)
- **SEO**: meta description length, og:title, canonical URL
- **Accessibility**: single h1, alt attributes on images, descriptive headings
- **Security**: HTTPS enforcement, no stack traces in page body

---

## CI/CD pipeline

Two-stage GitHub Actions workflow on every PR and push to `main`:

1. **Smoke job** — runs `@smoke` tests only. Blocks merge on failure.
2. **Regression job** — runs full suite after smoke passes. HTML report uploaded as artifact.

---

## Design decisions

**Why `UITestUtils` fixture?**  
Centralizes navigation and `BasePage.setPage()` wiring. Every test file gets a ready page without boilerplate.

**Why epic/user-story folder structure?**  
Maps directly to Agile ticket hierarchy. Easy to find tests when a Jira epic comes up in a sprint.

**Why smoke tests include SEO and accessibility?**  
Financial services platforms have regulatory and reputational exposure beyond functional bugs. A missing `alt` attribute or broken canonical URL may be invisible in a functional test run but has real impact. This mirrors validation work I performed at Fannie Mae (data integrity) and Blink Health (security).
