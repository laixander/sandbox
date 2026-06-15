<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// --- Page Meta ---
definePageMeta({
    layout: false,
    title: 'User Manual'
})

// --- Static Data ---
const items = [
    { label: 'Super Admin', icon: 'i-lucide-shield-alert', value: 'admin' },
    { label: 'Manager', icon: 'i-lucide-briefcase', value: 'manager' },
    { label: 'Billing Admin', icon: 'i-lucide-receipt', value: 'billing' },
    { label: 'Editor', icon: 'i-lucide-edit-3', value: 'editor' },
    { label: 'Automation Engine', icon: 'i-lucide-bot', value: 'simulation' }
]

// --- Reactive State ---
const isScrolled = ref(false)
const isMobile = ref(false)
const activeTab = ref('admin')
const open = ref(false)

const tabUi = computed(() => {
    if (isMobile.value) {
        return {
            root: 'flex flex-col gap-6 w-full',
            list: 'overflow-x-auto whitespace-nowrap hide-scrollbar pb-2 w-full gap-1'
        }
    }
    return {
        root: 'items-start',
        list: 'gap-1 sticky top-20 h-fit'
    }
})

// --- Lifecycle ---
onMounted(() => {
    const handleScroll = () => {
        isScrolled.value = window.scrollY > 120
    }
    const handleResize = () => {
        isMobile.value = window.innerWidth < 768
    }

    handleScroll()
    handleResize()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
    })
})
</script>

