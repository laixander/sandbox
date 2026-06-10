// ============================================================================
// Types: Notification
// ============================================================================

import type { NotificationTemplateId } from '~/utils/notificationTemplates'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
    id: string
    templateId: NotificationTemplateId
    payload: Record<string, any>
    type: NotificationType
    isRead: boolean
    createdAt: string
    module?: string   // optional: which app module triggered it (e.g. 'CRUD', 'Auth')
}
