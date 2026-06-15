<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { TabsItem } from '@nuxt/ui'

// --- Page Meta ---
definePageMeta({
    layout: false,
    title: 'Platform Documentation'
})

// --- Static Data ---
const items: TabsItem[] = [
    { value: 'overview', label: 'Overview & Users', icon: 'i-lucide-book-open' },
    { value: 'modules', label: 'Functional Modules', icon: 'i-lucide-layers' },
    { value: 'workflows', label: 'Flows & Integrations', icon: 'i-lucide-git-commit' },
    { value: 'technical', label: 'Architecture & Data', icon: 'i-lucide-cpu' },
    { value: 'design', label: 'Design System', icon: 'i-lucide-palette' }
]

const modulesData = [
    {
        id: 1,
        title: 'Administration',
        icon: 'i-lucide-shield-alert',
        color: 'purple',
        desc: 'Centralized dashboard for system administrators to oversee the entire platform operations, manage users, and configure settings.',
        features: [
            'Dashboard with KPIs (Active Users, MRR, Server Load)',
            'User Management with Role-Based Access Control',
            'Global System Settings Configuration',
            'Audit Logging and Security Controls'
        ],
        examples: ['KPI Dashboard', 'User Manager', 'System Settings', 'Audit Logs']
    },
    {
        id: 2,
        title: 'Project Management',
        icon: 'i-lucide-folder-kanban',
        color: 'blue',
        desc: 'The operational heart for day-to-day activities including task tracking, milestone planning, and resource allocation.',
        features: [
            'Interactive Kanban Boards and Gantt Charts',
            'Create and manage Projects and Tasks',
            'Time tracking and resource management',
            'Comprehensive reporting and export capabilities'
        ],
        validations: [
            'Resource overallocation checks',
            'Required task fields and dependencies',
            'Milestone deadline validation'
        ]
    },
    {
        id: 3,
        title: 'Billing & Invoicing',
        icon: 'i-lucide-receipt',
        color: 'emerald',
        desc: 'Comprehensive billing management system handling subscriptions, usage-based charges, and invoice generation.',
        features: [
            'Subscription Management Dashboard',
            'Automated recurring billing and proration',
            'Process payments across multiple methods',
            'Generate professional PDF Invoices'
        ],
        models: ['Subscription Plans', 'Metered Usage', 'Invoice Ledger']
    },
    {
        id: 4,
        title: 'Analytics Engine',
        icon: 'i-lucide-bar-chart-3',
        color: 'amber',
        desc: 'Real-time data visualization and custom reporting to drive business intelligence.',
        features: [
            'Customizable visualization widgets',
            'Scheduled automated reports',
            'Data export to various formats',
            'Predictive analytics and trend forecasting'
        ],
        flow: 'Data Collection ➔ Processing Pipeline ➔ Visualization ➔ Automated Delivery'
    },
    {
        id: 5,
        title: 'Automation Rules',
        icon: 'i-lucide-bot',
        color: 'pink',
        desc: 'A powerful automation engine that triggers actions based on configurable conditions.',
        features: [
            'Visual workflow builder for no-code automation',
            'Webhooks and external API integrations',
            'Scheduled recurring tasks',
            'Action and condition branching'
        ],
        channels: [
            { name: 'Email Notifications', desc: 'Automated email alerts based on trigger conditions.' },
            { name: 'System State Updates', desc: 'Direct state mutations mimicking user interactions.' }
        ]
    }
]

const userJourney = [
    { title: 'Sign Up & Onboarding', desc: 'New user creates an account, completes the onboarding flow, and sets up their initial workspace.' },
    { title: 'Workspace Configuration', desc: 'User invites team members, sets up roles and permissions, and configures project settings.' },
    { title: 'Task Execution', desc: 'Team members create tasks, update statuses, log time, and collaborate within projects.' },
    { title: 'Reporting & Analytics', desc: 'Managers review project progress, analyze team performance, and generate status reports.' },
    { title: 'Billing & Upgrades', desc: 'Organization owner manages subscription plan, reviews invoices, and upgrades capacity as needed.' },
    { title: 'Account Maintenance', desc: 'Ongoing management of users, security settings, and automated workflows.' }
]

