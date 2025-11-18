# LLM Whitepaper – Mermaid Explorer

Interactive viewer for the Mermaid diagrams generated from the “Foundational Large Language Models & Text Generation” whitepaper.

The site is a static React app: a hierarchical navigation on the left, and a zoomable, pannable Mermaid diagram on the right. Each node in the hierarchy corresponds to a section or sub-section of the whitepaper.

---

## Features

- Tree navigation of whitepaper sections with expandable / collapsible nodes
- Renders Mermaid diagrams client-side
- Click a node to load its diagram
- Zoom in / out with mouse wheel or toolbar buttons
- Pan diagrams by clicking + dragging
- Fully static build, suitable for GitHub Pages

---

## Tech stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Mermaid](https://mermaid.js.org/) (for diagram rendering)
- [gh-pages](https://www.npmjs.com/package/gh-pages) (for deployment)

---

## Getting started

### Prerequisites

- Node.js (LTS) + npm

### Install

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
npm install
```
