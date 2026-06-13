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

import { defineStore } from 'pinia'
import type { Notification, NotificationType } from '~/types/notification'
import type { NotificationTemplateId } from '~/utils/notificationTemplates'

export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        notifications: [] as Notification[],
    }),

    getters: {
        unreadCount: (state): number =>
            state.notifications.filter((n: Notification) => !n.isRead).length,
        hasUnread: (state): boolean =>
            state.notifications.some((n: Notification) => !n.isRead),
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
            const notification = this.notifications.find((n: Notification) => n.id === id)
            if (notification) notification.isRead = true
        },

        markAllAsRead() {
            this.notifications.forEach((n: Notification) => (n.isRead = true))
        },

        deleteNotification(id: string) {
            this.notifications = this.notifications.filter((n: Notification) => n.id !== id)
        },

        clearAll() {
            this.notifications = []
        },

        async deployMockData() {
            try {
                const data = await $fetch<Omit<Notification, 'id'>[]>('/api/notifications')
                
                // Add welcome message if empty
                if (this.notifications.length === 0) {
                    this.notifications.push({
                        id: crypto.randomUUID(),
                        templateId: 'welcome',
                        payload: {},
                        type: 'info',
                        isRead: false,
                        createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
                        module: 'System',
                    })
                }

                const mockWithIds = data.map((n: Omit<Notification, 'id'>) => ({ id: crypto.randomUUID(), ...n }))
                this.notifications.push(...mockWithIds)

                // Sort descending (newest first)
                this.notifications.sort((a: Notification, b: Notification) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            } catch (err) {
                console.error('Failed to load notifications', err)
            }
        },

        removeMockData() {
            this.notifications = []
        },
    },

    persist: {
        storage: persistedState.localStorage,
    },
})
