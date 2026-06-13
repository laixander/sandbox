# Agent Skills — Setup & Usage Guide

Agent Skills let you package a repeatable workflow into a reusable set of instructions for an AI agent. Instead of rewriting long prompts and re-explaining project conventions each time, a skill gives the agent a stable sequence of steps to follow — improving consistency across runs.

Skills are plain **Markdown files** stored in your project. When you reference one, the agent reads and executes it as structured instructions.

---

## Why Use Skills?

| Without Skills | With Skills |
|---|---|
| Re-explain conventions every session | Agent reads them automatically from the file |
| Instructions drift or get forgotten | Steps are version-controlled and stable |
| Inconsistent output across runs | Predictable, repeatable results |
| Long prompts repeated manually | One-line invocation: *"Use skill: add-entity"* |

---

## Directory Structure

Store skills in a `.skills/` folder at your project root:

```
app-sandbox/
├── .skills/
│   ├── agent-skills-guide.md    ← This file (developer reference)
│   ├── add-entity.md            ← Full scaffold: type → seeder → store → page
│   ├── add-type.md              ← Add a TypeScript interface
│   ├── add-mock-api-endpoint.md     ← Create a Nuxt Server API for mock data
│   ├── add-store.md             ← Scaffold a Pinia store
│   ├── add-crud-page.md         ← Scaffold a full CRUD page
│   ├── add-dashboard-page.md    ← Scaffold a StatCard overview/summary page
│   ├── add-activity-log-view.md ← Scaffold a read-only audit log viewer
│   ├── add-settings-page.md     ← Scaffold a preferences/settings page
│   ├── add-wizard-page.md       ← Scaffold a multi-step wizard form
│   ├── add-kanban-page.md       ← Scaffold a drag-and-drop Kanban board
│   ├── add-component.md         ← Create a shared Vue component
│   ├── add-form-modal.md        ← Create a validated form modal (Add<Entity>Modal)
│   ├── add-status-badge-value.md ← Register a new status string in StatusBadge's colorMap
│   ├── add-composable.md        ← Create an auto-imported composable
│   └── add-role.md              ← Add a new system role across all auth files
├── app/
│   ├── error.vue                ← Global error boundary (404, 500, all unhandled errors)
│   ├── layouts/
│   ├── pages/
│   ├── components/
│   ├── stores/
│   ├── composables/
│   ├── types/
│   └── utils/
├── nuxt.config.ts
└── README.md
```

> The `.skills/` folder is not processed by Nuxt — it's purely for agent and developer consumption.

---

## Skill File Specification

Each skill is a Markdown file with the following structure:

```markdown
# Skill: [Name]

## Purpose
One-sentence description of what this skill accomplishes.

## When to Use
Bullet list of scenarios where this skill applies.

## Prerequisites
Any files, stores, or types that must already exist before running this skill.

## Steps
Numbered, precise, step-by-step instructions the agent must follow in order.

## Conventions
Rules and patterns specific to this project that the agent must respect.

## Output / Deliverables
What the agent should produce when this skill completes successfully.

## Verification
How to confirm the skill ran correctly (e.g., run typecheck, check browser).
```

---

## Project Architecture (Current State)

Understanding these patterns is critical for writing accurate skills.

### Layout System
The app has **two layouts**:

| Layout | File | When to use |
|---|---|---|
| `default` | `app/layouts/default.vue` | All authenticated pages (sidebar, header, DemoFab) |
| `clean` | `app/layouts/clean.vue` | Unauthenticated pages (login). Just `<slot />` |

**`default.vue`** key details:
- Entire template is wrapped in **`<ClientOnly>`** (auth is client-side only; avoids SSR flash to `/login`)
- Uses **`USidebar`** with `UNavigationMenu` for navigation
- **`UserMenu`** in the sidebar footer — shows current user name + role badge, theme switcher, and logout
- A **`#header-actions-teleport`** div — pages use `<Teleport to="#header-actions-teleport">` inside `<ClientOnly>` to inject action buttons into the top-right of the header bar
- Content area applies `flex flex-col overflow-hidden min-h-0` when `route.meta.isTable === true`
- Content area applies `p-4 overflow-y-auto scrollbar` for non-table pages
- **`DemoFab`** floating button for seeding/resetting data (bottom-right corner)
- Nav items are in **`allNavItems: NavigationMenuItem[]`** — mark Admin-only items with `meta: { adminOnly: true }`
- `items` is a `computed<NavigationMenuItem[][]>` that filters `allNavItems` based on `useDemoAuth().isAdmin`

