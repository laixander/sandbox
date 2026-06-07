import { defineStore } from 'pinia'
import { SeederService, type User } from '~/utils/seeder'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [] as User[],
        isLoading: false,
    }),

    actions: {
        deployMockData(count: number = 6) {
            this.isLoading = true
            setTimeout(() => {
                this.users = SeederService.generateUsers(count)
                this.isLoading = false
            }, 500)
        },

        removeMockData() {
            this.isLoading = true
            setTimeout(() => {
                this.users = SeederService.clearUsers()
                this.isLoading = false
            }, 300)
        },

        // --- CRUD ACTIONS ---
        createUser(user: User) {
            this.users.unshift(user) // Prepend new data entries to the list
        },

        updateUser(id: string, updatedData: Partial<User>) {
            const index = this.users.findIndex(u => u.id === id)
            if (index !== -1) {
                this.users[index] = { ...this.users[index], ...updatedData } as User
            }
        },

        deleteUser(id: string) {
            this.users = this.users.filter(u => u.id !== id)
        }
    },

    getters: {
        userCount: (state) => state.users.length,
        hasUsers: (state) => state.users.length > 0
    },

    persist: {
        storage: persistedState.localStorage
    }
})