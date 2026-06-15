# Sandbox App: Nuxt 4 + Pinia + Nuxt UI

A fully-featured, production-ready administrative dashboard template built with Nuxt 4, Vue 3, and Tailwind CSS. This sandbox environment demonstrates advanced UI patterns, state management, real-time data mocking techniques, and serves as a prime template for Agentic Development.

## ✨ Features Overview

- **Multi-Layout Routing System**: 
  - `default.vue`: Full authenticated dashboard wrapper with sidebar, user menu, and breadcrumbs.
  - `clean.vue`: Barebones layout used strictly for unauthenticated routes (e.g., login).
- **Dynamic Role-Based Access Control (RBAC)**: Supports dynamic role definitions where each role governs accessible pages and auto-routing. Middleware natively hides/shows sidebar navigation items based on permission levels.
- **Native Drag-and-Drop Kanban Board**: A high-performance Kanban board built using native HTML5 Drag and Drop APIs. Supports cross-column and intra-column movement, locked cards, and real-time tag filtering.
- **Dynamic Chart.js Dashboards**: Comprehensive analytics overviews powered by `vue-chartjs`, rendering highly customized Line, Bar, Doughnut, Polar Area, and Radar charts.
- **Markdown-Enabled Notification Engine**: A real-time notification feed driven by a template dictionary, capable of safely parsing Markdown (`**bold**`) to highlight dynamic payloads without exposing the app to XSS vulnerabilities.
- **Activity & Audit Logging**: Global tracking system recording every meaningful user interaction across the platform. Includes multi-factor filtering (Module, Action Type, Text Search) and real-time timestamps.
- **Robust CRUD Modals & Multi-Step Wizards**: Reusable `<Add[Entity]Modal>` patterns utilizing `zod` for strict schema validation. Also includes multi-step form wizard architectures with isolated step validation.
- **Interactive In-App Documentation**: Comprehensive, responsive internal documentation (`/docs/documentation`, `/docs/user-manual`) demonstrating complex nested tab layouts, mobile-friendly sidebars, and interactive mock UI rendering.
- **Agent-Driven Development**: A robust `.skills/` directory that contains execution instructions for autonomous AI agents to build out new pages, stores, components, and full entities using established project conventions.

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
├── .skills/               # Execution workflows for AI Agents (CRUD, Dashboards, Wizards, etc.)
├── app/
│   ├── components/        # Reusable UI elements (Modals, PageHeading, StatusBadge)
│   ├── composables/       # Auto-imported Vue composables (useNotify, useChart, useActivityLog)
│   ├── layouts/           # Page wrappers (default.vue, clean.vue)
│   ├── middleware/        # Route guards (auth.global.ts)
│   ├── pages/             # File-based routing (index.vue, crud.vue, kanban.vue, wizard.vue, docs/)
│   ├── stores/            # Pinia state management (authStore, kanbanStore, roleStore, settingsStore)
│   ├── types/             # Global TypeScript interfaces
│   └── utils/             # Helper utilities (SeederService, notificationTemplates)
├── server/
│   └── api/               # Nuxt Server API endpoints for mock data provision
├── nuxt.config.ts         # Nuxt compiler and module configuration
└── README.md
```

### The Isolated Seeder (`app/utils/seeder.ts` & `/server/api/`)
Keeps mock generation logic cleanly separated from the UI. Data points (like Kanban tasks or Dashboard metrics) are securely served via local Nuxt Server API endpoints. Data is seamlessly injected into the application state via a global `DemoFab` (floating action button) in the bottom right corner of the dashboard.

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

Currently available skills include workflows for building:
- **Full Entities** (`add-entity.md`)
- **Pages** (`add-crud-page.md`, `add-dashboard-page.md`, `add-kanban-page.md`, `add-wizard-page.md`, `add-activity-log-view.md`, `add-settings-page.md`)
- **Logic & Data** (`add-store.md`, `add-type.md`, `add-mock-api-endpoint.md`, `add-role.md`)
- **Shared Utilities** (`add-component.md`, `add-composable.md`, `add-form-modal.md`)

If you are contributing to this project, or if you are an AI assistant analyzing this codebase, you **must** read the Agent Skills Guide and Workflow Guide:

**[`.skills/agent-skills-guide.md`](file:///Users/lnaguit/Desktop/code/app-sandbox/.skills/agent-skills-guide.md)**
**[`.skills/developer-workflow.md`](file:///Users/lnaguit/Desktop/code/app-sandbox/.skills/developer-workflow.md)**

These outline the complete anatomy of the project, including layout behaviors, color systems, shared component signatures, and how to safely run complex scaffolding workflows.