### Auth System
- **`app/types/auth.ts`** — `SystemRole = 'Admin' | 'Staff'` and `AuthUser { name, role }`
- **`app/stores/authStore.ts`** — options API store with `login(role)`, `logout()` actions; `isAuthenticated`, `isAdmin`, `isStaff` getters; persisted to localStorage
- **`app/composables/useDemoAuth.ts`** — auto-imported ergonomic wrapper. Returns: `{ currentUser, isAuthenticated, role, isAdmin, isStaff, setRole, logout }`
- **`app/middleware/auth.global.ts`** — global route guard (client-only via `import.meta.server` check):
  - Unauthenticated → redirect `/login`
  - Authenticated on `/login` → redirect to home (`/` for Admin, `/crud` for Staff)
  - Staff accessing `/` → redirect to `/crud`
- **`app/pages/login.vue`** — uses `definePageMeta({ layout: false })` to opt out of all layouts; two roles: `Admin` and `Staff`
- **Role hierarchy**: Admin has full access (including `/`); Staff accesses `/crud` and `/activity-logs` only

### Page Convention
- **`definePageMeta({ title: '...', isTable: true })`** must be the first statement in `<script setup>`
- `isTable: true` activates the full-height flex layout for tables/card grids
- `layout: false` — used on the login page to bypass all layouts entirely (bare full-screen page)
- **`PageHeading`** component replaces raw `<header>` — use with `forTable` prop for table pages
- To add a new page to the sidebar, add it to `allNavItems` in `default.vue`; add `meta: { adminOnly: true }` if it should only appear for Admins

### Special Files

#### `app/error.vue` — Global Error Boundary
Nuxt 3's error page — rendered for **all** unhandled errors (404, 500, route errors). It does **not** use any layout. The pattern is minimal — just `UError` inside `UApp`:

```vue
<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
</script>

<template>
    <UApp>
        <UError :error="error" redirect="/">
            <template #leading>
                <!-- optional branding -->
            </template>
        </UError>
    </UApp>
</template>
```

| `UError` prop / slot | Purpose |
|---|---|
| `:error` | The `NuxtError` object from `defineProps` |
| `redirect="/"` | Where the "Back to home" button goes (defaults to `/`) |
| `icon` | Static icon above status code (optional) |
| `#leading` slot | Custom branding/logo shown above status code |
| `#links` slot | Override the default clear button |

> `UApp` is **required** on the error page — it provides color mode and theming context since no layout is applied.

### Shared Components
| Component | Usage |
|---|---|
| `PageHeading` | Page header with title, description, and an action slot. Use `forTable` prop for table pages |
| `UEmpty` | Empty state for tables (`#empty` slot) and card view fallbacks. Use `variant="naked"` inside tables. Use `#actions` slot for action buttons. Auto-imported from Nuxt UI — no custom component needed. |
| `ConfirmationModal` | Confirmation dialog for destructive/important actions. Use `v-model:open`, `@confirm`, `confirmColor` |
| `TableGlobalFilter` | Search input (`v-model` string). Always shown in page header |
| `TableColumnToggle` | Column visibility dropdown. Only shown when `viewMode === 'list'` |
| `StatusBadge` | Colored badge for status/category values |
| `StatCard` | KPI summary card for dashboard use. Driven by store state, never hardcoded |
| `DemoFab` | Floating seeder/reset button — wired to all active entity stores (user + dashboard) |
| `UserMenu` | Sidebar footer: theme color/neutral switcher + logout |
| `Add<Entity>Modal` | Extracted per-entity form modal with Zod schema. Uses `defineModel('open')`, `defineExpose({ reset })`, and emits `@save` with validated data |

