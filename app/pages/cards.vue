<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// ============================================================================
// Page Configuration
// ============================================================================
definePageMeta({
    title: 'Agent Kit',
    isTable: true
})

// ============================================================================
// State & Data
// ============================================================================

const navigationItems: NavigationMenuItem[] = [
    { label: 'Card System', to: '/cards/card-system', icon: 'i-lucide-layout-template' },
    { label: 'Analytics Cards', to: '/cards/analytics-card', icon: 'i-lucide-chart-bar-big' },
    { label: 'Ecommerce Cards', to: '/cards/ecommerce-cards', icon: 'i-lucide-shopping-bag' },
    { label: 'Social Cards', to: '/cards/social-cards', icon: 'i-lucide-users' },
    { label: 'SaaS Cards', to: '/cards/saas-cards', icon: 'i-lucide-briefcase' },
    { label: 'Media Cards', to: '/cards/media-cards', icon: 'i-lucide-play-circle' }
]

</script>

<template>
    <div class="flex flex-col min-h-0">
        <UDashboardToolbar>
            <UNavigationMenu :items="navigationItems" highlight :ui="{ link: 'after:h-[2px]' }" class="flex-1" />
        </UDashboardToolbar>
        <div class="flex-1 overflow-y-auto scrollbar">
            <UContainer class="py-6 space-y-12">
                <NuxtPage />
            </UContainer>
        </div>
    </div>
</template>