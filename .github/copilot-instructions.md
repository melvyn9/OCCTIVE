# OCCTIVE AI Coding Agent Instructions

## Project Overview
- OCCTIVE is a React + TypeScript web app for a curated video library supporting non-CS faculty and students.
- The architecture is component-driven, with major UI elements in `src/layout/components/` and page containers in `src/layout/containers/`.
- Data for videos, units, and dependencies is loaded from CSV files in `public/data/` and `build/data/`.
- Styling uses SCSS, with conventions for class naming and file organization.

## Key Patterns & Conventions
- **Functional Components Only**: All React components must be functional. Required props are defined via TypeScript interfaces.
- **CSS Class Naming**: Prefix all CSS class names with the component name (e.g., `home-page-title`). Use SCSS nesting for modifiers (see `README.md` for example).
- **Branch Naming**: Use the format `yourname/feature-description` for git branches.
- **Bug Fixes**: Minor bug fixes can be included in feature PRs if closely related.

## Directory Structure
- `src/layout/components/`: Individual UI components (each in its own folder with `index.tsx` and `style.scss`).
- `src/layout/containers/`: Page-level containers that compose components.
- `public/data/` and `build/data/`: CSV files for dependency graph, units, and videos.
- `src/utils/`: Shared data and utility functions.
- `src/assets/`: Fonts and static assets.
- `src/styles/`: Global and shared SCSS files.

## Data Flow & Integration
- Data is loaded from CSVs and passed to components via props or context.
- No backend; all data is static and loaded client-side.
- External links and references (e.g., ComputingPaths) are used for content guides.

## Developer Workflows
- **Install dependencies**: `yarn install`
- **Start dev server**: `yarn start` (if available in `package.json`)
- **Build for production**: `yarn build`
- **Lint/format**: Use TypeScript and SCSS conventions; no custom lint rules detected.
- **Testing**: No test framework detected; add tests in future if needed.

## Examples
- See `README.md` for CSS/SCSS and component patterns.
- Example data loading: `src/useGraphFromSheet.ts`.
- Example page composition: `src/layout/containers/HomePage.tsx`.

## Additional Notes
- Follow the ComputingPaths content guide for editing site content.
- Netlify is referenced but not yet implemented for OCCTIVE.
- License: NSF IUSE: EDU Program supported.

---
*Update this file as project conventions evolve. For questions, refer to `README.md` or ask maintainers.*