### Composables
| Composable | Usage |
|---|---|
| `useAppToast()` | Auto-imported. `toast.success(title, desc?)`, `toast.error(title, desc?)`, and `toast.warning(title, desc?)` |
| `useActivityLog()` | Auto-imported. `const { log } = useActivityLog()` → `log(module, action, description, { meta? })`. Call on every real user action. Do NOT call from seeders. |
| `useDemoAuth()` | Auto-imported. Returns `{ currentUser, isAuthenticated, role, isAdmin, isStaff, setRole, logout }`. Used in `UserMenu`, `default.vue`, and anywhere role-based UI is needed. |
| `useNotify()` | Auto-imported. `const { notify } = useNotify()` → `notify(templateId, payload, type?, module?)`. Adds a notification to `notificationStore`. Types: `'info'`, `'success'`, `'warning'`, `'error'`. |
| `useChart()` | Auto-imported. Returns `{ legendLabels, defaultOptions, doughnutOptions, polarAreaOptions, radarOptions }` for `vue-chartjs` components. |

### CSS Utilities
| Class | What it does |
|---|---|
| `.scrollbar` | Styled thin scrollbar (defined in `app/assets/css/main.css`) |
| `.squircle` | SVG mask for squircle-shaped images |

### Color System
The full Tailwind palette is registered in two places — both must stay in sync:

| File | What it controls |
|---|---|
| `nuxt.config.ts` → `ui.theme.colors` | Tells Nuxt UI to generate CSS custom properties for each color |
| `app/app.config.ts` → `ui.colors` | Maps each color token to its Tailwind palette name at runtime |

**Available colors for all Nuxt UI components** (`UBadge`, `UButton`, `UIcon`, etc.):

| Group | Values |
|---|---|
| Semantic | `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `neutral` |
| Tailwind | `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose` |

**Convention**: Use semantic aliases (`success`, `warning`, `error`, `info`) when a color implies good/bad/neutral. Use specific Tailwind colors for category or tag distinctions that have no severity meaning.

**`StatusBadge.vue` sync rule**: The `BadgeColor` type in `StatusBadge.vue` must list every color in `ui.theme.colors`. When you add a new color to `nuxt.config.ts`, add it to the union too — see `.skills/add-status-badge-value.md`.

### Store Pattern (options API)
- `defineStore(id, { state, actions, getters, persist })`
- `isLoading` toggled around `setTimeout` calls
- New records always `unshift()` — never `push()`
- `persistedState.localStorage` for persistence (auto-imported global)
- **Explicit Types in Callbacks** — Vue's reactive boundaries (computed, watchers, templates) often drop type inference when looping through complex array states. Always explicitly type callback parameters (e.g. `.findIndex((u: User) => ...)` or `.map((c: KanbanColumn) => ...)`) to avoid `implicit any` TS errors.
- **`authStore`** is a special store — no seeder, no `isLoading`, no entity CRUD. It only manages session: `login(role)` and `logout()`
- **`settingsStore`** is a special store — no seeder, no `isLoading`. Manages persisted UI preferences via typed setters.
- **`notificationStore`** manages the in-app notification feed. Has `addNotification`, `markAsRead`, `markAllAsRead`, `deleteNotification`, `deployMockData` / `removeMockData`. Sidebar badge is driven by `notificationStore.unreadCount`. The `allNavItems` computed in `default.vue` must remain a `computed()` (not a static array) so the badge stays reactive.

### Mock API Pattern
- Mock data is statically defined in `server/api/<entity>s.ts` endpoints.
- Pinia stores fetch this data using `$fetch` via `await deployMockData()`.
- Dashboard entities use a single endpoint `/api/dashboard` which returns the full `DashboardData` shape.
- **Avatar URLs** use DiceBear: `` `https://api.dicebear.com/10.x/thumbs/svg?seed=${encodeURIComponent(name)}` `` — do NOT use faker.

### CRUD Page Pattern
- `viewMode` values: `'list'` | `'card'` (NOT `'table'`)
- **`<Teleport to="#header-actions-teleport">`** inside `<ClientOnly>` — injects the primary "Add" button into the header bar
- **Form modal is extracted** into `app/components/Add<Entity>Modal.vue` — it exposes `reset(initialData)` and emits `@save` with Zod-validated data. The page never holds raw form refs
- **`pendingSaveData`** ref — stashes validated data from the form modal's `@save` emit; used by `confirmSave()` after the edit confirmation modal closes
- **`modalRef` via `useTemplateRef('modalRef')`** — the page calls `modalRef.value?.reset(data)` before opening the modal
- `UDropdownMenu` with `[[Edit], [Delete]]` groups for row/card actions — no inline buttons
- `ConfirmationModal` required for delete AND for edit saves
- `filteredUsers` / `filtered<Entity>s` computed for card view search (table handles it natively)
- `columnVisibility` defaults to `{ id: false }`
- **`useActivityLog()`** — call `log(module, action, description, { meta })` on create, update, and delete. Never log seeder operations
- **`formRef?.submit()`**: trigger `<UForm>` validation from a `#footer` slot button that lives outside the form DOM

