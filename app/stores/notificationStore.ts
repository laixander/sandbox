// ============================================================================
// Store: Notifications
// ============================================================================
// Manages in-app notifications persisted to localStorage.
// New notifications always unshift() — most recent first.
//
// Usage:
//   const store = useNotificationStore()
//   store.addNotification('user_created', { userName: 'Alice' }, 'success', 'CRUD')
//   store.markAsRead(id)
//   store.markAllAsRead()
//   store.deleteNotification(id)
//   store.unreadCount    // reactive getter used by sidebar badge

import { faker } from '@faker-js/faker'
import { defineStore } from 'pinia'
import type { Notification, NotificationType } from '~/types/notification'
import type { NotificationTemplateId } from '~/utils/notificationTemplates'

export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        notifications: [] as Notification[],
    }),

    getters: {
        unreadCount: (state): number =>
            state.notifications.filter(n => !n.isRead).length,
        hasUnread: (state): boolean =>
            state.notifications.some(n => !n.isRead),
        hasNotifications: (state): boolean =>
            state.notifications.length > 0,
        totalCount: (state): number =>
            state.notifications.length,
    },

    actions: {
        addNotification(
            templateId: NotificationTemplateId,
            payload: Record<string, any> = {},
            type: NotificationType = 'info',
            module?: string,
        ) {
            this.notifications.unshift({
                id: crypto.randomUUID(),
                templateId,
                payload,
                type,
                isRead: false,
                createdAt: new Date().toISOString(),
                module,
            })
        },

        markAsRead(id: string) {
            const n = this.notifications.find(n => n.id === id)
            if (n) n.isRead = true
        },

        markAllAsRead() {
            this.notifications.forEach(n => (n.isRead = true))
        },

        deleteNotification(id: string) {
            this.notifications = this.notifications.filter(n => n.id !== id)
        },

        clearAll() {
            this.notifications = []
        },

        deployMockData() {
            const now = Date.now()

            // 1. Start with a standard welcome message
            const mock: Omit<Notification, 'id'>[] = [
                {
                    templateId: 'welcome',
                    payload: {},
                    type: 'info',
                    isRead: false,
                    createdAt: new Date(now - 2 * 60 * 1000).toISOString(),
                    module: 'System',
                }
            ]

            // 2. Define our template pool
            const templates = [
                { id: 'user_created', type: 'success', module: 'CRUD' },
                { id: 'storage_warning', type: 'warning', module: 'System' },
                { id: 'log_cleared', type: 'info', module: 'Activity Logs' },
                { id: 'export_complete', type: 'success', module: 'CRUD' },
                { id: 'failed_login', type: 'error', module: 'Auth' },
                { id: 'system_alert', type: 'info', module: 'System' }
            ] as const

            // 3. Generate 15 random notifications
            for (let i = 0; i < 15; i++) {
                const t = faker.helpers.arrayElement(templates)
                let payload: Record<string, any> = {}

                if (t.id === 'user_created') payload = { userName: faker.person.fullName() }
                if (t.id === 'storage_warning') payload = { usage: faker.number.int({ min: 80, max: 99 }) }
                if (t.id === 'log_cleared') payload = { adminName: faker.person.fullName() }
                if (t.id === 'export_complete') payload = { exportType: faker.helpers.arrayElement(['User Data', 'Activity Logs', 'System Config']) }
                if (t.id === 'failed_login') payload = { email: faker.internet.email() }
                if (t.id === 'system_alert') payload = { message: faker.hacker.phrase() }

                // Random time within the last 7 days
                const createdAt = new Date(now - faker.number.int({ min: 10 * 60 * 1000, max: 7 * 24 * 60 * 60 * 1000 })).toISOString()

                mock.push({
                    templateId: t.id,
                    payload,
                    type: t.type,
                    isRead: faker.datatype.boolean({ probability: 0.6 }), // 60% chance it is already read
                    createdAt,
                    module: t.module
                })
            }

            // 4. Assign IDs and merge into the store
            const mockWithIds = mock.map(n => ({ id: crypto.randomUUID(), ...n }))
            this.notifications.push(...mockWithIds)

            // 5. Sort the entire array descending (newest first)
            this.notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        },

        removeMockData() {
            this.notifications = []
        },
    },

    persist: {
        storage: persistedState.localStorage,
    },
})
