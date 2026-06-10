// ============================================================================
// Store: userStore
// ============================================================================
// Manages the state for the Users CRUD module including fetching and mutating records.
// Data is seeded via SeederService and persisted to localStorage.
//
// Usage:
//   const store = useUserStore()
//   store.createUser(newUser)
//   store.deleteUser(id)

import { defineStore } from 'pinia'
import { SeederService, type User } from '~/utils/seeder'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [] as User[],
        isLoading: false,
    }),

    actions: {
        /** Deploy mock user data into the store. */
        deployMockData(count: number = 6) {
            this.isLoading = true
            setTimeout(() => {
                const mockUsers = SeederService.generateUsers(count)
                this.users = [...this.users, ...mockUsers]
                this.isLoading = false
            }, 500)
        },

        /** Clear all mock user data from the store. */
        removeMockData() {
            this.isLoading = true
            setTimeout(() => {
                this.users = SeederService.clearUsers()
                this.isLoading = false
            }, 300)
        },

        // ── CRUD Actions ──────────────────────────────────────────────────

        /** Create a new user. Prepends to the list. */
        createUser(user: User) {
            this.users.unshift(user)
        },

        /** Update an existing user by ID with partial data. */
        updateUser(id: string, updatedData: Partial<User>) {
            const index = this.users.findIndex(u => u.id === id)
            if (index !== -1) {
                this.users[index] = { ...this.users[index], ...updatedData } as User
            }
        },

        /** Delete a user by ID. */
        deleteUser(id: string) {
            this.users = this.users.filter(u => u.id !== id)
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