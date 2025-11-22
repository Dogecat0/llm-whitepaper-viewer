# Repository Guidelines

## Project Structure & Module Organization
This Vite + React app lives under `src/`. `main.tsx` mounts `<App />` into `index.html`, while `App.tsx` coordinates the navigation pane and viewer layout defined in `index.css`. `MermaidDiagram.tsx` encapsulates Mermaid initialization plus zoom/pan tooling, so new rendering behavior belongs there. Diagram content lives in `diagrams.ts` as nested `DiagramNode` trees (e.g., `analysis-classification`), which keeps layout and copy centralized. Static assets destined for the build output go inside `public/`, whereas React-specific images belong in `src/assets/`. Build configuration stays in `vite.config.ts` and the TypeScript configs (`tsconfig*.json`).

## Build, Test, and Development Commands
- `npm run dev` – launches Vite with HMR on http://localhost:5173; use it to inspect every diagram edit in real time.
- `npm run build` – runs `tsc -b` for strict type-checks and then `vite build` to emit optimized assets in `dist/`.
- `npm run preview` – serves the latest build locally; verify that navigation, zooming, and diagram rendering work in a production-like environment.
- `npm run lint` – executes ESLint with the React, Hooks, and Refresh plugins across `src/`; run it before every commit.

## Coding Style & Naming Conventions
Stick to TypeScript ES modules, functional React components, and explicit prop interfaces. Indent with two spaces and favor `const` declarations, matching the existing files. Components stay PascalCase (`MermaidDiagram`), hooks/handlers camelCase, and diagram IDs kebab-case (`interaction-content`) so hierarchy keys remain predictable. Reuse the `app-`/`nav-` prefix pattern from `index.css` when adding CSS selectors to avoid collisions. Let ESLint surface unsafe patterns and rely on your editor’s TypeScript formatter for spacing; run `npm run lint` before opening a PR.

## Testing Guidelines
No automated tests are checked in yet, so manual verification is required: run `npm run dev` for interactive QA and `npm run build` to ensure type safety before sharing changes. When introducing meaningful logic (state machines, data transforms, etc.), scaffold Vitest + React Testing Library specs under `src/__tests__/` using the `ComponentName.test.tsx` naming pattern and update `package.json` with the corresponding script. Until that harness lands, document manual test steps in the PR description and mention any limitations.

## Commit & Pull Request Guidelines
The bundle was provided without git history, so follow Conventional Commits going forward (`feat: support multi-root diagrams`, `fix: clamp mermaid zoom`). Keep each commit focused on one behavioral change and reference affected diagram IDs in the body when applicable. PRs must include a clear summary, linked issue (if one exists), the commands you ran (`npm run lint`, `npm run build`, `npm run preview`), and screenshots/GIFs of the updated diagrams or UI. Call out Mermaid content edits explicitly so reviewers can cross-check visual diffs faster.

## Mermaid & Security Tips
`MermaidDiagram.tsx` initializes Mermaid with `securityLevel: "loose"`, which enables HTML labels but also trusts embedded markup. Only add sanitized content to the `mermaid` template literals and avoid user-supplied strings. Keep sizeable diagrams in dedicated template literals inside `diagrams.ts` rather than importing remote files, and document any new configuration changes you make to the global `mermaid.initialize` block.
