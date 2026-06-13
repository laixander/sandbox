// ============================================================================
// Store: userStore
// ============================================================================
// Manages the state for the Users CRUD module including fetching and mutating records.
// Data is fetched from mock Nuxt Server API and persisted to localStorage.
//
// Usage:
//   const store = useUserStore()
//   store.createUser(newUser)
//   store.deleteUser(id)

import { defineStore } from 'pinia'
import type { User } from '~/types/user'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [] as User[],
        isLoading: false,
    }),

    actions: {
        /** Deploy mock user data into the store. */
        async deployMockData() {
            this.isLoading = true
            try {
                const data = await $fetch<User[]>('/api/users')
                this.users = [...this.users, ...data]
            } finally {
                this.isLoading = false
            }
        },

        /** Clear all mock user data from the store. */
        removeMockData() {
            this.isLoading = true
            this.users = []
            this.isLoading = false
        },

        // ── CRUD Actions ──────────────────────────────────────────────────

        /** Create a new user. Prepends to the list. */
        createUser(user: User) {
            this.users.unshift(user)
        },

        /** Update an existing user by ID with partial data. */
        updateUser(id: string, updatedData: Partial<User>) {
            const index = this.users.findIndex((u: User) => u.id === id)
            if (index !== -1) {
                this.users[index] = { ...this.users[index], ...updatedData } as User
            }
        },

        /** Delete a user by ID. */
        deleteUser(id: string) {
            this.users = this.users.filter((u: User) => u.id !== id)
        }
    },

    getters: {
        /** Total number of users. */
        userCount: (state) => state.users.length,
        
        /** True if there is at least one user. */
        hasUsers: (state) => state.users.length > 0
    },

    persist: {
        storage: persistedState.localStorage
    }
})