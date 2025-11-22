# LLM Whitepaper Navigator

Interactive React/Vite viewer for the “Foundational Large Language Models & Text Generation” whitepaper. The app presents each chapter as cards and list items, with certain sections switching into animated infographic layouts.

## Features
- Chapter overview with nested cards for subtopics and leaf details
- Interactive layouts powered by Framer Motion (`timeline`, `process`) for designated sections
- Selection persisted in `localStorage` so the last viewed node reopens on refresh
- Content is data-driven: chapters live in `src/chapters/`, aggregated in `src/diagrams.ts`
- Lucide icons for quick visual anchors on chapter cards

## Scripts
- `npm run dev` — start Vite with HMR
- `npm run build` — type-check then build for production
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint on `src/`

## Project layout
- `src/main.tsx` mounts `<App />`
- `src/App.tsx` loads the selected node and hands it to `InfographicView`
- `src/InfographicView.tsx` renders cards and switches to `AnimatedTimeline` or `AnimatedProcess` when a node declares a `layout`
- `src/components/AnimatedTimeline.tsx` and `AnimatedProcess.tsx` contain the framer-motion animations
- `src/chapters/` holds the structured content; `src/types.ts` defines `DiagramNode`
- `public/` carries static assets emitted as-is by Vite

## Notes
- Some IDs are reused across chapters, so navigation uses full ancestry paths internally; keep IDs unique within a given level to avoid confusion when adding content.
- Mermaid utilities are still available in `src/diagrams.ts` but the current UI renders the infographic views instead.