const integrations = [
    { name: 'Pinia Stores', key: 'State Management', action: 'Centralized, reactive state for Workspaces, Users, Projects, Tasks, and Settings replacing a traditional database for the frontend MVP.' },
    { name: 'Chart.js', key: 'vue-chartjs', action: 'Renders dynamic Doughnut and Bar charts in the Analytics Dashboard for performance metrics.' },
    { name: 'Mock Seeder', key: 'Background Tasks', action: 'Internal engine that populates the stores with realistic demo data for presentation purposes.' }
]

const integrationColumns = [
    { accessorKey: 'name', header: 'Internal Subsystem' },
    { accessorKey: 'key', header: 'Technology / Module' },
    { accessorKey: 'action', header: 'Functional Role' }
]

const architectureLayers = [
    { name: 'Presentation Layer', desc: 'Nuxt 3, Vue 3, Nuxt UI v4. Responsible for rendering the interactive dashboard, modules, and real-time state visualization.', icon: 'i-lucide-layout', color: 'blue' },
    { name: 'Application Logic', desc: 'Pinia Stores & Vue Composables. Manages client state, RBAC authentication, and orchestrates domain actions.', icon: 'i-lucide-cpu', color: 'emerald' },
    { name: 'Domain Services', desc: 'Core business rules. Contains the validation logic and workflow orchestrators.', icon: 'i-lucide-briefcase', color: 'amber' },
    { name: 'Persistence Mock', desc: 'Local mock data generation (useDemoSeeder) and dynamic procedural data seeding for rapid frontend development.', icon: 'i-lucide-database', color: 'purple' }
]

const dataModels = [
    { entity: 'User', fields: ['id', 'name', 'email', 'password', 'role'], relation: 'System Accounts (RBAC)' },
    { entity: 'Organization', fields: ['id', 'name', 'billingEmail', 'planType', 'status'], relation: 'Core Entity' },
    { entity: 'Project', fields: ['id', 'name', 'description', 'organizationId', 'status', 'dueDate'], relation: 'Belongs to Organization' },
    { entity: 'Task', fields: ['id', 'title', 'projectId', 'assigneeId', 'status', 'priority'], relation: 'Links Project & User' },
    { entity: 'Invoice', fields: ['id', 'invoiceNumber', 'organizationId', 'issueDate', 'status', 'total'], relation: 'Billing Ledger' },
    { entity: 'Subscription', fields: ['id', 'organizationId', 'planId', 'startDate', 'endDate', 'status'], relation: 'Belongs to Organization' },
    { entity: 'Notification', fields: ['id', 'userId', 'message', 'type', 'isRead', 'createdAt'], relation: 'Belongs to User' }
]

const personas = [
    {
        role: 'Super Admin',
        icon: 'i-lucide-shield',
        color: 'purple',
        label: 'Platform Manager',
        tasks: [
            'Oversee system KPIs',
            'Manage all users and roles',
            'Configure global system settings'
        ]
    },
    {
        role: 'Manager',
        icon: 'i-lucide-briefcase',
        color: 'blue',
        label: 'Team Leader',
        tasks: [
            'Manage projects and tasks',
            'Review team performance',
            'Generate analytics reports'
        ]
    },
    {
        role: 'Billing Admin',
        icon: 'i-lucide-receipt',
        color: 'emerald',
        label: 'Financial Controller',
        tasks: [
            'Monitor subscriptions',
            'Process payments and invoices',
            'Review billing history'
        ]
    },
    {
        role: 'Editor',
        icon: 'i-lucide-edit-3',
        color: 'amber',
        label: 'Standard User',
        tasks: [
            'Execute assigned tasks',
            'Update progress statuses',
            'Collaborate with team members'
        ]
    }
] as any

