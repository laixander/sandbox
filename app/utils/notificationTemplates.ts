// ============================================================================
// Utility: notificationTemplates
// ============================================================================
// Central dictionary of notification templates used by the notification system.
// New templates must be added here to be used in notify(templateId, payload).
//
// Usage:
//   // import { type NotificationTemplateId } from '~/utils/notificationTemplates'

import type { NotificationType } from '~/types/notification'

export interface NotificationTemplate {
    title: string
    renderDescription: (payload: Record<string, any>) => string
    type: NotificationType
    icon?: string
    color?: string
}

export const notificationTemplates = {
    welcome: {
        title: 'Welcome to Sandbox',
        renderDescription: () => 'Your demo environment is ready. Explore the features.',
        type: 'info',
        icon: 'i-lucide-party-popper',
        color: 'info',
    },
    user_created: {
        title: 'User Record Created',
        renderDescription: (p: Record<string, any>) => `A new user **${p.userName || ''}** was successfully added to the system.`,
        type: 'success',
        icon: 'i-lucide-user-plus',
        color: 'success',
    },
    storage_warning: {
        title: 'Storage Limit Approaching',
        renderDescription: (p: Record<string, any>) => `Your sandbox data is reaching the demo limit (${p.usage || '90'}% used).`,
        type: 'warning',
        icon: 'i-lucide-hard-drive-download',
        color: 'warning',
    },
    log_cleared: {
        title: 'Activity Log Cleared',
        renderDescription: (p: Record<string, any>) => `All activity logs were cleared by **${p.adminName || 'an Admin'}**.`,
        type: 'info',
        icon: 'i-lucide-trash-2',
        color: 'info',
    },
    export_complete: {
        title: 'Export Complete',
        renderDescription: (p: Record<string, any>) => `${p.exportType || 'Data'} export has been generated successfully.`,
        type: 'success',
        icon: 'i-lucide-download',
        color: 'success',
    },
    failed_login: {
        title: 'Failed Login Attempt',
        renderDescription: (p: Record<string, any>) => `An unauthorized login attempt was detected and blocked for **${p.email || 'unknown user'}**.`,
        type: 'error',
        icon: 'i-lucide-shield-alert',
        color: 'error',
    },
    system_alert: {
        title: 'System Alert',
        renderDescription: (p: Record<string, any>) => p.message || 'An unknown system event occurred.',
        type: 'info',
        icon: 'i-lucide-bell',
        color: 'info',
    },
} as const

// Utility type to extract all valid template keys
export type NotificationTemplateId = keyof typeof notificationTemplates
