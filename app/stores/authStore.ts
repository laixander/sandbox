// ============================================================================
// Store: Auth
// ============================================================================
// Manages the demo session — stores the currently logged-in user and role.
// Persisted to localStorage so session survives page reloads.
//
// Usage:
//   const authStore = useAuthStore()
//   authStore.login('Admin')
//   authStore.logout()

import { defineStore } from 'pinia'
import type { AuthUser } from '~/types/auth'
import { useRoleStore } from './roleStore'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        currentUser: null as AuthUser | null,
    }),

    getters: {
        /** Returns true if a user is currently logged in. */
        isAuthenticated: (state): boolean => state.currentUser !== null,
        /** Returns the Role object of the currently logged-in user. */
        role: (state) => {
            if (!state.currentUser?.roleId) return null
            const roleStore = useRoleStore()
            return roleStore.roles.find(r => r.id === state.currentUser!.roleId) ?? null
        },
        /** Returns true if the logged-in user is an Admin. */
        isAdmin(): boolean {
            return this.role?.name === 'Admin'
        },
        /** Returns true if the logged-in user is Staff. */
        isStaff(): boolean {
            return this.role?.name === 'Staff'
        },
    },

    actions: {
        /** Logs in a demo user with the specified role ID. */
        login(roleId: string) {
            const roleStore = useRoleStore()
            const role = roleStore.roles.find(r => r.id === roleId)
            if (role) {
                const name = role.name === 'Admin' ? 'Alex Rivera' : role.name === 'Staff' ? 'Sam Torres' : `${role.name} User`
                this.currentUser = { name, roleId: role.id }
            }
        },

        /** Clears the current user session. */
        logout() {
            this.currentUser = null
        },
    },

    persist: {
        storage: persistedState.localStorage,
    },
})
