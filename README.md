# Sandbox App: Nuxt 4 + Pinia + Nuxt UI

A fully-featured, production-ready administrative dashboard template built with Nuxt 4, Vue 3, and Tailwind CSS. This sandbox environment demonstrates advanced UI patterns, state management, and real-time data mocking techniques.

## ✨ Features Overview

- **Multi-Layout Routing System**: 
  - `default.vue`: Full authenticated dashboard wrapper with sidebar, user menu, and breadcrumbs.
  - `clean.vue`: Barebones layout used strictly for unauthenticated routes (e.g., login).
- **Role-Based Access Control (RBAC)**: Supports `Admin` and `Staff` roles. Middleware automatically routes users and dynamically hides/shows sidebar navigation items based on their permission level.
- **Native Drag-and-Drop Kanban Board**: A high-performance Kanban board built using native HTML5 Drag and Drop APIs. Supports cross-column and intra-column movement, locked cards, and real-time tag filtering.
- **Dynamic Chart.js Dashboards**: Comprehensive analytics overviews powered by `vue-chartjs`, rendering highly customized Line, Bar, Doughnut, Polar Area, and Radar charts.
- **Markdown-Enabled Notification Engine**: A real-time notification feed driven by a template dictionary, capable of safely parsing Markdown (`**bold**`) to highlight dynamic payloads without exposing the app to XSS vulnerabilities.
- **Activity & Audit Logging**: Global tracking system recording every meaningful user interaction across the platform. Includes multi-factor filtering (Module, Action Type, Text Search) and real-time timestamps.
- **Robust CRUD Modals**: Reusable `<Add[Entity]Modal>` patterns utilizing `zod` for strict schema validation before data ever touches the global state.
- **Agent-Driven Development**: A robust `.skills/` directory that contains execution instructions for autonomous AI agents to build out new pages, stores, and components using established project conventions.

---

## 🛠️ Tech Stack & Dependencies

* **Nuxt 4 (`nuxt`)**: The core Vue meta-framework providing file-based routing and automated runtime optimization.
* **Nuxt UI (`@nuxt/ui`)**: A performance-first UI library natively wrapping Tailwind CSS. Provides accessible modals, forms, inputs, tables, cards, and dropdowns.
* **Pinia (`@pinia/nuxt` & `pinia`)**: The lightweight global state management library.
* **Pinia Persisted State (`@pinia-plugin-persistedstate/nuxt`)**: Maps Pinia states directly to the browser's `localStorage`, ensuring data survivability across reloads.
* **Faker.js (`@faker-js/faker`)**: Generates rich mock structures (full names, profiles, job titles) for reliable local mocking.
* **Vue Chart.js (`vue-chartjs` & `chart.js`)**: Powers all analytics visualisations in the dashboard views.
* **Zod (`zod`)**: TypeScript-first schema declaration and validation library, used strictly for all form validations.

---

## 📂 Project Architecture

This project strictly adheres to the Nuxt 4 `app/` directory structure. 

```text
app-sandbox/
├── .skills/               # Execution workflows for AI Agents
├── app/
│   ├── components/        # Reusable UI elements (Modals, PageHeading, StatusBadge)
│   ├── composables/       # Auto-imported Vue composables (useNotify, useChart)
│   ├── layouts/           # Page wrappers (default.vue, clean.vue)
│   ├── middleware/        # Route guards (auth.global.ts)
│   ├── pages/             # File-based routing (index.vue, crud.vue, kanban.vue)
│   ├── stores/            # Pinia state management (authStore, kanbanStore, etc)
│   ├── types/             # Global TypeScript interfaces
│   └── utils/             # Helper utilities (SeederService, notificationTemplates)
├── nuxt.config.ts         # Nuxt compiler and module configuration
└── README.md
```

### The Isolated Seeder (`app/utils/seeder.ts`)
Keeps mock generation logic cleanly separated from the UI. Features methods like `generateDashboard()`, `generateKanbanCards()`, and `generateUsers()`. Data is seamlessly injected into the application via a global `DemoFab` (floating action button) in the bottom right corner of the dashboard.

### Core Logic Documentation Standard
Every file in `stores/`, `composables/`, and `utils/` features a standardized comment header on Line 1. This "Documentation-as-code" approach guarantees that any developer (or AI) can instantly understand the purpose and usage of a module without reading the implementation.

```ts
// ============================================================================
// Store: authStore
// ============================================================================
// Manages the demo session — stores the currently logged-in user and role.
//
// Usage:
//   const authStore = useAuthStore()
//   authStore.login('Admin')
```

---

## 🤖 Agent Skills System

This repository is optimized for **Agentic Development**. We leverage a feature called "Agent Skills" to instruct AI assistants on exactly how to build and expand features within this specific architecture.

If you are contributing to this project, or if you are an AI assistant analyzing this codebase, you **must** read the Agent Skills Guide located at:

**[`.skills/agent-skills-guide.md`](file:///Users/lnaguit/Desktop/code/app-sandbox/.skills/agent-skills-guide.md)**

It outlines the complete anatomy of the project, including layout behaviors, color systems, shared component signatures, and how to safely run complex scaffolding workflows (like building a new CRUD page or adding a new Role).