import { defineStore } from 'pinia'
import type { UserRole } from '~/types/role'

export const useUserRoleStore = defineStore('userRoleStore', {
    state: () => ({
        userRoles: [] as UserRole[],
        isLoading: false,
    }),
    actions: {
        setRolesForUser(userId: string, roleIds: string[]) {
            this.userRoles = this.userRoles.filter((ur: UserRole) => ur.userId !== userId)
            roleIds.forEach((roleId: string) => {
                this.userRoles.push({
                    id: crypto.randomUUID(),
                    userId,
                    roleId
                })
            })
        }
    },
    getters: {
        rolesForUser: (state) => (userId: string) => {
            return state.userRoles.filter((ur: UserRole) => ur.userId === userId).map((ur: UserRole) => ur.roleId)
        }
    },
    persist: {
        storage: persistedState.localStorage
    }
})