### Dashboard Page Pattern
- Dashboard pages do NOT use `isTable: true` — content scrolls naturally
- Stat cards and all chart datasets come exclusively from a dedicated Pinia store (e.g. `dashboardStore`)
- No hardcoded values in the template — all data flows from store → template
- The store's `deployMockData()` / `removeMockData()` are wired into `DemoFab` alongside entity stores
- Chart data is typed as `ChartDataPoint` from `app/types/dashboard.ts`; reuse `StatCardData` for stat cards
- Empty/reset state uses `value: '—'` (em dash) for stat cards and `{ labels: [], datasets: [] }` for charts


### Commenting Standards
The project adheres to strict commenting conventions based on semantic purpose:

1. **JSDoc (`/** ... */`)**: Must be used strictly for documenting functions, methods, getters, actions, and types so IDEs can parse and display hover tooltips. Do not use standard `//` comments directly above functions.
2. **Section Dividers (`// ── ... ──`)**: Must be used for visual hierarchy to break large files into distinct readable blocks (e.g. `// ── Actions ─────────────────`).
3. **Inline Explanations (`// ...`)**: Must be used purely to explain "why" or "how" for a specific line of code or logic block.

**In-Code Usage Comments:**
All core logic files (Stores, Composables, Utils) must include a standardized header block at line 1.
```ts
// ============================================================================
// [Category]: [Name]
// ============================================================================
// Brief 1-2 sentence description.
//
// Usage:
//   // code example
```

### TypeScript Strictness & Nuxt 3 Quirks
The project runs with strict TypeScript. Be aware of the following Nuxt 3 and Vue 3 quirks:
1. **Implicit `any` in Vue Reactive Boundaries**: Vue's reactive boundaries (e.g., inside `computed()`, inline arrow functions in templates like `@update:model-value`, `v-for` loops, `.map()`, `.filter()`, `.find()` inside `script setup`) frequently lose type inference. **You must ALWAYS explicitly type the parameters of inline functions** (e.g., `(val: boolean) =>`, `(u: User) =>`, `(item: NavigationMenuItem) =>`) to satisfy strict TS rules and prevent `Parameter implicitly has an 'any' type` errors.
2. **Nuxt 3 Auto-imports Conflicts**: NEVER manually import Vue composition APIs (like `ref`, `computed`, `h`, `onMounted`) from `'vue'`. Nuxt 3 automatically imports these globally. Manually importing them frequently causes TypeScript module resolution conflicts (e.g., `Module '"vue"' has no exported member 'computed'`).
3. **Nuxt UI Strictness with Intersection Types**: When defining dropdown items for `UDropdownMenu`, avoid strictly typing arrays as `const items: DropdownMenuItem[][] = [...]`. The Nuxt UI intersection types often incorrectly demand underlying HTML attributes like `name` or `autofocus`. Let TypeScript infer the shape (`const items = [...]`) so it passes cleanly to the render function.

---

## Skills in This Project

### `add-entity.md` — Full Entity Scaffold
Runs the entire pipeline in one shot: creates the type, extends the seeder, scaffolds the Pinia store, and builds the CRUD page. Use this when adding a brand new entity from scratch.

### `add-type.md` — TypeScript Interface
Creates `app/types/<entity>.ts` with a typed interface to be imported by stores and APIs.

### `add-mock-api-endpoint.md` — Mock API Endpoint
Creates `server/api/<entity>s.ts` with a deterministic, hardcoded JSON array of mock data to be served to Pinia stores via Nuxt Server APIs.

### `add-store.md` — Pinia Store
Scaffolds `app/stores/<entity>Store.ts` with the options API style, `isLoading` flag, `deployMockData`/`removeMockData` actions, full CRUD actions, getters, and `localStorage` persistence.

