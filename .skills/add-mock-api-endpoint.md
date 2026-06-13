# Skill: Add a Mock API Endpoint

## Purpose
Create a Nuxt Server API route (`server/api/<entity>.ts`) to serve deterministic, hardcoded mock data for a new entity. This mimics a real backend and allows Pinia stores to use asynchronous `$fetch` calls.

## When to Use
- A new entity type has been created in `app/types/<entity>.ts`
- A store needs to call `$fetch('/api/<entity>')` to seed mock data
- The entity needs reproducible, realistic fake data for UI testing

## Steps

1. **Create the file** `server/api/<entity>s.ts` (usually pluralized).

2. **Import the event handler and your type**:
   ```ts
   import { eventHandler } from 'h3'
   import type { <Entity> } from '~/types/<entity>'
   ```

3. **Define a hardcoded array of mock data**:
   - Use absolute, deterministic values. Do NOT use randomization libraries.
   - For IDs, use standard UUIDs (e.g. `crypto.randomUUID()` output) or simple strings.
   - For avatars, use `https://api.dicebear.com/10.x/thumbs/svg?seed=SomeName`.

   ```ts
   const <entity>s: <Entity>[] = [
     {
       id: '123e4567-e89b-12d3-a456-426614174000',
       name: 'Product A',
       price: 99.99,
       category: 'Electronics',
     },
     {
       id: '123e4567-e89b-12d3-a456-426614174001',
       name: 'Product B',
       price: 49.99,
       category: 'Clothing',
     }
   ]
   ```

4. **Export the data and the event handler**:
   ```ts
   export const mock<Entity>s = <entity>s

   export default eventHandler(() => <entity>s)
   ```

## Conventions
- **Deterministic Data**: Always hardcode the exact values you want to see. This ensures edge cases are consistently testable.
- **Pluralization**: Name the file plural (e.g., `products.ts`) so the endpoint becomes `/api/products`.
- **No Faker**: Do not install or import `faker`.
- **Typing**: Explicitly type the array `const data: <Entity>[] = [...]` so your mock data adheres to the TypeScript interface.

## Output / Deliverables
- `server/api/<entity>s.ts` — a Nuxt server route exporting mock data

## Verification
- Run the dev server.
- Visit `http://localhost:3000/api/<entity>s` in your browser.
- Confirm it returns the JSON array.