<template>
    <!-- ── Static Banner Header (Standard Flow) ─────────────────────── -->
    <div class="relative border-b border-default py-8 overflow-hidden min-h-[33vh] flex flex-col justify-center transition-all duration-500 ease-in-out"
        :class="isScrolled ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'">
        <div class="py-1 absolute top-0 flex justify-center w-full">
            <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 text-right">
                <UColorModeButton color="primary" />
                <UButton v-if="isMobile" icon="i-lucide-menu" variant="ghost" aria-label="Toggle sidebar"
                    @click="open = !open" />
            </div>
        </div>
        <UContainer>
            <UBadge label="User Manual" icon="i-lucide-user" variant="subtle" color="primary" size="lg"
                class="rounded-full px-3 py-1.5 w-fit" />
            <div class="flex flex-col gap-3 mt-6">
                <h1 class="text-3xl sm:text-5xl text-pretty font-bold text-highlighted">
                    Role-Based <span class="text-primary-600 dark:text-primary-400">Instructions</span>
                </h1>
                <p class="text-lg text-pretty text-primary-600 dark:text-primary-700 font-light">
                    Comprehensive step-by-step instructions for utilizing the SaaS Platform.
                </p>
            </div>
        </UContainer>
        <BackgroundGrid bg-color="bg-primary-50 dark:bg-primary-950/50" />
    </div>

    <!-- ── Fixed Mini-Navbar (Slides in smoothly on scroll, zero layout shift) ── -->
    <div class="fixed top-0 left-0 right-0 z-40 border-b border-default bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out"
        :class="isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'">
        <UContainer class="py-3 flex items-center justify-between">
            <h1 class="text-lg font-bold text-highlighted leading-none">
                User <span class="text-primary-600 dark:text-primary-400">Manual</span>
            </h1>
            <div class="flex items-center gap-3">
                <UColorModeButton color="primary" class="cursor-pointer hover:scale-105 transition-transform" />
            </div>
        </UContainer>
    </div>

    <USidebar v-model:open="open" side="right" title="Menu">
        <UTabs v-model="activeTab" :items="items" orientation="vertical" variant="link" :content="false"
            @click="open = false" />
    </USidebar>

    <!-- ── Manual Content ─────────────────────────────────────────────────── -->
    <UContainer class="flex sm:gap-6 md:gap-12 py-4 sm:py-6 lg:py-12">
        <UTabs v-if="!isMobile" v-model="activeTab" :items="items" orientation="vertical" variant="link"
            :content="false" :ui="tabUi" />
        <div class="flex-1 flex flex-col min-h-0 relative">
            <!-- ADMIN -->
            <div v-if="activeTab === 'admin'" class="space-y-6 animate-fade-in w-full">
                <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                    <div
                        class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                        <UIcon name="i-lucide-shield-alert" class="size-6 text-primary" />
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Super Admin</h3>
                        <p class="text-sm text-neutral-500">Global configurations, KPI tracking, and cross-workspace
                            management.</p>
                    </div>
                </div>

                <UCard variant="subtle">
                    <template #header>
                        <h4 class="font-bold flex items-center gap-2">
                            <UIcon name="i-lucide-bar-chart-3" class="text-primary size-5" /> Monitoring System KPIs
                        </h4>
                    </template>
                    <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                        <li class="pl-2">Navigate to <UBadge variant="soft">Admin</UBadge> &gt; <UBadge variant="soft">
                                Dashboard</UBadge> in
                            the sidebar.</li>
                        <li class="pl-2">View real-time metrics including Active Users, MRR, New Signups, and Server
                            Load.</li>
                        <li class="pl-2">Use the interactive charts to analyze performance trends across different
                            workspaces.</li>
                    </ol>
                </UCard>

                <UCard variant="subtle">
                    <template #header>
                        <h4 class="font-bold flex items-center gap-2">
                            <UIcon name="i-lucide-users" class="text-primary size-5" /> Organization Management
                        </h4>
                    </template>
                    <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                        <li class="pl-2">Navigate to <UBadge variant="soft">Admin</UBadge> &gt; <UBadge variant="soft">
                                User Directory
                            </UBadge>.</li>
                        <li class="pl-2">Add new organization members or edit existing profiles.</li>
                        <li class="pl-2">Assign appropriate system roles (Manager, Billing, Editor) to control
                            access
                            via the Role-Based
                            Access Control matrix.</li>
                    </ol>
                </UCard>
            </div>

            <!-- MANAGER -->
            <div v-else-if="activeTab === 'manager'" class="space-y-6 animate-fade-in w-full">
                <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                    <div
                        class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                        <UIcon name="i-lucide-briefcase" class="size-6 text-primary" />
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Manager</h3>
                        <p class="text-sm text-neutral-500">Overseeing projects, tracking milestones, and analyzing
                            team
                            performance.</p>
                    </div>
                </div>

                <UCard variant="subtle">
                    <template #header>
                        <h4 class="font-bold flex items-center gap-2">
                            <UIcon name="i-lucide-folder-plus" class="text-primary size-5" /> Creating a Project
                        </h4>
                    </template>
                    <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                        <li class="pl-2">Navigate to <UBadge variant="soft">Projects</UBadge> &gt; <UBadge
                                variant="soft">
                                Directory</UBadge>
                            .</li>
                        <li class="pl-2">Click <UButton size="xs" icon="i-lucide-plus"
                                class="pointer-events-none align-middle mx-1">New
                                Project</UButton> to open the creation modal.</li>
                        <li class="pl-2">Set the project parameters, deadlines, and assign team members.</li>
                        <li class="pl-2">Confirm creation. The system will automatically generate the default task
                            boards.</li>
                    </ol>
                </UCard>

                <UCard variant="subtle">
                    <template #header>
                        <h4 class="font-bold flex items-center gap-2">
                            <UIcon name="i-lucide-file-text" class="text-primary size-5" /> Generating Analytics
                            Reports
                        </h4>
                    </template>
                    <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                        <li class="pl-2">Navigate to the <UBadge variant="soft">Analytics Dashboard</UBadge>.</li>
                        <li class="pl-2">Filter data by specific date ranges and project tags.</li>
                        <li class="pl-2">Review task completion velocity and resource allocation charts.</li>
                        <li class="pl-2">Click <UButton size="xs" color="primary"
                                class="pointer-events-none align-middle mx-1">
                                Export
                                Report</UButton> to download as a PDF or CSV file.</li>
                    </ol>
                    <UAlert title="Automated Reporting"
                        description="You can schedule reports to be delivered to your inbox automatically via the Automation Engine."
                        icon="i-lucide-send" color="info" variant="soft" class="mt-6" />
                </UCard>
            </div>

            <!-- BILLING -->
            <div v-else-if="activeTab === 'billing'" class="space-y-6 animate-fade-in w-full">
                <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                    <div
                        class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                        <UIcon name="i-lucide-receipt" class="size-6 text-primary" />
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Billing Admin</h3>
                        <p class="text-sm text-neutral-500">Managing subscriptions, usage charges, and invoices.</p>
                    </div>
                </div>

                <UCard variant="subtle">
                    <template #header>
                        <h4 class="font-bold flex items-center gap-2">
                            <UIcon name="i-lucide-shopping-cart" class="text-primary size-5" /> Managing
                            Subscriptions
                        </h4>
                    </template>
                    <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                        <li class="pl-2">Navigate to <UBadge variant="soft">Billing</UBadge> &gt; <UBadge
                                variant="soft">
                                Subscriptions
                            </UBadge>.</li>
                        <li class="pl-2">Select the active plan for the workspace.</li>
                        <li class="pl-2">Use the <strong>Change Plan</strong> action to upgrade or downgrade tiers.
                        </li>
                        <li class="pl-2">The system automatically calculates prorated charges.</li>
                    </ol>
                </UCard>

                <UCard variant="subtle">
                    <template #header>
                        <h4 class="font-bold flex items-center gap-2">
                            <UIcon name="i-lucide-credit-card" class="text-primary size-5" /> Processing Payments
                        </h4>
                    </template>
                    <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                        <li class="pl-2">Inside the <UBadge variant="soft">Invoices</UBadge> tab, locate unpaid
                            invoices.</li>
                        <li class="pl-2">Click <UButton size="xs" color="success"
                                class="pointer-events-none align-middle mx-1">
                                Pay Now
                            </UButton>.</li>
                        <li class="pl-2">Enter the payment method or confirm the default card on file.</li>
                        <li class="pl-2">Once processed, the invoice status updates to <UBadge variant="subtle"
                                color="success">
                                Paid
                            </UBadge>.</li>
                    </ol>
                </UCard>
            </div>

            <!-- EDITOR -->
            <div v-else-if="activeTab === 'editor'" class="space-y-6 animate-fade-in w-full">
                <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                    <div
                        class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                        <UIcon name="i-lucide-edit-3" class="size-6 text-primary" />
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Editor</h3>
                        <p class="text-sm text-neutral-500">Executing tasks, logging time, and collaborating on
                            content.
                        </p>
                    </div>
                </div>

                <UCard variant="subtle">
                    <template #header>
                        <h4 class="font-bold flex items-center gap-2">
                            <UIcon name="i-lucide-check-circle" class="text-primary size-5" /> Task Workflow
                        </h4>
                    </template>
                    <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                        <li class="pl-2">Navigate to the <UBadge variant="soft">My Tasks</UBadge> Dashboard.</li>
                        <li class="pl-2">Select a task from the <UBadge variant="subtle" color="warning">To Do
                            </UBadge>
                            column.</li>
                        <li class="pl-2">Drag the task to <UBadge variant="subtle" color="primary">In Progress
                            </UBadge>
                            when you start
                            working on it.</li>
                        <li class="pl-2">Once completed, mark the task as <UBadge variant="subtle" color="success">
                                Done
                            </UBadge>.</li>
                        <li class="pl-2">Project Managers will automatically be notified of your progress.</li>
                    </ol>
                </UCard>
            </div>

            <!-- SIMULATION -->
            <div v-else-if="activeTab === 'simulation'" class="space-y-6 animate-fade-in w-full">
                <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                    <div
                        class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                        <UIcon name="i-lucide-bot" class="size-6 text-primary" />
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">Automation Engine</h3>
                        <p class="text-sm text-neutral-500">Automated event generation for workflows and system
                            triggers.</p>
                    </div>
                </div>

                <UCard variant="subtle">
                    <template #header>
                        <h4 class="font-bold flex items-center gap-2">
                            <UIcon name="i-lucide-play" class="text-primary size-5" /> Configuring Automations
                        </h4>
                    </template>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        The Automation Engine can be configured to generate activities or handle repetitive actions
                        in
                        the background.
                    </p>
                    <ol class="space-y-4 list-decimal list-outside ml-4 text-sm text-neutral-700 dark:text-neutral-300">
                        <li class="pl-2">Open the <UBadge variant="soft">Automation Panel</UBadge> from the sidebar.
                        </li>
                        <li class="pl-2">Define trigger rules and set probability weights for randomized mock data
                            generation (if using the
                            seeder).</li>
                        <li class="pl-2">Use the Transport Controls to <strong>Start</strong>,
                            <strong>Pause</strong>,
                            or
                            <strong>Step</strong> through the event loop.
                        </li>
                        <li class="pl-2">Watch the real-time activity log feed to observe automated actions like
                            task
                            assignments and
                            notifications.</li>
                        <li class="pl-2">Click <strong>Reset</strong> to halt the engine and clear all generated
                            mock
                            data.</li>
                    </ol>
                    <UAlert title="Reactivity Showcase"
                        description="While the seeder is running, try opening the Dashboard or Projects view in a separate window. You will see metrics updating and new items appearing in real-time."
                        icon="i-lucide-zap" color="primary" variant="soft" class="mt-6" />
                </UCard>
            </div>
        </div>
    </UContainer>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
