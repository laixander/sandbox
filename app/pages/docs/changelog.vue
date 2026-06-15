<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({
    layout: false,
    title: 'Changelog'
})

const isScrolled = ref(false)

onMounted(() => {
    const handleScroll = () => {
        isScrolled.value = window.scrollY > 120
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })
})

interface ChangelogEntry {
    date: string
    version: string
    title: string
    description: string
    changes: {
        type: 'feature' | 'fix' | 'refactor' | 'chore'
        text: string
    }[]
}

const changelogs: ChangelogEntry[] = [
    {
        date: 'June 5, 2026',
        version: 'v1.0.5',
        title: 'Audit Logging & UI Standardization',
        description: 'Comprehensive logging architecture with namespace drawers, unified confirmation flows, and new grid views.',
        changes: [
            { type: 'feature', text: 'Implemented global useAppLogger for robust system and user activity tracking.' },
            { type: 'feature', text: 'Added Recent Activity LogsDrawer to Projects, Users, Analytics, and Settings modules.' },
            { type: 'feature', text: 'Built interactive Card Grid view toggle for the Workspace directory.' },
            { type: 'refactor', text: 'Standardized all CRUD and destructive actions to use the global ConfirmationModal.' },
            { type: 'refactor', text: 'Unified StatusBadge styling and component usage across all module tables.' },
            { type: 'fix', text: 'Resolved Faker.js deprecation warnings and TypeScript mismatched types for generated phone numbers.' }
        ]
    },
    {
        date: 'June 3, 2026',
        version: 'v1.0.4',
        title: 'Premium UI & User Experience Refinements',
        description: 'Enhanced component styling across multiple modules, improved search capabilities, and refined developer tools.',
        changes: [
            { type: 'feature', text: 'Implemented global search filtering for Card views in both User and Project management pages.' },
            { type: 'feature', text: 'Added premium dynamic styling to the Analytics controls with ambient glow effects and custom dark mode themes.' },
            { type: 'fix', text: 'Prevented the DevTool Settings modal from automatically appearing on every page refresh.' },
            { type: 'fix', text: 'Hidden Demo FAB by default for cleaner production-like presentation.' },
            { type: 'refactor', text: 'Applied centralized dark-mode ready chart configurations to the Revenue Trend report.' },
            { type: 'chore', text: 'Added subtle grid background patterns with radial masking to Presentation slides.' }
        ]
    },
    {
        date: 'June 2, 2026',
        version: 'v1.0.3',
        title: 'Settings & DevTools',
        description: 'Introduced general system settings, workspace management, and developer tools.',
        changes: [
            { type: 'feature', text: 'Added General Settings page for configuring organization properties and policies.' },
            { type: 'feature', text: 'Implemented Workspace Management with dynamic procedural mock data generation.' },
            { type: 'feature', text: 'Built DevTool component and useDevSettings for streamlined debugging and state management.' },
            { type: 'chore', text: 'Added backend handover guidelines for future API integration.' }
        ]
    },
    {
        date: 'June 1, 2026',
        version: 'v1.0.2',
        title: 'Administrator Module & Authentication',
        description: 'Added robust authentication gating, user management, detailed reports, and expanded billing features.',
        changes: [
            { type: 'feature', text: 'Built AuthGate component and integrated useDemoAuth for route protection.' },
            { type: 'feature', text: 'Created Users management page for role-based access control.' },
            { type: 'feature', text: 'Added Invoices page under the Billing module.' },
            { type: 'feature', text: 'Built comprehensive Reports page in the Administrator module.' },
            { type: 'refactor', text: 'Enhanced UserMenu and UserModal components for improved user profile handling.' },
            { type: 'refactor', text: 'Reorganized core pages for better modularity.' }
        ]
    },
    {
        date: 'May 25, 2026',
        version: 'v1.0.1',
        title: 'Full System Completion',
        description: 'Completed all operational modules for the platform, including a powerful automated data seeder to demonstrate system capabilities under load.',
        changes: [
            { type: 'feature', text: 'Built Project Management Module: Task directory, unified Workspaces list, and an interactive Project Details page.' },
            { type: 'feature', text: 'Built Billing Module: Subscription management, Charge/Payment modals, and dynamic header actions.' },
            { type: 'feature', text: 'Built Analytics Module: Visual Data Grid, smart Metric Cards, and export queue.' },
            { type: 'feature', text: 'Built Automation Engine: Fully automated background event generator for tasks, notifications, and billing.' },
            { type: 'feature', text: 'Added real-time Activity Logs feed.' },
            { type: 'refactor', text: 'Implemented Vue Teleport for dynamic header actions across module detail pages.' }
        ]
    },
    {
        date: 'May 24, 2026',
        version: 'v1.0.0',
        title: 'Core Modules & Dashboard',
        description: 'Full implementation of the operations dashboard, management modules, data stores, and reusable component library.',
        changes: [
            { type: 'feature', text: 'Built Dashboard page with KPI stat cards (Active Users, MRR, New Signups, Server Load).' },
            { type: 'feature', text: 'Integrated Chart.js via vue-chartjs — added Doughnut and Bar charts with theme-aware palettes.' },
            { type: 'feature', text: 'Added Recent Activity and Summary quick-info panels to the dashboard.' },
            { type: 'feature', text: 'Implemented Data Management page with full CRUD — sortable data table, inline status badges, and quick actions.' },
            { type: 'feature', text: 'Created ItemModal and ConfirmationModal overlay components for add / edit / delete workflows.' },
            { type: 'feature', text: 'Built 5 Pinia stores (Users, Projects, Tasks, Invoices, Settings) with computed getters and demo seeder.' },
            { type: 'feature', text: 'Added useChart composable with shared palette, dataset factories, and dark-mode-responsive chart options.' },
            { type: 'feature', text: 'Created useAppToast, useAppLogger, useEvents, and useDemoSeeder composables.' },
            { type: 'feature', text: 'Built reusable StatCard, Empty, TableGlobalFilter, TableColumnToggle, and LogsDrawer components.' },
            { type: 'feature', text: 'Implemented collapsible sidebar layout with dynamic page titles and header action buttons from route meta.' },
            { type: 'feature', text: 'Added UserMenu component with role display and avatar.' },
            { type: 'refactor', text: 'Standardized table pages with sticky headers, global search, and column visibility toggles.' }
        ]
    }
]

