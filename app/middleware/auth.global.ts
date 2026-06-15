// ============================================================================
// Middleware: auth.global
// ============================================================================
// Global route guard that enforces role-based access control.
//
// Rules:
//  - Unauthenticated users → redirect to /login
//  - Authenticated users on /login → redirect to their home page
//  - Staff accessing / (Dashboard) → redirect to /crud

import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware((to) => {
    // Skip on the server — localStorage isn't available during SSR.
    // Pinia persisted state only rehydrates on the client, so running
    // auth checks server-side always sees an empty store and causes a
    // redirect flash to /login on every browser refresh.
    if (import.meta.server) return

    const authStore = useAuthStore()

    const isLoginPage = to.path === '/login'

    // Docs pages doesn't need authentication
    if (to.path.startsWith('/docs')) {
        return
    }

    // Unauthenticated: allow only /login
    if (!authStore.isAuthenticated) {
        if (!isLoginPage) {
            return navigateTo('/login')
        }
        return
    }

    // Authenticated user visiting /login → redirect to first allowed page
    if (isLoginPage) {
        const pages = authStore.role?.pages || []
        if (pages.length > 0) {
            return navigateTo(pages[0])
        }
        return navigateTo('/')
    }

    // Allow navigation to proceed. 
    // Authorization check (AuthGate) is handled by the layout.
    return
})
