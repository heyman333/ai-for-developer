# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` or `npm run dev`
- **Build for production**: `pnpm build` or `npm run build` (runs TypeScript compiler then Vite build)
- **Lint code**: `pnpm lint` or `npm run lint`
- **Preview production build**: `pnpm preview` or `npm run preview`
- **Install dependencies**: `pnpm install` (preferred) or `npm install`

## Project Architecture

This is a React + TypeScript + Vite project with the following structure:

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4 with SWC plugin for fast refresh
- **Package Manager**: pnpm (preferred, as indicated in package.json)
- **Styling**: Tailwind CSS v4 (use Tailwind utility classes for all styling)
- **Linting**: ESLint with TypeScript support and React-specific rules
- **Entry Point**: `src/main.tsx` renders the `App` component from `src/App.tsx`

### Key Configuration Files

- `vite.config.ts`: Basic Vite configuration with React SWC plugin
- `tsconfig.json`: TypeScript project references to app and node configs
- `tsconfig.app.json` & `tsconfig.node.json`: Separate TypeScript configurations for app and build tooling
- `eslint.config.js`: ESLint configuration with React hooks and refresh plugins

### Source Structure

- `src/App.tsx`: Main application component (currently a basic counter example)
- `src/main.tsx`: Application entry point with React StrictMode
- `src/assets/`: Static assets (React logo)
- `public/`: Public assets (Vite logo)

## Important Notes

- This is a minimal Vite + React setup with standard tooling
- Uses React 19's latest features and TypeScript for type safety
- No additional state management, routing, or UI libraries are currently installed
- The project uses ES modules (`"type": "module"` in package.json)

## TypeScript Conventions

- **Type imports**: Always use explicit type imports with the `type` keyword
  ```typescript
  import type { ListItem } from "../types";
  ```