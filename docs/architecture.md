# DataVisionLab Architecture

DataVisionLab uses Vue 3, Vite, TypeScript, Pinia, Vue Router and ECharts for a modular teaching-oriented data dashboard.

## Data Source Strategy

The current project defaults to `VITE_DATA_SOURCE=mock`. Dashboard views request data from the feature API layer. The API layer decides whether to return local mock data or call the HTTP client, so components do not depend on the mock implementation.

## Quality Systems

- Unit tests: Vitest
- E2E tests: Playwright
- Code quality: ESLint, Prettier, Stylelint and TypeScript strict mode
- Logging: shared logger with console transport and a reserved remote-reporting extension point
