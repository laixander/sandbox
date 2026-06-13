import { defineStore } from 'pinia'
import type { Role } from '~/types/role'

export const useRoleStore = defineStore('roleStore', {
    state: () => ({
        roles: [
            { id: 'role-admin', name: 'Admin', description: 'Administrator with full access' },
            { id: 'role-staff', name: 'Staff', description: 'Regular staff member' },
        ] as Role[],
        isLoading: false,
    }),
    actions: {
        createRole(role: Role) {
            this.roles.push(role)
        },
        updateRole(id: string, updatedData: Partial<Role>) {
            const index = this.roles.findIndex((r: Role) => r.id === id)
            if (index !== -1) {
                this.roles[index] = { ...this.roles[index], ...updatedData } as Role
            }
        },
        deleteRole(id: string) {
            this.roles = this.roles.filter((r: Role) => r.id !== id)
        }
    },
    persist: {
        storage: persistedState.localStorage
    }
})