function getBadgeColor(type: string) {
    switch (type) {
        case 'feature': return 'success'
        case 'fix': return 'error'
        case 'refactor': return 'warning'
        case 'chore': return 'neutral'
        default: return 'neutral'
    }
}
</script>

<template>
    <!-- ── Static Banner Header (Standard Flow) ─────────────────────── -->
    <div 
        class="relative border-b border-default py-8 overflow-hidden min-h-[33vh] flex flex-col justify-center transition-all duration-500 ease-in-out"
        :class="isScrolled ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'"
    >
        <UContainer class="relative">
            <div class="absolute -top-18 right-4">
                <UColorModeButton color="primary" />
            </div>
            <UBadge label="Changelog" icon="i-lucide-file-text" variant="subtle" color="primary" size="lg" class="rounded-full px-3 py-1.5 w-fit" />
            <div class="flex flex-col gap-3 mt-6">
                <h1 class="text-3xl sm:text-5xl text-pretty font-bold text-highlighted">
                    System Updates &amp; <span class="text-primary-600 dark:text-primary-400">Release Notes</span>
                </h1>
                <p class="text-lg text-pretty text-primary-600 dark:text-primary-700 font-light">
                    Keep track of all new features, improvements, and architectural updates to the Platform.
                </p>
            </div>
        </UContainer>
        <BackgroundGrid bg-color="bg-primary-50 dark:bg-primary-950/50" />
    </div>

    <!-- ── Fixed Mini-Navbar (Slides in smoothly on scroll, zero layout shift) ── -->
    <div 
        class="fixed top-0 left-0 right-0 z-40 border-b border-default bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out"
        :class="isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'"
    >
        <UContainer class="py-3 flex items-center justify-between">
            <h1 class="text-lg font-bold text-highlighted leading-none">
                Changelog &amp; <span class="text-primary-600 dark:text-primary-400">Release Notes</span>
            </h1>
            <div class="flex items-center gap-3">
                <UColorModeButton color="primary" class="cursor-pointer hover:scale-105 transition-transform" />
            </div>
        </UContainer>
    </div>

    <!-- ── Timeline ─────────────────────────────────────────────────── -->
    <UContainer class="py-12">
        <div v-for="(log, index) in changelogs" :key="index" class="relative pl-8 sm:pl-32 pb-6 last:pb-0">
            
            <!-- Timeline Line -->
            <div class="absolute left-[11px] sm:left-[107px] top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800"
                :class="{ 'bottom-auto h-full': index !== changelogs.length - 1 }" />
            
            <!-- Timeline Dot -->
            <div class="absolute left-0 sm:left-24 top-2 flex items-center justify-center w-6 h-6 rounded-full bg-primary-500/20 border-2 border-primary-500 z-10">
                <div class="w-2 h-2 rounded-full bg-primary-500" />
            </div>

            <!-- Date & Version (Desktop: Left, Mobile: Top) -->
            <div class="sm:absolute sm:left-0 sm:w-20 sm:text-right sm:top-1 mb-2 sm:mb-0">
                <span class="block text-xs font-medium text-dimmed whitespace-nowrap">{{ log.date }}</span>
                <span class="block text-sm font-bold text-primary whitespace-nowrap">{{ log.version }}</span>
            </div>

            <!-- Content Card -->
            <UCard variant="subtle" class="shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-1">{{ log.title }}</h2>
                <p class="text-sm text-dimmed mb-6">{{ log.description }}</p>

                <div class="space-y-3">
                    <div v-for="(change, cIndex) in log.changes" :key="cIndex" 
                        class="flex items-start gap-3 text-sm">
                        <div class="shrink-0 w-20">
                            <UBadge :color="getBadgeColor(change.type)" variant="soft" class="uppercase text-[10px] font-bold pt-[5px] w-full rounded-full justify-center">
                                {{ change.type }}
                            </UBadge>
                        </div>
                        <span class="text-toned leading-relaxed">{{ change.text }}</span>
                    </div>
                </div>
            </UCard>
        </div>
    </UContainer>
</template>
