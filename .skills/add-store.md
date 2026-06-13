# Skill: Add a Pinia Store

## Purpose
Scaffold a Pinia store for a given entity, following app-sandbox's options API style with localStorage persistence and simulated async actions.

## When to Use
- A new entity needs state management
- You have a TypeScript interface but no store yet

## Prerequisites
- The entity interface must exist in `app/types/<entity>.ts`
- A Nuxt Server API route must exist at `server/api/<entity>s.ts` returning mock data
- `@pinia-plugin-persistedstate/nuxt` is configured in `nuxt.config.ts`

## Steps

1. **Create** `app/stores/<entity>Store.ts`

2. **Import** the store factory and the entity type:
   ```ts
   import { defineStore } from 'pinia'
   import type { <Entity> } from '~/types/<entity>'
   ```

3. **Define state** with the entity array and a loading flag:
   ```ts
   state: () => ({
     <entities>: [] as <Entity>[],
     isLoading: false,
   }),
   ```

4. **Define actions**:
   - `deployMockData()` — `async` function that fetches data from `await $fetch('/api/<entity>s')`
   - `removeMockData()` — instantly clears the array (e.g. `this.<entities> = []`)
   - `create<Entity>(item: <Entity>)` — `unshift()` to prepend (no delay)
   - `update<Entity>(id: string, updatedData: Partial<<Entity>>)` — find by id, spread update (no delay)
   - `delete<Entity>(id: string)` — filter out by id (no delay)

   ```ts
   actions: {
     async deployMockData() {
       this.isLoading = true
       try {
         const mockData = await $fetch<<Entity>[]>('/api/<entity>s')
         this.<entities> = [...this.<entities>, ...mockData]
       } finally {
         this.isLoading = false
       }
     },
     removeMockData() {
       this.isLoading = true
       this.<entities> = []
       this.isLoading = false
     },
     create<Entity>(item: <Entity>) {
       this.<entities>.unshift(item)
     },
     update<Entity>(id: string, updatedData: Partial<<Entity>>) {
       const index = this.<entities>.findIndex((e: <Entity>) => e.id === id)
       if (index !== -1) {
         this.<entities>[index] = { ...this.<entities>[index], ...updatedData } as <Entity>
       }
     },
     delete<Entity>(id: string) {
       this.<entities> = this.<entities>.filter((e: <Entity>) => e.id !== id)
     }
   },
   ```

5. **Define getters**:
   ```ts
   getters: {
     <entity>Count: (state) => state.<entities>.length,
     has<Entity>s: (state) => state.<entities>.length > 0
   },
   ```

6. **Enable persistence**:
   ```ts
   persist: {
     storage: persistedState.localStorage
   }
   ```

## Full Store Template

```ts
import { defineStore } from 'pinia'
import type { <Entity> } from '~/types/<entity>'

export const use<Entity>Store = defineStore('<entity>Store', {
  state: () => ({
    <entities>: [] as <Entity>[],
    isLoading: false,
  }),

  actions: {
    async deployMockData() {
      this.isLoading = true
      try {
        const mockData = await $fetch<<Entity>[]>('/api/<entity>s')
        this.<entities> = [...this.<entities>, ...mockData]
      } finally {
        this.isLoading = false
      }
    },

    removeMockData() {
      this.isLoading = true
      this.<entities> = []
      this.isLoading = false
    },

    create<Entity>(item: <Entity>) {
      this.<entities>.unshift(item)
    },

    update<Entity>(id: string, updatedData: Partial<<Entity>>) {
      const index = this.<entities>.findIndex((e: <Entity>) => e.id === id)
      if (index !== -1) {
        this.<entities>[index] = { ...this.<entities>[index], ...updatedData } as <Entity>
      }
    },

    delete<Entity>(id: string) {
      this.<entities> = this.<entities>.filter((e: <Entity>) => e.id !== id)
    }
  },

  getters: {
    <entity>Count: (state) => state.<entities>.length,
    has<Entity>s: (state) => state.<entities>.length > 0
  },

  persist: {
    storage: persistedState.localStorage
  }
})
```

## Conventions
- Use the **options API style** (`defineStore(id, { state, actions, getters, persist })`) — not the setup/composition style
- Store ID must be a camelCase string matching the filename: `'<entity>Store'`
- Always use `unshift()` for new records — not `push()`
- **Always append** mock data in `deployMockData` via `[...this.<entities>, ...mockData]` instead of overwriting, so any manually added data is preserved
- `deployMockData` MUST be `async` and use `$fetch` to hit the mock API endpoint, simulating real network boundaries.
- The entity type must be imported from `~/types/<entity>`

## Output / Deliverables
- `app/stores/<entity>Store.ts` — fully functional Pinia store

## Verification
- `pnpm typecheck` passes with no errors
- The `DemoFab` component can use the store's `deployMockData()` and `removeMockData()` if wired up
- Confirm data populates and persists across page refreshes (localStorage)