### `add-crud-page.md` — CRUD Page
Builds the full `app/pages/<entity>.vue` **and** its form modal component `app/components/Add<Entity>Modal.vue` with:
- `definePageMeta` with `isTable: true`
- `PageHeading` with `forTable`, `TableGlobalFilter`, `TableColumnToggle`, view toggle
- `<Teleport to="#header-actions-teleport">` for the primary action button inside `<ClientOnly>`
- `UTable` with `UEmpty` (`variant="naked"`) in `#empty` slot, sticky, column visibility, global filter
- Card grid with `filtered<Entity>s` computed, `UDropdownMenu` actions
- `ConfirmationModal` for delete and edit confirmation
- `useAppToast()` for all notifications

### Wizard Page (`add-wizard-page.md`)
- `definePageMeta` with just `title` — **NOT** `isTable: true`
- `UStepper` with `disabled` prop (prevents clicking ahead) + `v-model="currentStep"` + `ref="stepper"` for programmatic `stepper.value.next()` / `stepper.value.prev()`
- One `UForm` per step — each has its own Zod `:schema`, reactive `:state`, and `useTemplateRef` form ref
- `handleNext()` dispatcher calls `formRef.value?.submit()` for the active step; the form's `@submit` handler calls `stepper.value.next()`
- Review step (second-to-last) calls `handleSubmit()` directly from `handleNext()`
- Done step (last) hides navigation controls entirely (`v-if="currentStep < steps.length - 1"`)
- `<Transition name="wizard-slide" mode="out-in">` with `:key="currentStep"` drives step-change animation

### Kanban Board
- `definePageMeta` with `isTable: true` — full-height layout, columns fill available height
- State lives in `kanbanStore` — `moveCard(cardId, fromColumnId, toColumnId, insertBeforeCardId?)` handles both cross-column moves and intra-column reordering
- Drag and drop uses the **native HTML5 API** — no external library required
- `locked: true` cards have `draggable="false"`, display a `i-lucide-lock` icon, and use `cursor-default`
- `dragging` ref tracks `{ cardId, fromColumnId }`; `dragOver` ref tracks `{ columnId, cardId | null }` for precise drop targeting
- `onCardDragOver` sets `dragOver.cardId` → shows a thin divider line **above** the target card (`h-0.5 bg-primary`)
- `onColumnDragOver` sets `dragOver.cardId = null` → highlights the column drop zone with `ring-dashed bg-primary/5`
- `@drop.prevent.stop` on cards prevents the column `@drop` from also firing
- Inline add-card form per column: toggled by `addingCard` ref (columnId or null); uses `UInput` + `USelect` for priority; `@keyup.enter` confirms, `@keyup.esc` cancels
- **Mock Data Integration**: Fetches from `/api/kanban` for realistic mock data rather than hardcoded store factories.
- **Search & Tag Filters**: Uses `<TableGlobalFilter>` for text search and `<USelectMenu multiple>` for a Tag filter. A `displayColumns` computed property dynamically filters cards based on search input and selected tags.
- **Column Dropdown Menu**: Includes a `<UDropdownMenu>` inside the card modal header to allow users to move cards between columns without dragging.
- **Do NOT auto-seed on `onMounted`** — the store starts empty like all other stores; seeding is exclusively via DemoFab. Auto-seeding on mount silently re-populates the board after a system reset.
- **`UEmpty` in empty columns** — show `<UEmpty variant="naked">` inside the drop zone when `column.cards.length === 0 && addingCard !== column.id`; `class="flex-1 py-4"` keeps the column visible and still droppable
- `deployMockData()` / `removeMockData()` wired into `DemoFab`

### `add-dashboard-page.md` — Dashboard / Overview Page
Builds a non-table summary page with `StatCard` KPI grids and Chart.js charts. Uses the full Nuxt Server API → Pinia store pipeline:
- Does NOT use `isTable: true` — layout applies standard scrollable padding automatically
- Requires a dedicated `<name>Store` with `deployMockData()` / `removeMockData()` wired into `DemoFab`
- All stat card and chart data comes from the store — no hardcoded values in the template
- `StatCardData` and `ChartDataPoint` types from `app/types/dashboard.ts` are the standard data shapes

### `add-settings-page.md` — Settings Page
Creates a preferences page with `UCard` sections (Account, Display Preferences, Appearance, Data Management). No `isTable`, no Add/Edit modal. Covers: `settingsStore` pattern (no seeder, no `isLoading`), `useColorMode` + `appConfig` for appearance controls, `ConfirmationModal` for destructive actions, and wiring preferences into other pages (e.g., `defaultViewMode` → `crud.vue`).

