# Skill: Add an Entity Type

## Purpose
Create a TypeScript interface for a new entity in `app/types/`.

## When to Use
- Introducing a brand new data model to the app
- A store or seeder needs a typed interface that doesn't exist yet

## Prerequisites
- You know the field names and their types for the new entity
- `app/types/` directory exists
- An entity concept (e.g. User, Product) has been identified

## Steps

1. **Create** `app/types/<entity>.ts` with a single named export:
   ```ts
   export interface <Entity> {
     id: string
     // ... other fields
   }
   ```

2. **Field type guide**:

   | Kind of data            | TypeScript type  | Notes                                      |
   |-------------------------|------------------|--------------------------------------------|
   | Identifier              | `string`         | Always `string`, e.g. UUIDs |
   | Text / label / name     | `string`         |                                            |
   | Number / price / count  | `number`         |                                            |
   | Date                    | `string`         | Store as ISO date string `'YYYY-MM-DD'`    |
   | Boolean flag            | `boolean`        |                                            |
   | Enum / status           | Union type       | e.g., `'active' \| 'inactive' \| 'pending'` |
   | Optional field          | `field?: Type`   | Use `?` for truly optional fields          |


## Conventions
- Every entity **must** have `id: string` as its first field
- Keep interfaces flat — avoid nested objects unless truly necessary
- Use union string literal types for status/category enums (not TypeScript `enum`)
- Do not add `readonly` modifiers — stores mutate these objects in place
- Type file must only contain the interface — no logic, no imports beyond what TypeScript needs
- Filename must be lowercase and match the entity name: `product.ts` for `Product`

## Output / Deliverables
- `app/types/<entity>.ts` — well-typed interface exported by name

## Verification
- `pnpm typecheck` passes with no errors
- Confirm the type is importable: `import type { <Entity> } from '~/utils/seeder'` in any store
