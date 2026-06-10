<script setup lang="ts">
definePageMeta({
    title: 'Notifications',
})

import type { Notification, NotificationType } from '~/types/notification'
import { notificationTemplates, type NotificationTemplateId } from '~/utils/notificationTemplates'

const store = useNotificationStore()
const toast = useAppToast()

// ── Type config ───────────────────────────────────────────────────────────
const typeConfig: Record<NotificationType, { icon: string; color: string }> = {
    info: { icon: 'i-lucide-info', color: 'info' },
    success: { icon: 'i-lucide-circle-check', color: 'success' },
    warning: { icon: 'i-lucide-triangle-alert', color: 'warning' },
    error: { icon: 'i-lucide-circle-x', color: 'error' },
}

const getTemplate = (id: NotificationTemplateId) => notificationTemplates[id] || notificationTemplates['system_alert']
const getIcon = (n: Notification) => getTemplate(n.templateId).icon || typeConfig[n.type].icon
const getColor = (n: Notification) => getTemplate(n.templateId).color || typeConfig[n.type].color

// ── Safe Markdown Parser ──────────────────────────────────────────────────
const escapeHtml = (unsafe: string) => {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

const renderDescriptionHtml = (templateId: NotificationTemplateId, payload: Record<string, any>) => {
    const rawString = getTemplate(templateId).renderDescription(payload)
    const safeString = escapeHtml(rawString)
    // Replace **text** with strong tag
    return safeString.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
}

// ── Filter state ──────────────────────────────────────────────────────────
const activeFilter = ref<'all' | 'unread'>('all')

const filteredNotifications = computed(() =>
    activeFilter.value === 'unread'
        ? store.notifications.filter(n => !n.isRead)
        : store.notifications,
)

// ── Actions ───────────────────────────────────────────────────────────────
const handleMarkAllRead = () => {
    store.markAllAsRead()
    toast.success('All caught up', 'All notifications marked as read.')
}

const handleDelete = (id: string) => {
    store.deleteNotification(id)
}

// ── Relative time ─────────────────────────────────────────────────────────
const relativeTime = (iso: string) => {
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
}

// Live-refresh timestamps every 30s
const timestamps = ref(Date.now())
onMounted(() => {
    const interval = setInterval(() => (timestamps.value = Date.now()), 30_000)
    onUnmounted(() => clearInterval(interval))
})
</script>

<template>
    <PageHeading title="Notifications" description="Your in-app activity feed">
        <div class="flex items-center gap-2">
            <UTabs v-model="activeFilter" variant="pill" size="xs" :content="false" :items="[
                { value: 'all', label: 'All' },
                { value: 'unread', label: 'Unread', badge: store.unreadCount > 0 ? String(store.unreadCount) : undefined },
            ]" />
        </div>
    </PageHeading>

    <ClientOnly>
        <Teleport to="#header-actions-teleport">
            <UButton v-if="store.hasUnread" variant="soft" color="primary" icon="i-lucide-check-check"
                label="Mark all read" size="sm" @click="handleMarkAllRead" />
        </Teleport>
    </ClientOnly>

    <!-- Notification feed -->
    <div v-if="filteredNotifications.length > 0" class="w-full max-w-2xl mx-auto mt-4 sm:mt-8 space-y-2">
        <UAlert v-for="notification in filteredNotifications" :key="notification.id" :title="getTemplate(notification.templateId).title"
            color="neutral" variant="outline"
            class="group relative cursor-pointer transition-all hover:border-primary/30"
            :class="!notification.isRead && 'ring-1 ring-primary/20 bg-primary/[0.02]'" :ui="{
                title: notification.isRead ? 'font-medium text-default' : 'font-semibold text-highlighted',
            }" @click="store.markAsRead(notification.id)" close>
            
            <template #description>
                <span v-html="renderDescriptionHtml(notification.templateId, notification.payload)" class="line-clamp-2" />
            </template>
            <template #leading>
                <UChip v-if="!notification.isRead" standalone inset class="absolute bottom-6 right-6 animate-pulse" />
                <div class="shrink-0 size-9 rounded-lg flex items-center justify-center"
                    :class="`bg-${getColor(notification)}/10`">
                    <UIcon :name="getIcon(notification)" class="size-4.5"
                        :class="`text-${getColor(notification)}`" />
                </div>
            </template>

            <template #actions>
                <div class="flex items-center gap-2">
                    <UBadge v-if="notification.module" :label="notification.module" variant="soft" color="neutral"
                        size="xs" />
                    <span class="text-xs text-muted">
                        {{ timestamps && relativeTime(notification.createdAt) }}
                    </span>
                </div>
            </template>

            <template #close>
                <UButton icon="i-lucide-x" size="xs" color="neutral" variant="ghost"
                    class="opacity-0 group-hover:opacity-100 transition-opacity"
                    @click.stop="handleDelete(notification.id)" />
            </template>
        </UAlert>
    </div>

    <!-- Empty state -->
    <UEmpty v-else variant="naked" icon="i-lucide-bell"
        :title="activeFilter === 'unread' ? 'All caught up' : 'No notifications'" :description="activeFilter === 'unread'
            ? 'You have no unread notifications.'
            : 'Notifications will appear here when triggered by app activity.'" />
</template>