### `add-activity-log-view.md` — Activity Log Viewer
Builds a **read-only** audit table page for a module. No Add/Edit modal, no seeder. Covers: multi-filter pattern (module dropdown + action dropdown + text search), `Record<ActionType, { color, icon }>` badge config map, `UTooltip` relative timestamps with `setInterval` live refresh, conditional Teleport content (count badge + clear button), and the self-logging clear action.

### `add-component.md` — Shared Component
Creates a new auto-imported Vue component in `app/components/` following the project's patterns: TypeScript `Props` interface, `withDefaults`, `defineModel` for two-way bindings, `defineEmits` for events, no business logic or store calls inside.

### `add-form-modal.md` — Form Modal Component
Creates `app/components/Add<Entity>Modal.vue` — the validated form modal required by every CRUD page. Covers the full pattern: `defineModel('open')`, Zod schema + `UForm`, `reactive` state, `defineExpose({ reset })` for parent seeding, `formRef?.submit()` from the `#footer` button, and a typed `@save` emit. Includes a complete parent-side usage example.

### `add-status-badge-value.md` — Status Badge Entry
Registers a new status string in `StatusBadge.vue`'s `colorMap`. Covers choosing the right `BadgeColor` for the semantic meaning, the group comment convention, explicit import for `h()` usage vs. auto-import in templates, and how to supply icons from the caller (table column and card view patterns). Reminds that the icon is always caller-supplied — there is no internal icon map.

### `add-composable.md` — Composable
Creates a new auto-imported composable in `app/composables/` following the `useAppToast` pattern. Covers three patterns: wrapping a Nuxt built-in, reactive state + methods, and computed helpers over a store.

### `add-role.md` — New System Role
Coordinates changes across all 5 auth files in one pass: adds the role to the `SystemRole` union type, creates a demo user profile in `DEMO_USERS`, adds the `roleOptions` entry and redirect branch in `login.vue`, defines access rules in `auth.global.ts`, and optionally updates sidebar nav visibility in `default.vue`. TypeScript exhaustiveness check on `DEMO_USERS` catches any missed file automatically.

---

## How to Invoke a Skill

When you want the agent to follow a skill, simply reference it in your message:

```
"Use .skills/add-entity.md to scaffold a Products entity."
```

```
"Follow .skills/add-store.md to create a store for Orders."
```

```
"Use .skills/add-mock-api-endpoint.md to add fake Task data endpoint."
```

The agent will read the file with `IsSkillFile: true`, treating it as executable instructions rather than a file to summarize.

---

## Tips for Writing Effective Skills

- **Be numbered and sequential** — agents follow steps in order; ambiguity causes deviation
- **State conventions explicitly** — don't assume the agent remembers project patterns
- **Include a verification step** — gives the agent a clear success condition
- **Keep one skill per workflow** — don't combine unrelated steps into one file
- **Version control them** — skills are code; commit them alongside your source
- **Keep them current** — update skills whenever the codebase conventions change

---

## Quick Reference

| Skill File | What It Does |
|---|---|
| `add-entity.md` | Full scaffold: type → seeder → store → page |
| `add-type.md` | TypeScript interface in `app/types/` |
| `add-mock-api-endpoint.md` | Create a Nuxt Server API endpoint for mock data |
| `add-store.md` | Pinia store with CRUD actions + localStorage persistence |
| `add-crud-page.md` | Full CRUD page: `PageHeading`, table, cards, modals, toasts |
| `add-dashboard-page.md` | Overview page with `StatCard` KPIs and recent-activity list |
| `add-settings-page.md` | Preferences page: `UCard` sections, `settingsStore`, appearance controls |
| `add-activity-log-view.md` | Read-only audit log viewer: multi-filter, live timestamps, clear action |
| `add-component.md` | Shared Vue component with typed props, slots, and `defineModel` |
| `add-form-modal.md` | Validated form modal: Zod schema, `defineExpose({ reset })`, `@save` emit |
| `add-status-badge-value.md` | Add a status to `StatusBadge`'s colorMap + use in table/card view |
| `add-composable.md` | Auto-imported composable following `useAppToast` patterns |
| `add-role.md` | New system role: type → store → login → middleware → nav visibility |
