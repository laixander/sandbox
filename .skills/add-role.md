# Skill: Add a New Role

## Purpose
Roles in this application are **fully dynamic** and database-driven. They define what pages a user has access to via their `pages` array. You do not need to hardcode new roles into type unions, middleware logic, or login pages anymore. 

This guide covers how to add a **default/sample role** to the system during development, which will automatically become available in the login screen, sidebar, and route protection middleware.

## When to Use
- Adding a new sample user role (e.g., `Manager`, `Supervisor`, `Viewer`) for testing.
- Expanding the default access control model with a new permission tier for new installations.

## Prerequisites
- `app/stores/roleStore.ts` exists and handles role definitions.

## Steps

### Step 1 — Add a default role to `roleStore.ts`

Open `app/stores/roleStore.ts` and add your new role to the initial `roles` array. 
You must provide an `id`, `name`, `description`, and a `pages` array containing the routes they are allowed to access.

```ts
// app/stores/roleStore.ts
export const useRoleStore = defineStore('roleStore', {
    state: () => ({
        roles: [
            { 
                id: 'role-admin', 
                name: 'Admin', 
                description: 'Administrator with full access', 
                pages: ['/', '/crud', '/roles', '/activity-logs', '/kanban', '/settings', '/notifications', '/wizard'] 
            },
            { 
                id: 'role-staff', 
                name: 'Staff', 
                description: 'Regular staff member', 
                pages: ['/', '/crud', '/kanban', '/notifications'] 
            },
            // Add your new role here:
            { 
                id: 'role-manager', 
                name: 'Manager', 
                description: 'Manager with elevated access', 
                // Define exactly what pages this role can see:
                pages: ['/', '/crud', '/kanban', '/reports', '/notifications'] 
            },
        ] as Role[],
        isLoading: false,
    }),
```

### Step 2 — Verify Application State

Because the system is dynamic, this is **the only file you need to change**.
The following behaviors happen automatically when you add a role to the store:

1. **Login Page**: The new `Manager` role will instantly appear in the role selector on `/login`. When logged in, the user will be redirected to the first available page in their `pages` array.
2. **Sidebar Navigation**: `app/layouts/default.vue` will automatically read the `pages` array and only show the sidebar navigation items that match those routes.
3. **Route Protection**: The middleware in `app/middleware/auth.global.ts` combined with the `<AuthGate />` in `default.vue` will automatically prevent the `Manager` from accessing any URL not in their `pages` list without any hardcoded logic needed.
4. **CRUD Management**: The new role will appear in the `/roles` management page, where it can be further edited or deleted in the UI.

## Conventions
- **Role IDs**: Follow the pattern `role-<name>`. 
- **Pages array**: Ensure you include `/` if the role should have access to the Dashboard.

## Output / Deliverables
- `app/stores/roleStore.ts` — new dynamic role added to default mock data

## Verification
- Log in as the new role on `/login` — verify the redirect fires to their first allowed page.
- Navigate directly to a restricted page as the new role — verify `<AuthGate />` displays an access denied message.
- Sidebar shows only the expected nav items for the new role.
