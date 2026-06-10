// ============================================================================
// Composable: useNotify
// ============================================================================
// Thin ergonomic wrapper over useNotificationStore.
// Auto-imported — no manual import needed.
//
// Usage:
//   const { notify } = useNotify()
//   notify('system_alert', { message: 'Something failed' }, 'error')
//   notify('user_created', { userName: 'Alice' }, 'success', 'CRUD')

import type { NotificationType } from '~/types/notification'
import type { NotificationTemplateId } from '~/utils/notificationTemplates'

export const useNotify = () => {
    const store = useNotificationStore()

    const notify = (
        templateId: NotificationTemplateId,
        payload: Record<string, any> = {},
        type: NotificationType = 'info',
        module?: string,
    ) => {
        store.addNotification(templateId, payload, type, module)
    }

    return { notify }
}