// --- Reactive State ---
const isScrolled = ref(false)
const isMobile = ref(false)
const activeTab = ref('overview')
const open = ref(false)

const tabUi = {
    root: 'items-start',
    list: 'gap-1 sticky top-20 h-fit'
}

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
            <UBadge label="Documentation" icon="i-lucide-book" variant="subtle" color="primary" size="lg"
                class="rounded-full px-3 py-1.5 w-fit" />
            <div class="flex flex-col gap-3 mt-6">
                <h1 class="text-3xl sm:text-5xl text-pretty font-bold text-highlighted">
                    Platform <span class="text-primary-600 dark:text-primary-400">Documentation</span>
                </h1>
                <p class="text-lg text-pretty text-primary-600 dark:text-primary-700 font-light">
                    A comprehensive SaaS platform centralizing Administration, Project Management, Billing, and
                    Analytics into one unified application.
                </p>
            </div>
        </UContainer>
        <BackgroundGrid bg-color="bg-primary-50 dark:bg-primary-950/50" />
    </div>

    <!-- ── Fixed Mini-Navbar (Slides in smoothly on scroll, zero layout shift) ── -->
    <div class="fixed top-0 left-0 right-0 z-40 border-b border-default bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out"
        :class="isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'">
        <UContainer class="py-3 flex items-center justify-between">
            <h1 class="flex items-center gap-2">
                <UIcon name="i-lucide-book" class="text-primary size-6 shrink-0" />
                <span class="text-lg font-bold text-highlighted leading-none">Platform <span
                        class="text-primary-600 dark:text-primary-400">Documentation</span></span>
            </h1>
            <div class="flex items-center">
                <UColorModeButton color="primary" class="cursor-pointer hover:scale-105 transition-transform" />
                <UButton v-if="isMobile" icon="i-lucide-menu" variant="ghost" aria-label="Toggle sidebar"
                    @click="open = !open" />
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
            <!-- OVERVIEW & USERS -->
            <div v-if="activeTab === 'overview'" class="space-y-12 animate-fade-in w-full">
                <!-- Core Purpose Card -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-6">
                        <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                            <div
                                class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                                <UIcon name="i-lucide-focus" class="size-6 text-primary" />
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Core Purpose</h2>
                                <p class="text-sm text-neutral-500">Why this platform exists and what it solves.</p>
                            </div>
                        </div>
                        <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            The SaaS Platform replaces fragmented business software by uniting core operational
                            departments. From onboarding a user to managing projects and processing billing, data
                            flows seamlessly between roles in real-time.
                        </p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            <UCard variant="soft" v-for="(item, idx) in [
                                'Centralized Data Architecture',
                                'Role-Based Access Control',
                                'Real-time Data Sync',
                                'Integrated Billing Engine',
                                'Automated Workflows',
                                'Modern, Responsive UI'
                            ]" :key="idx" :ui="{ body: 'flex gap-2' }">
                                <UIcon name="i-lucide-check-circle" class="size-5 text-primary-500 shrink-0" />
                                <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ item
                                }}</span>
                            </UCard>
                        </div>
                    </div>

                    <!-- Business Value Stats -->
                    <UCard variant="subtle" :ui="{ body: 'flex flex-col gap-6' }"
                        class="bg-primary/5 dark:bg-primary-950/20 ring-primary-200 dark:ring-primary-800/50 rounded-2xl h-fit">
                        <h3 class="font-bold leading-none flex items-center gap-2">
                            <UIcon name="i-lucide-trending-up" class="text-primary size-5" />
                            Business Value
                        </h3>
                        <div class="space-y-5">
                            <div>
                                <div
                                    class="flex justify-between text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1.5">
                                    <span>OPERATIONAL EFFICIENCY</span>
                                    <span class="text-info-600 dark:text-info-400 font-bold">+85%</span>
                                </div>
                                <UProgress :model-value="85" color="info" size="sm" />
                            </div>
                            <div>
                                <div
                                    class="flex justify-between text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1.5">
                                    <span>BILLING ACCURACY</span>
                                    <span class="text-success-600 dark:text-success-400 font-bold">100%</span>
                                </div>
                                <UProgress :model-value="100" color="success" size="sm" />
                            </div>
                            <div>
                                <div
                                    class="flex justify-between text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1.5">
                                    <span>ONBOARDING TIME REDUCTION</span>
                                    <span class="text-warning-600 dark:text-warning-400 font-bold">-70%</span>
                                </div>
                                <UProgress :model-value="70" color="warning" size="sm" />
                            </div>
                        </div>
                    </UCard>
                </div>

                <!-- Primary User Personas -->
                <div class="space-y-6">
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <div
                            class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-users" class="size-6 text-primary" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Primary User Personas
                            </h2>
                            <p class="text-sm text-neutral-500">Roles interacting with the system.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <UCard v-for="(persona, pIdx) in personas" :key="pIdx" variant="subtle"
                            class="shadow-sm transition-colors" :class="`hover:border-${persona.color}-500/30`">
                            <div class="p-2.5 rounded-xl w-fit mb-4"
                                :class="`bg-${persona.color}-500/10 text-${persona.color}-500`">
                                <UIcon :name="persona.icon" class="size-6 shrink-0 flex" />
                            </div>
                            <h3 class="font-bold text-base text-neutral-900 dark:text-white mb-2">{{ persona.role }}
                            </h3>
                            <ul class="text-sm text-neutral-500 dark:text-neutral-400 space-y-1.5 list-disc pl-4 mb-4">
                                <li v-for="(task, tIdx) in persona.tasks" :key="tIdx">{{ task }}</li>
                            </ul>
                            <UBadge :color="persona.color" variant="subtle" size="sm" :label="persona.label" />
                        </UCard>
                    </div>
                </div>
            </div>

            <!-- FUNCTIONAL MODULES -->
            <div v-else-if="activeTab === 'modules'" class="space-y-6 animate-fade-in w-full">
                <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <div
                        class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                        <UIcon name="i-lucide-layers" class="size-6 text-primary" />
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Core Submodule Modules</h2>
                        <p class="text-sm text-neutral-500">Distinct engines processing different segments of
                            platform operations.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <UCard v-for="mod in modulesData" :key="mod.id" variant="subtle"
                        :ui="{ body: 'flex flex-col h-full gap-4 relative overflow-hidden' }"
                        class="group hover:-translate-y-1 transition-transform">
                        <!-- Background color glow -->
                        <div class="absolute -top-24 -right-24 size-60 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-3xl"
                            :class="`bg-${mod.color}-500`" />

                        <!-- Header -->
                        <div class="flex items-start gap-3">
                            <div class="p-2 rounded-xl shrink-0"
                                :class="`bg-${mod.color}-500/10 text-${mod.color}-500`">
                                <UIcon :name="mod.icon" class="size-6 shrink-0 flex" />
                            </div>
                            <h3 class="font-bold text-lg mt-1 transition-colors"
                                :class="`group-hover:text-${mod.color}-500`">
                                {{ mod.title }}
                            </h3>
                        </div>

                        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {{ mod.desc }}
                        </p>

                        <!-- Features -->
                        <div v-if="mod.features" class="space-y-1.5 mt-2">
                            <span class="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">Key
                                Capabilities</span>
                            <div v-for="(feat, fIdx) in mod.features" :key="fIdx"
                                class="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                                <UIcon name="i-lucide-check" class="size-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{{ feat }}</span>
                            </div>
                        </div>

                        <!-- Context Data (Validations, Flows, Models, Channels) -->
                        <div class="mt-auto pt-4 flex flex-col gap-3">
                            <div v-if="mod.validations">
                                <span
                                    class="text-[10px] font-bold text-orange-500 uppercase tracking-wider block mb-1">Validation
                                    Checks</span>
                                <div class="flex flex-wrap gap-1.5">
                                    <UBadge v-for="val in mod.validations" :key="val" variant="soft" color="orange"
                                        size="sm">{{ val }}</UBadge>
                                </div>
                            </div>

                            <div v-if="mod.flow">
                                <span
                                    class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Operational
                                    Flow</span>
                                <div
                                    class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-primary-600 dark:text-primary-400 leading-relaxed break-words">
                                    {{ mod.flow }}
                                </div>
                            </div>

                            <div v-if="mod.models">
                                <span
                                    class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Frameworks</span>
                                <div class="flex flex-wrap gap-1.5">
                                    <UBadge v-for="m in mod.models" :key="m" variant="soft" color="neutral" size="sm">{{
                                        m }}</UBadge>
                                </div>
                            </div>

                            <div v-if="mod.examples">
                                <span
                                    class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Standard
                                    Tools</span>
                                <div class="flex flex-wrap gap-1.5">
                                    <UBadge v-for="ex in mod.examples" :key="ex" variant="soft" color="neutral"
                                        size="sm">{{ ex }}</UBadge>
                                </div>
                            </div>

                            <div v-if="mod.channels" class="space-y-2">
                                <span
                                    class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Available
                                    Outlets</span>
                                <div v-for="ch in mod.channels" :key="ch.name"
                                    class="flex flex-col gap-2 bg-white dark:bg-neutral-900 p-2 rounded-lg border border-default shadow-sm">
                                    <div class="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 shrink-0">
                                        {{ ch.name }}:</div>
                                    <div class="text-[11px] text-neutral-500 dark:text-neutral-400">{{ ch.desc }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>

            <!-- FLOWS & INTEGRATIONS -->
            <div v-else-if="activeTab === 'workflows'" class="space-y-12 animate-fade-in w-full">

                <div class="space-y-6">
                    <!-- Interactive Employee Journey -->
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <div
                            class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-activity" class="size-6 text-primary" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">End-to-End User Journey
                            </h2>
                            <p class="text-sm text-neutral-500">How a user moves through the lifecycle of the
                                platform.</p>
                        </div>
                    </div>
                    <!-- Vertical Timeline Layout -->
                    <div
                        class="relative pl-10 space-y-5 before:absolute before:left-[15px] before:top-6 before:bottom-16 before:w-[2px] before:bg-gradient-to-b before:from-primary-500/60 before:via-primary-300/40 before:to-primary-500/10 before:rounded-full">
                        <div v-for="(step, sIdx) in userJourney" :key="sIdx" class="relative group">
                            <!-- Outer glow ring -->
                            <div
                                class="absolute left-[-40px] top-[17px] size-8 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 group-hover:scale-125 transition-all duration-300" />
                            <!-- Indicator Bubble -->
                            <span
                                class="absolute left-[-35px] top-[22px] size-[22px] rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-primary-500/30 group-hover:shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300 ring-2 ring-white dark:ring-neutral-800 z-10">
                                {{ sIdx + 1 }}
                            </span>
                            <UCard variant="subtle"
                                class="w-full group-hover:border-primary-500/30 group-hover:shadow-md group-hover:shadow-primary-500/5 transition-all duration-300">
                                <div class="flex items-center gap-2 mb-1">
                                    <h3 class="font-bold group-hover:text-primary transition-colors duration-200">{{
                                        step.title }}</h3>
                                    <UBadge :label="`Step ${sIdx + 1}`" variant="soft"
                                        class="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                                <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{{
                                    step.desc }}</p>
                            </UCard>
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <!-- Integration Matrix -->
                    <div class="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                            <div
                                class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                                <UIcon name="i-lucide-git-commit" class="size-6 text-primary" />
                            </div>
                            <div>
                                <div>Core Ecosystem</div>
                                <div class="text-sm text-neutral-500 font-normal">Technologies linking the
                                    operations together.</div>
                            </div>
                        </h2>
                    </div>

                    <UTable :data="integrations" :columns="integrationColumns"
                        class="w-full ring ring-default rounded-xl shadow-sm overflow-hidden">
                        <template #name-cell="{ row }">
                            <span class="font-bold text-default whitespace-nowrap">{{ row.original.name }}</span>
                        </template>
                        <template #key-cell="{ row }">
                            <UBadge variant="soft" class="font-mono whitespace-nowrap">{{ row.original.key }}
                            </UBadge>
                        </template>
                        <template #action-cell="{ row }">
                            <div class="leading-relaxed text-xs whitespace-normal break-words">
                                {{ row.original.action }}
                            </div>
                        </template>
                    </UTable>
                </div>
            </div>


            <!-- ARCHITECTURE & DATA -->
            <div v-else-if="activeTab === 'technical'" class="space-y-12 animate-fade-in w-full">

                <!-- System Architecture Stack -->
                <div class="space-y-6">
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <div
                            class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-layers" class="size-6 text-primary" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">System Architecture
                                Stack</h2>
                            <p class="text-sm text-neutral-500">The 4-tier design pattern separating UI concerns
                                from core business logic.</p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-4">
                        <UCard v-for="(layer, lIdx) in architectureLayers" :key="lIdx" variant="subtle"
                            class="group transition-transform duration-300 shadow-sm relative overflow-hidden">
                            <div class="flex items-center gap-4">
                                <div class="p-3 rounded-xl bg-gradient-to-b"
                                    :class="`from-${layer.color}-400 to-${layer.color}-600`">
                                    <UIcon :name="layer.icon" class="size-6 shrink-0 flex text-white" />
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-bold text-lg">{{ layer.name }}</h3>
                                    <p class="text-sm text-muted">{{ layer.desc }}</p>
                                </div>
                            </div>
                        </UCard>
                    </div>
                </div>

                <!-- Core Data Entities -->
                <div class="space-y-6">
                    <div class="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                            <div
                                class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                                <UIcon name="i-lucide-database" class="size-6 text-primary" />
                            </div>
                            <div>
                                <div>Core Data Entities</div>
                                <div class="text-sm text-neutral-500 font-normal">The relational structure powering
                                    the internal state machine.</div>
                            </div>
                        </h2>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <UCard v-for="model in dataModels" :key="model.entity"
                            :ui="{ root: 'flex flex-col', header: 'bg-muted flex items-center justify-between w-full', body: 'flex-1', footer: 'bg-muted font-mono text-center text-xs' }"
                            class="shadow-sm">
                            <template #header>
                                <span
                                    class="font-mono font-bold text-sm text-neutral-900 dark:text-white group-hover:text-primary transition-colors">{{
                                        model.entity }}</span>
                                <UIcon name="i-lucide-braces" class="text-neutral-400 size-4" />
                            </template>
                            <span class="text-xs font-dimmed uppercase tracking-wider block mb-2">Schema
                                Fields</span>
                            <div class="flex flex-wrap gap-1.5 mb-4">
                                <UBadge v-for="field in model.fields" :key="field" variant="subtle" color="neutral"
                                    class="font-mono">{{ field }}
                                </UBadge>
                            </div>
                            <template #footer>
                                {{ model.relation }}
                            </template>
                        </UCard>
                    </div>
                </div>

            </div>

            <!-- DESIGN SYSTEM -->
            <div v-else-if="activeTab === 'design'" class="space-y-12 animate-fade-in w-full">

                <!-- Colors -->
                <div class="space-y-6">
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <div
                            class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-palette" class="size-6 text-primary" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Color Palette</h2>
                            <p class="text-sm text-neutral-500">Semantic colors used throughout the application.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <UCard variant="subtle" :ui="{ root: 'divide-y-0', header: 'p-0 sm:p-0' }" class="shadow-sm">
                            <template #header>
                                <div class="h-20 bg-primary-500 w-full"></div>
                            </template>
                            <h3 class="font-bold">Primary</h3>
                            <p class="text-xs text-muted mt-1">Main brand color, interactive elements, primary
                                buttons.</p>
                        </UCard>
                        <UCard variant="subtle" :ui="{ root: 'divide-y-0', header: 'p-0 sm:p-0' }" class="shadow-sm">
                            <template #header>
                                <div class="h-20 bg-success-500 w-full"></div>
                            </template>
                            <h3 class="font-bold">Success</h3>
                            <p class="text-xs text-muted mt-1">Active states, successful actions, confirmed states.
                            </p>
                        </UCard>
                        <UCard variant="subtle" :ui="{ root: 'divide-y-0', header: 'p-0 sm:p-0' }" class="shadow-sm">
                            <template #header>
                                <div class="h-20 bg-warning-500 w-full"></div>
                            </template>
                            <h3 class="font-bold">Warning</h3>
                            <p class="text-xs text-muted mt-1">Pending states, warnings, required actions.</p>
                        </UCard>
                        <UCard variant="subtle" :ui="{ root: 'divide-y-0', header: 'p-0 sm:p-0' }" class="shadow-sm">
                            <template #header>
                                <div class="h-20 bg-error-500 w-full"></div>
                            </template>
                            <h3 class="font-bold">Error</h3>
                            <p class="text-xs text-muted mt-1">Destructive actions, critical errors, failure states.
                            </p>
                        </UCard>
                    </div>
                </div>

                <!-- Typography -->
                <div class="space-y-6">
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <div
                            class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-type" class="size-6 text-primary" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Typography</h2>
                            <p class="text-sm text-neutral-500">Fonts used for the user interface.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <UCard variant="subtle">
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="font-bold">Geist Sans</h3>
                                <UBadge variant="subtle" color="neutral">Sans-serif</UBadge>
                            </div>
                            <p class="text-2xl font-sans text-neutral-900 dark:text-white mb-2">The quick brown fox
                                jumps over the lazy
                                dog</p>
                            <p class="text-sm text-muted">Used for all general UI elements, headings, and paragraph
                                text.</p>
                        </UCard>
                        <UCard variant="subtle">
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="font-bold">Geist Mono</h3>
                                <UBadge variant="subtle" color="neutral">Monospace</UBadge>
                            </div>
                            <p class="text-lg font-mono text-neutral-900 dark:text-white mb-2">import { useDataStore
                                } from '~/stores'
                            </p>
                            <p class="text-sm text-muted">Used for code snippets, identifiers, and technical data.
                            </p>
                        </UCard>
                    </div>
                </div>

                <!-- Components -->
                <div class="space-y-6">
                    <div class="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <div
                            class="size-12 rounded-2xl flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary">
                            <UIcon name="i-lucide-component" class="size-6 text-primary" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Core UI Components</h2>
                            <p class="text-sm text-neutral-500">Standardized elements used to build views.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <UCard v-for="(comp, cIdx) in [
                            { name: 'AppNavbar', desc: 'Top navigation bar with role badge and actions' },
                            { name: 'KpiCard', desc: 'Stat card displaying labels, values, and trend indicators' },
                            { name: 'StatusBadge', desc: 'Color-coded pill for item statuses' },
                            { name: 'DataTable', desc: 'Sortable, filterable table component for entity lists' },
                            { name: 'DatePicker', desc: 'Custom date selection wrapper' },
                            { name: 'UserAvatar', desc: 'Visual representation of users' },
                            { name: 'ItemBadge', desc: 'Colored circular badge displaying numbers or identifiers' },
                            { name: 'CurrencyDisplay', desc: 'Formatted currency amounts' }
                        ]" :key="cIdx" variant="soft" class="shadow-sm">
                            <h3 class="font-bold text-sm mb-1 font-mono text-primary">{{ comp.name }}</h3>
                            <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ comp.desc }}</p>
                        </UCard>
                    </div>
                </div>
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