<script setup lang="ts">
// ============================================================================
// Page Configuration
// ============================================================================
definePageMeta({
    title: 'Card Variants'
})

// ============================================================================
// Mock Data: Dashboard & Analytics
// ============================================================================
const stats = [
    { label: 'Total Users', value: '12,453', change: '+12%', icon: 'i-lucide-users', color: 'primary' },
    { label: 'Revenue', value: '$45,231', change: '+8%', icon: 'i-lucide-dollar-sign', color: 'success' },
    { label: 'Active Sessions', value: '1,204', change: '-3%', icon: 'i-lucide-activity', color: 'warning' },
    { label: 'Pending Tasks', value: '42', change: '+5%', icon: 'i-lucide-clock', color: 'error' }
] as const

const healthMetrics = [
    { label: 'CPU Usage', value: 42, color: 'primary', status: 'Healthy' },
    { label: 'Memory', value: 78, color: 'warning', status: 'High' },
    { label: 'Disk Space', value: 15, color: 'success', status: 'Optimal' }
] as const

const logs = [
    { time: '14:22:01', level: 'INFO', msg: 'Agent "Core-1" initialized successfully' },
    { time: '14:22:05', level: 'WARN', msg: 'Latency spike detected in US-EAST-1' },
    { time: '14:22:08', level: 'INFO', msg: 'Scaling group triggered: +2 nodes' }
] as const

const latencyHistory = [40, 45, 38, 42, 65, 82, 44, 39, 41, 38, 35, 40] as const

// ============================================================================
// Mock Data: Business & Financials
// ============================================================================
const plans = [
    { name: 'Starter', price: '$0', features: ['3 Projects', 'Basic Analytics', 'Community Support'], recommended: false },
    { name: 'Professional', price: '$29', features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domains'], recommended: true },
    { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'SLA Guarantee', 'Dedicated Manager', 'Custom Integration'], recommended: false }
] as const

const receiptItems = [
    { label: 'Pro Plan Monthly', price: '$29.00' },
    { label: 'Additional Storage (50GB)', price: '$5.00' },
    { label: 'Priority Support Add-on', price: '$10.00' }
] as const

const invoices = [
    { id: '#INV-8821', date: 'May 01, 2024', amount: '$44.00', status: 'Paid' },
    { id: '#INV-8742', date: 'Apr 01, 2024', amount: '$44.00', status: 'Paid' },
    { id: '#INV-8691', date: 'Mar 01, 2024', amount: '$44.00', status: 'Refunded' }
] as const

const billingUsage = [
    { label: 'Storage', used: 42, total: 100, unit: 'GB', color: 'primary' },
    { label: 'Team Members', used: 8, total: 10, unit: 'users', color: 'warning' },
    { label: 'API Calls', used: 850, total: 1000, unit: 'k', color: 'success' }
] as const

// ============================================================================
// Mock Data: Project & Tasks
// ============================================================================
const tasks = [
    { title: 'Fix Navigation Bug', priority: 'High', status: 'In Review', estimate: '2h', users: 2 },
    { title: 'Update Design System', priority: 'Medium', status: 'To Do', estimate: '8h', users: 1 },
    { title: 'API Integration', priority: 'Critical', status: 'Blocked', estimate: '4h', users: 3 },
    { title: 'Documentation Polish', priority: 'Low', status: 'To Do', estimate: '2h', users: 1 }
] as const

const files = [
    { name: 'brand_guidelines.pdf', size: '2.4 MB', type: 'pdf', icon: 'i-lucide-file-text', color: 'error' },
    { name: 'project_assets.zip', size: '156 MB', type: 'zip', icon: 'i-lucide-file-archive', color: 'warning' },
    { name: 'q4_report.xlsx', size: '842 KB', type: 'xlsx', icon: 'i-lucide-file-spreadsheet', color: 'success' }
] as const

const onboardingSteps = [
    { title: 'Create Account', status: 'completed', icon: 'i-lucide-check-circle' },
    { title: 'Setup Workspace', status: 'current', icon: 'i-lucide-circle' },
    { title: 'Invite Team', status: 'upcoming', icon: 'i-lucide-users' }
] as const

// ============================================================================
// Mock Data: Social & Content
// ============================================================================
const features = [
    { title: 'Cloud Integration', description: 'Seamlessly sync your data across all devices with our secure cloud infrastructure.', icon: 'i-lucide-cloud' },
    { title: 'Real-time Analytics', description: 'Monitor your performance metrics in real-time with our advanced dashboard.', icon: 'i-lucide-bar-chart' },
    { title: 'Team Collaboration', description: 'Collaborate with your team members efficiently using our shared workspaces.', icon: 'i-lucide-users-2' }
] as const

const activity = [
    { user: 'Sarah Chen', action: 'uploaded a new design', time: '2m ago', icon: 'i-lucide-file-up', color: 'primary' },
    { user: 'Mike Ross', action: 'completed the onboarding', time: '1h ago', icon: 'i-lucide-check-circle', color: 'success' },
    { user: 'System', action: 'backup completed successfully', time: '3h ago', icon: 'i-lucide-database', color: 'neutral' }
] as const

const events = [
    { title: 'Global AI Summit 2024', location: 'San Francisco, CA', date: 'JUN 15', time: '09:00 AM', color: 'primary' },
    { title: 'Agentic Workflow Workshop', location: 'Remote / Zoom', date: 'JUN 18', time: '11:30 AM', color: 'warning' }
] as const

const inviteUsers = [
    { name: 'Emma Wilson', role: 'Designer', avatar: 'https://i.pravatar.cc/100?u=emma', status: 'invited' },
    { name: 'Liam Neeson', role: 'Security', avatar: 'https://i.pravatar.cc/100?u=liam', status: 'none' },
    { name: 'Sophia Chen', role: 'Developer', avatar: 'https://i.pravatar.cc/100?u=sophia', status: 'none' }
] as const

const faqItems = [
    { label: 'How do I upgrade my plan?', content: 'You can upgrade your plan at any time from your account settings. Changes take effect immediately.' },
    { label: 'Can I export my data?', content: 'Yes, we support exports in CSV, JSON, and PDF formats for all your workspace data.' },
    { label: 'Is there a mobile app?', content: 'Our platform is a fully responsive PWA that works seamlessly on any mobile browser.' }
]

// ============================================================================
// Mock Data: Advanced & Experimental
// ============================================================================
const workflowNodes = [
    { id: '1', name: 'Query Expansion', type: 'Processor', status: 'active', confidence: 0.98, logs: ['Expanding terms...', 'Filtering noise...'], icon: 'i-lucide-layers' },
    { id: '2', name: 'Vector Search', type: 'Retrieval', status: 'pending', confidence: 0.85, logs: ['Connecting to DB...', 'Awaiting response'], icon: 'i-lucide-search' },
    { id: '3', name: 'LLM Reranker', type: 'Optimizer', status: 'idle', confidence: 0, logs: [], icon: 'i-lucide-brain' }
] as const

const iotDevices = [
    { name: 'Smart Thermostat', room: 'Living Room', temp: 22.5, battery: 85, status: true, color: 'primary' },
    { name: 'Air Purifier', room: 'Master Bedroom', quality: 'Excellent', filter: 92, status: false, color: 'success' },
    { name: 'Security Hub', room: 'Entryway', alerts: 0, battery: 100, status: true, color: 'error' }
] as const

const locationData = {
    address: '1600 Amphitheatre Pkwy, Mountain View, CA',
    weather: 'Sunny',
    temp: '72°F',
    coords: '37.4221° N, 122.0841° W',
    timezone: 'PST (UTC-8)'
} as const
</script>

<template>

    <!-- ==========================================================================
         Header Section
         ========================================================================== -->
    <UPageCard title="Card System"
        description="Explore the versatile card component system. From basic variants to complex dashboard widgets, these patterns ensure visual consistency across the application."
        variant="naked" class="mb-4">
        <template #footer>
            <div class="flex gap-4 text-xs font-medium text-neutral-500">
                <div class="flex items-center gap-1.5">
                    <div class="size-2 rounded-full bg-primary" /> Solid
                </div>
                <div class="flex items-center gap-1.5">
                    <div class="size-2 rounded-full bg-neutral-400" /> Outline
                </div>
                <div class="flex items-center gap-1.5">
                    <div class="size-2 rounded-full bg-primary/20" /> Soft
                </div>
            </div>
        </template>
    </UPageCard>

    <!-- ==========================================================================
         I. Foundation
         ========================================================================== -->
    <div
        class="space-y-2 relative pl-6 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary before:rounded-r-full">
        <h2 class="text-3xl font-black uppercase tracking-tighter">I. Foundation</h2>
        <p class="text-sm text-dimmed uppercase tracking-widest">Base card structures and stylistic variants</p>
    </div>

    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-box" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Base Variants</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <UCard variant="solid">
                <p class="text-sm font-medium">Solid Variant</p>
                <p class="text-xs opacity-80 mt-1">High emphasis for primary actions or highlights.</p>
            </UCard>
            <UCard variant="outline">
                <p class="text-sm font-medium">Outline Variant</p>
                <p class="text-xs text-dimmed mt-1">Subtle border for secondary information.</p>
            </UCard>
            <UCard variant="soft">
                <p class="text-sm font-medium">Soft Variant</p>
                <p class="text-xs text-primary/80 mt-1">Tinted background for categorization.</p>
            </UCard>
            <UCard variant="subtle">
                <p class="text-sm font-medium">Subtle Variant</p>
                <p class="text-xs text-dimmed mt-1">Subtle background for categorization.</p>
            </UCard>
        </div>
    </section>

    <USeparator />

    <!-- ==========================================================================
         II. Dashboard & Monitoring
         ========================================================================== -->
    <div
        class="space-y-2 relative pl-6 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary before:rounded-r-full">
        <h2 class="text-3xl font-black uppercase tracking-tighter">II. Dashboard & Monitoring</h2>
        <p class="text-sm text-dimmed uppercase tracking-widest">Analytical widgets and real-time system tracking
        </p>
    </div>

    <!-- 2. KPI / Stat Cards -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-trending-up" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Dashboard Stats</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <UCard v-for="stat in stats" :key="stat.label" variant="soft"
                class="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div class="flex items-center justify-between mb-2">
                    <UIcon :name="stat.icon" class="size-5" :class="`text-${stat.color}`" />
                    <UBadge :color="stat.change.startsWith('+') ? 'success' : 'error'" variant="subtle" size="sm"
                        class="rounded-full">
                        {{ stat.change }}
                    </UBadge>
                </div>
                <div class="text-2xl font-bold tracking-tight">{{ stat.value }}</div>
                <div class="text-xs text-dimmed font-medium uppercase tracking-wider mt-1">
                    {{ stat.label }}
                </div>
            </UCard>
        </div>
    </section>

    <!-- 3. System Health & Performance -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-activity" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">System Monitor</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <UCard v-for="metric in healthMetrics" :key="metric.label" class="relative overflow-hidden group">
                <!-- Background Glow -->
                <div :class="`bg-${metric.color}/5`"
                    class="absolute inset-0 transition-colors group-hover:bg-opacity-10" />

                <div class="relative">
                    <div class="flex justify-between items-center mb-6">
                        <div class="flex items-center gap-2">
                            <div :class="`bg-${metric.color}/20 text-${metric.color}`"
                                class="size-8 rounded-lg flex items-center justify-center">
                                <UIcon name="i-lucide-hard-drive" class="size-5" />
                            </div>
                            <span class="font-bold text-sm">{{ metric.label }}</span>
                        </div>
                        <UBadge :label="metric.status" :color="metric.color" variant="subtle" size="sm"
                            class="font-bold" />
                    </div>

                    <div class="flex items-center gap-6">
                        <div class="relative size-24 flex items-center justify-center">
                            <svg class="size-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent"
                                    class="text-neutral-100 dark:text-neutral-800" />
                                <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent"
                                    :stroke-dasharray="251.2" :stroke-dashoffset="251.2 - (251.2 * metric.value) / 100"
                                    :class="`text-${metric.color}`" class="transition-all duration-1000 ease-out" />
                            </svg>
                            <div class="absolute text-xl font-black">{{ metric.value }}%</div>
                        </div>
                        <div class="flex-1 space-y-4">
                            <div class="space-y-1">
                                <div class="flex justify-between text-[10px] font-bold uppercase text-dimmed">
                                    <span>Current Load</span>
                                    <span>Peak: 92%</span>
                                </div>
                                <UProgress :model-value="metric.value" :color="metric.color" size="sm" />
                            </div>
                            <div class="flex gap-4">
                                <div>
                                    <div class="text-xs font-bold">2.4GB</div>
                                    <div class="text-[10px] text-dimmed uppercase">Used</div>
                                </div>
                                <div class="border-l border-neutral-200 dark:border-neutral-800" />
                                <div>
                                    <div class="text-xs font-bold">12.1GB</div>
                                    <div class="text-[10px] text-dimmed uppercase">Free</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <!-- 4. Monitoring & Logs -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-monitor-dot" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Real-time Monitoring</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <!-- Latency Sparkline Card -->
            <UCard title="Network Latency" description="Avg. response time across global edge nodes.">
                <template #header>
                    <div class="flex items-baseline gap-2">
                        <span class="text-3xl font-black italic">42ms</span>
                        <span class="text-xs text-success font-bold">(-4ms)</span>
                    </div>
                </template>

                <div class="h-24 flex items-end gap-1 mb-6">
                    <div v-for="(v, i) in latencyHistory" :key="i" :style="{ height: `${v}%` }" :class="[
                        v > 60 ? 'bg-error' : v > 45 ? 'bg-warning' : 'bg-primary'
                    ]" class="flex-1 rounded-t-sm transition-all duration-500 opacity-80 hover:opacity-100" />
                </div>

                <div class="flex justify-between text-[10px] font-bold uppercase text-dimmed tracking-widest">
                    <span>12:00 PM</span>
                    <span>Now</span>
                </div>
            </UCard>

            <!-- Terminal / Log Stream Card -->
            <UCard :ui="{ body: 'p-0 sm:p-0' }" class="bg-neutral-950 border-neutral-800 overflow-hidden group">
                <template #header>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="flex gap-1.5">
                                <div class="size-2 rounded-full bg-error/50" />
                                <div class="size-2 rounded-full bg-warning/50" />
                                <div class="size-2 rounded-full bg-success/50" />
                            </div>
                            <span class="text-[10px] font-mono text-neutral-500 uppercase ml-2">system.log</span>
                        </div>
                        <UButton icon="i-lucide-terminal" variant="ghost" color="neutral" size="xs" />
                    </div>
                </template>

                <div class="p-4 font-mono text-[11px] space-y-2 max-h-48 overflow-y-auto scrollbar">
                    <div v-for="(log, i) in logs" :key="i" class="flex gap-3">
                        <span class="text-neutral-600 shrink-0">{{ log.time }}</span>
                        <span :class="[
                            log.level === 'INFO' ? 'text-success' : 'text-warning'
                        ]" class="font-bold shrink-0">[{{ log.level }}]</span>
                        <span class="text-neutral-300 truncate">{{ log.msg }}</span>
                    </div>
                    <div class="flex gap-2 items-center text-primary animate-pulse">
                        <span>$</span>
                        <div class="w-2 h-4 bg-primary" />
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <USeparator />

    <!-- ==========================================================================
         III. Business & Financials
         ========================================================================== -->
    <div
        class="space-y-2 relative pl-6 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary before:rounded-r-full">
        <h2 class="text-3xl font-black uppercase tracking-tighter">III. Business & Financials</h2>
        <p class="text-sm text-dimmed uppercase tracking-widest">Pricing tiers, billing history, and resource quotas
        </p>
    </div>

    <!-- 5. E-commerce & Pricing -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-shopping-cart" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Commerce & Subscription</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <UCard v-for="plan in plans" :key="plan.name" :class="[
                plan.recommended ? 'ring-2 ring-primary scale-105 shadow-2xl z-10' : 'opacity-90'
            ]" :ui="{ body: 'flex flex-col h-full' }">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm font-bold uppercase tracking-widest text-dimmed">{{ plan.name
                    }}</span>
                    <UBadge v-if="plan.recommended" label="Recommended" color="primary" variant="subtle" />
                </div>
                <div class="flex items-baseline gap-1 mb-6">
                    <span class="text-4xl font-black">{{ plan.price }}</span>
                    <span class="text-sm text-dimmed">/month</span>
                </div>
                <ul class="space-y-3 mb-8 flex-1">
                    <li v-for="feat in plan.features" :key="feat" class="flex items-center gap-2 text-sm">
                        <UIcon name="i-lucide-check" class="size-4 text-success" />
                        {{ feat }}
                    </li>
                </ul>
                <UButton :label="plan.recommended ? 'Get Started Now' : 'Choose Plan'"
                    :color="plan.recommended ? 'primary' : 'neutral'" :variant="plan.recommended ? 'solid' : 'outline'"
                    block size="lg" />
            </UCard>
        </div>
    </section>

    <!-- 6. Subscription & Quota -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-credit-card" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Subscription & Usage</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <!-- Payment Method Card -->
            <UCard title="Payment Method" description="Manage your credit cards and billing preferences.">
                <div
                    class="p-4 rounded-2xl border-2 border-primary bg-primary/5 dark:bg-primary/10 relative overflow-hidden group mb-6">
                    <div
                        class="absolute -right-8 -top-8 size-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <div class="relative flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div
                                class="size-12 rounded-xl bg-white dark:bg-neutral-900 shadow-sm flex items-center justify-center shrink-0 border border-neutral-100 dark:border-neutral-800">
                                <UIcon name="i-lucide-credit-card" class="size-6 text-primary" />
                            </div>
                            <div>
                                <p class="text-sm font-black italic">Visa Ending in 4242</p>
                                <p class="text-[10px] text-dimmed uppercase font-bold tracking-widest">Expires 12/26
                                    •
                                    Primary Method</p>
                            </div>
                        </div>
                        <UButton label="Edit" variant="ghost" color="neutral" size="xs" class="font-bold" />
                    </div>
                </div>
                <UButton label="Add New Payment Method" icon="i-lucide-plus" block variant="outline" color="neutral" />
            </UCard>

            <!-- Usage Quota Card -->
            <UCard title="Plan Usage" description="Monitor your resource consumption for the current billing cycle.">
                <div class="space-y-6 mt-6">
                    <div v-for="usage in billingUsage" :key="usage.label" class="space-y-2">
                        <div class="flex justify-between items-end">
                            <div>
                                <p class="text-xs font-bold">{{ usage.label }}</p>
                                <p class="text-[10px] text-dimmed uppercase font-bold">{{ usage.used }}{{ usage.unit
                                }} of {{
                                        usage.total }}{{ usage.unit }} used</p>
                            </div>
                            <span class="text-xs font-black italic" :class="`text-${usage.color}`">{{
                                Math.round((usage.used
                                    / usage.total) * 100) }}%</span>
                        </div>
                        <UProgress :model-value="(usage.used / usage.total) * 100" :color="usage.color" size="sm" />
                    </div>
                </div>
                <template #footer>
                    <div class="flex items-center justify-between">
                        <p class="text-xs text-dimmed">Reset in 12 days</p>
                        <UButton label="Upgrade Plan" color="primary" size="sm" />
                    </div>
                </template>
            </UCard>
        </div>
    </section>

    <!-- 7. Billing & Invoices -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-receipt" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Billing & Invoices</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <!-- Digital Receipt Card -->
            <UCard class="border-dashed border-2 border-default ring-0">
                <div class="text-center mb-8">
                    <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <UIcon name="i-lucide-check-check" class="size-8 text-primary" />
                    </div>
                    <h3 class="text-xl font-black italic">Payment Successful</h3>
                    <p class="text-xs text-dimmed uppercase font-bold tracking-widest mt-1">Transaction
                        ID: #8821-4492</p>
                </div>

                <div class="space-y-4 mb-8">
                    <div v-for="item in receiptItems" :key="item.label" class="flex justify-between text-sm">
                        <span class="text-dimmed">{{ item.label }}</span>
                        <span class="font-bold">{{ item.price }}</span>
                    </div>

                    <div class="border-t border-dashed border-neutral-200 dark:border-neutral-800 pt-4 mt-4">
                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-dimmed">Subtotal</span>
                            <span>$44.00</span>
                        </div>
                        <div class="flex justify-between text-sm mb-4">
                            <span class="text-dimmed">Tax (0%)</span>
                            <span>$0.00</span>
                        </div>
                        <div class="flex justify-between text-lg font-black italic">
                            <span>TOTAL</span>
                            <span class="text-primary">$44.00</span>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4 mb-8 border border-neutral-100 dark:border-neutral-800">
                    <div class="flex items-center gap-3">
                        <UIcon name="i-lucide-credit-card" class="size-5 text-dimmed" />
                        <div class="flex-1">
                            <p class="text-xs font-bold">Paid with Mastercard</p>
                            <p class="text-[10px] text-dimmed">Ending in •••• 4492</p>
                        </div>
                    </div>
                </div>

                <UButton label="Download Invoice (PDF)" icon="i-lucide-download" block color="primary" variant="soft" />
            </UCard>

            <!-- Billing History Card -->
            <UCard title="Billing History" description="View and download your past invoices and receipts.">
                <div class="space-y-1 mt-4">
                    <div v-for="inv in invoices" :key="inv.id"
                        class="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group">
                        <div class="flex items-center gap-4">
                            <div
                                class="size-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                                <UIcon name="i-lucide-file-text" class="size-5 text-dimmed" />
                            </div>
                            <div>
                                <p class="text-sm font-bold">{{ inv.id }}</p>
                                <p class="text-[10px] text-dimmed uppercase font-bold">{{ inv.date }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-sm font-black italic">{{ inv.amount }}</p>
                                <UBadge :label="inv.status" size="sm" variant="subtle"
                                    :color="inv.status === 'Paid' ? 'success' : 'neutral'"
                                    class="text-[8px] h-4 px-1.5 font-black uppercase" />
                            </div>
                            <UButton icon="i-lucide-download" variant="ghost" color="neutral" size="sm"
                                class="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
                <template #footer>
                    <UButton label="Manage Payment Methods" variant="link" color="primary" class="p-0 text-xs"
                        trailing-icon="i-lucide-external-link" />
                </template>
            </UCard>
        </div>
    </section>

    <USeparator />

    <!-- ==========================================================================
         IV. Project & Task Management
         ========================================================================== -->
    <div
        class="space-y-2 relative pl-6 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary before:rounded-r-full">
        <h2 class="text-3xl font-black uppercase tracking-tighter">IV. Project Management</h2>
        <p class="text-sm text-dimmed uppercase tracking-widest">Kanban boards, asset tracking, and onboarding flows
        </p>
    </div>

    <!-- 8. Task & Kanban -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-check-square" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Task Patterns</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UCard v-for="task in tasks" :key="task.title"
                class="relative overflow-hidden before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1.5 before:rounded-r-full"
                :class="{
                    'before:bg-error': task.priority === 'Critical' || task.priority === 'High',
                    'before:bg-warning': task.priority === 'Medium',
                    'before:bg-primary': task.priority === 'Low'
                }">
                <div class="flex justify-between items-start mb-3">
                    <UBadge :label="task.status" variant="subtle" size="sm"
                        :color="task.status === 'Blocked' ? 'error' : task.status === 'In Review' ? 'warning' : 'neutral'" />
                    <div class="flex items-center gap-1 text-[10px] font-bold text-dimmed">
                        <UIcon name="i-lucide-clock" class="size-3" />
                        {{ task.estimate }}
                    </div>
                </div>
                <h4 class="font-bold text-sm mb-4 leading-tight">{{ task.title }}</h4>
                <div class="flex justify-between items-center">
                    <div class="flex -space-x-1.5">
                        <UAvatar v-for="i in task.users" :key="i"
                            :src="`https://i.pravatar.cc/100?u=${task.title}-${i}`" size="xs"
                            class="ring-2 ring-white dark:ring-neutral-900" />
                    </div>
                    <div class="flex gap-2">
                        <UButton icon="i-lucide-paperclip" variant="link" color="neutral" size="xs" class="p-0" />
                        <UButton icon="i-lucide-message-circle" variant="link" color="neutral" size="xs" class="p-0" />
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <!-- 9. Asset Management -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-folder-open" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Asset Management</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UCard v-for="file in files" :key="file.name" variant="outline"
                class="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer transition-colors group">
                <div class="flex items-center gap-4">
                    <div :class="`bg-${file.color}/10`"
                        class="size-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <UIcon :name="file.icon" :class="`text-${file.color}`" class="size-6" />
                    </div>
                    <div class="min-w-0">
                        <p class="text-sm font-bold truncate">{{ file.name }}</p>
                        <p class="text-[10px] text-dimmed uppercase font-bold tracking-wider">{{ file.size
                        }} • {{ file.type }}</p>
                    </div>
                    <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <UButton icon="i-lucide-download" variant="ghost" color="neutral" size="xs" />
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <!-- 10. Getting Started (Onboarding) -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-sparkles" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Onboarding & Progress</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <!-- AI Insight Card (Gradient Border) -->
            <div
                class="relative p-0.5 rounded-[22px] bg-gradient-to-br from-primary via-purple-500 to-blue-500 overflow-hidden group">
                <div
                    class="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <UCard class="relative rounded-[20px] bg-white dark:bg-neutral-950 border-0 ring-0 h-full">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <UIcon name="i-lucide-brain-circuit" class="size-6 text-primary" />
                        </div>
                        <div>
                            <h3 class="font-black italic text-lg leading-none">Agentic Insight</h3>
                            <p class="text-[10px] text-dimmed uppercase font-bold tracking-widest mt-1">Real-time
                                Analysis
                            </p>
                        </div>
                    </div>
                    <p class="text-sm leading-relaxed mb-6 italic text-neutral-700 dark:text-neutral-300">
                        "We've detected a significant optimization opportunity in your workflow. By consolidating
                        these
                        three automated agents, you could reduce latency by up to <span
                            class="text-primary font-black">24%</span> while maintaining full output quality."
                    </p>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div
                            class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                            <div class="text-[10px] uppercase font-bold text-dimmed mb-1">Confidence</div>
                            <div class="text-lg font-black italic">98.2%</div>
                        </div>
                        <div
                            class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                            <div class="text-[10px] uppercase font-bold text-dimmed mb-1">Impact</div>
                            <div class="text-lg font-black italic text-success">High</div>
                        </div>
                    </div>
                    <UButton label="Apply Optimization" block color="primary" icon="i-lucide-zap" />
                </UCard>
            </div>

            <!-- Progress & Onboarding Card -->
            <UCard title="Getting Started"
                description="Complete these steps to unlock the full potential of your workspace.">
                <div class="space-y-6 mt-6">
                    <div v-for="(step, index) in onboardingSteps" :key="step.title" class="flex gap-4 items-center">
                        <div class="relative">
                            <div v-if="index !== onboardingSteps.length - 1"
                                class="absolute left-1/2 top-10 bottom-[-24px] w-px bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2" />
                            <div :class="[
                                step.status === 'completed' ? 'bg-success/20 text-success' :
                                    step.status === 'current' ? 'bg-primary text-white shadow-lg ring-4 ring-primary/20' :
                                        'bg-neutral-100 dark:bg-neutral-800 text-dimmed'
                            ]"
                                class="size-10 rounded-full flex items-center justify-center z-10 relative transition-all">
                                <UIcon :name="step.status === 'completed' ? 'i-lucide-check' : step.icon"
                                    class="size-5" />
                            </div>
                        </div>
                        <div class="flex-1 py-1">
                            <h4 class="text-sm font-bold" :class="step.status === 'upcoming' ? 'text-dimmed' : ''">
                                {{ step.title }}
                            </h4>
                            <p v-if="step.status === 'current'" class="text-xs text-primary font-medium mt-0.5">In
                                progress
                                • 2 mins remaining</p>
                            <p v-else-if="step.status === 'completed'" class="text-xs text-success font-medium mt-0.5">
                                Completed yesterday</p>
                            <p v-else class="text-xs text-dimmed mt-0.5">Locked until setup is complete</p>
                        </div>
                        <UButton v-if="step.status === 'current'" label="Resume" size="xs" color="primary"
                            variant="soft" class="rounded-full" />
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <USeparator />

    <!-- ==========================================================================
         V. Content & Media
         ========================================================================== -->
    <div
        class="space-y-2 relative pl-6 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary before:rounded-r-full">
        <h2 class="text-3xl font-black uppercase tracking-tighter">V. Content & Media</h2>
        <p class="text-sm text-dimmed uppercase tracking-widest">Rich media galleries and interactive article
            patterns</p>
    </div>

    <!-- 11. Feature Showcase -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-layers" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Feature Grid</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UCard v-for="feature in features" :key="feature.title"
                class="group hover:border-primary/50 transition-colors">
                <template #header>
                    <div
                        class="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UIcon :name="feature.icon" class="size-6 text-primary" />
                    </div>
                </template>
                <h3 class="font-bold text-lg mb-2">{{ feature.title }}</h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {{ feature.description }}
                </p>
                <template #footer>
                    <UButton label="Learn More" variant="link" color="primary" class="p-0"
                        trailing-icon="i-lucide-chevron-right" />
                </template>
            </UCard>
        </div>
    </section>

    <!-- 12. Article & News -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-newspaper" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Content & Articles</h2>
        </div>
        <div class="space-y-6">
            <UCard v-for="i in 2" :key="i" :ui="{ body: 'p-0 sm:p-0 flex flex-col md:flex-row overflow-hidden' }"
                class="group hover:shadow-2xl transition-all duration-500">
                <div class="md:w-72 lg:w-96 shrink-0 relative overflow-hidden">
                    <img :src="`https://picsum.photos/seed/${i + 50}/800/600`"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute top-4 left-4">
                        <UBadge label="Engineering" color="primary" class="font-bold" />
                    </div>
                </div>
                <div class="p-8 flex flex-col justify-center flex-1">
                    <div class="flex items-center gap-2 text-xs text-dimmed font-bold uppercase tracking-widest mb-3">
                        <span>May 12, 2024</span>
                        <span class="size-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        <span>8 min read</span>
                    </div>
                    <h3 class="text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                        Building Scalable AI Infrastructure: Lessons from the Frontlines
                    </h3>
                    <p
                        class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-2 lg:line-clamp-none">
                        Discover the architectural patterns and challenges we encountered while scaling our agentic
                        AI
                        framework to support millions of concurrent connections.
                    </p>
                    <div class="flex items-center justify-between mt-auto">
                        <div class="flex items-center gap-3">
                            <UAvatar src="https://i.pravatar.cc/100?u=writer" size="sm" />
                            <div>
                                <p class="text-sm font-bold">Jonathan Vance</p>
                                <p class="text-[10px] text-dimmed uppercase font-bold">Core Contributor</p>
                            </div>
                        </div>
                        <UButton icon="i-lucide-arrow-right" variant="soft" color="primary" class="rounded-full" />
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <!-- 13. Media Gallery -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-image" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Media & Gallery</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard v-for="i in 3" :key="i" :ui="{ body: 'p-0 sm:p-0 relative group overflow-hidden' }">
                <img :src="`https://picsum.photos/seed/${i + 40}/800/600`"
                    class="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <UBadge label="Photography" color="primary" size="sm" class="mb-2" />
                        <h4 class="text-white font-bold text-lg mb-1">Mountain Expedition {{ i }}</h4>
                        <p class="text-white/70 text-xs mb-4">A breathtaking journey through the peaks.</p>
                        <div class="flex gap-2">
                            <UButton icon="i-lucide-eye" label="View" color="neutral" variant="solid" size="xs" />
                            <UButton icon="i-lucide-download" color="neutral" variant="ghost" size="xs" />
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <!-- 14. Rich Media & Previews -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-play" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Interactive Previews</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <!-- Product Preview Card -->
            <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }">
                <div class="aspect-video bg-neutral-100 dark:bg-neutral-800 relative group">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60"
                        alt="Product"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div class="absolute top-4 right-4 flex flex-col gap-2">
                        <UButton icon="i-lucide-heart" color="neutral" variant="solid" size="sm" class="rounded-full" />
                        <UBadge label="New" color="primary" class="font-bold" />
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="font-bold text-lg">Premium Wireless Watch</h3>
                            <div class="flex items-center gap-1 text-orange-500 mt-1">
                                <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-3 fill-current" />
                                <span class="text-xs text-dimmed ml-1">(4.8/5)</span>
                            </div>
                        </div>
                        <div class="text-xl font-black">$249</div>
                    </div>
                    <p class="text-xs text-dimmed leading-relaxed mt-4">
                        Engineered for performance and style. Featuring high-fidelity audio, noise cancellation, and
                        40-hour
                        battery life.
                    </p>
                    <div class="flex gap-2 mt-6">
                        <UButton label="Add to Cart" color="primary" block class="flex-1"
                            icon="i-lucide-shopping-bag" />
                        <UButton icon="i-lucide-share-2" color="neutral" variant="soft" />
                    </div>
                </div>
            </UCard>

            <!-- Premium Video Preview Card -->
            <UCard :ui="{
                body: 'p-0 sm:p-0 overflow-hidden',
            }"
                class="group border-0 ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <!-- Premium Background Glow -->
                <div
                    class="absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div class="aspect-video relative overflow-hidden bg-neutral-950">
                    <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60"
                        class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" />

                    <!-- Overlays -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    <!-- Badge -->
                    <div class="absolute top-4 left-4 flex gap-2">
                        <UBadge label="4K" color="primary" variant="solid" size="xs"
                            class="font-black rounded-sm px-1.5" />
                        <UBadge label="NEW" color="success" variant="solid" size="xs"
                            class="font-black rounded-sm px-1.5" />
                    </div>

                    <!-- Top Right Controls (Hover only) -->
                    <div
                        class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <UButton icon="i-lucide-clock" color="neutral" variant="solid" size="xs"
                            class="rounded-lg backdrop-blur-md bg-black/40 border border-white/10" />
                        <UButton icon="i-lucide-list-plus" color="neutral" variant="solid" size="xs"
                            class="rounded-lg backdrop-blur-md bg-black/40 border border-white/10" />
                    </div>

                    <!-- Center Play Button -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="relative">
                            <!-- Outer Glow Pulse -->
                            <div
                                class="absolute inset-0 bg-primary/40 rounded-full blur-xl group-hover:scale-150 animate-pulse opacity-0 group-hover:opacity-100 transition-all duration-700" />

                            <div
                                class="size-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                <div
                                    class="size-14 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_30px_rgba(var(--color-primary-500),0.5)]">
                                    <UIcon name="i-lucide-play" class="size-7 fill-current ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Duration & Progress -->
                    <div
                        class="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                        12:45
                    </div>

                    <!-- Watching Progress Bar -->
                    <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div class="h-full bg-primary w-[65%] shadow-[0_0_10px_rgba(var(--color-primary-500),1)]" />
                    </div>
                </div>

                <div class="p-6 relative">
                    <div class="flex gap-4">
                        <div class="relative shrink-0">
                            <UAvatar src="https://i.pravatar.cc/100?u=channel" size="md"
                                class="ring-2 ring-primary/20 p-0.5 bg-neutral-100 dark:bg-neutral-800" />
                            <div
                                class="absolute -bottom-1 -right-1 size-5 rounded-full bg-primary flex items-center justify-center ring-2 ring-white dark:ring-neutral-950">
                                <UIcon name="i-lucide-check" class="size-3 text-white" />
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="font-black text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                Mastering Agentic Workflows: A Comprehensive Guide to AI Automation
                            </h3>
                            <div class="flex items-center flex-wrap gap-x-3 gap-y-1 mt-3">
                                <span
                                    class="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">AI
                                    Academy</span>
                                <span class="size-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                                <span class="text-xs text-dimmed font-bold">1.2M views</span>
                                <span class="size-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                                <span class="text-xs text-dimmed font-bold">2 days ago</span>
                            </div>
                        </div>
                        <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                            <UButton icon="i-lucide-more-vertical" variant="ghost" color="neutral" size="sm" />
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <USeparator />

    <!-- ==========================================================================
             VI. Social & Collaboration
             ========================================================================== -->
    <div
        class="space-y-2 relative pl-6 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary before:rounded-r-full">
        <h2 class="text-3xl font-black uppercase tracking-tighter">VI. Social & Collaboration</h2>
        <p class="text-sm text-dimmed uppercase tracking-widest">User profiles, team interaction, and social feeds
        </p>
    </div>

    <!-- 15. User Profiles -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-user" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">User Profiles</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
            <!-- Profile Card -->
            <UCard class="overflow-hidden">
                <div class="h-24 bg-gradient-to-r from-primary to-blue-600 -mx-6 -mt-6 mb-12 relative">
                    <div
                        class="size-18 squircle bg-white dark:bg-neutral-900 absolute -bottom-9 left-6 p-1 shadow-xl flex items-center justify-center">
                        <UAvatar src="https://i.pravatar.cc/150?u=antigravity"
                            class="size-full squircle rounded-none" />
                    </div>
                </div>
                <div class="flex justify-between items-start pt-2">
                    <div>
                        <h3 class="text-xl font-bold">Alex Rivers</h3>
                        <p class="text-sm text-dimmed">Lead Product Designer</p>
                    </div>
                    <UButton label="Follow" color="primary" size="sm" class="rounded-full px-6" />
                </div>
                <p class="text-sm mt-6 text-neutral-600 dark:text-neutral-400">
                    Designing intuitive interfaces and digital experiences. Focused on minimal design and complex
                    data visualization.
                </p>
                <div class="flex gap-4 mt-6">
                    <div class="text-center">
                        <div class="font-bold text-sm">1.2k</div>
                        <div class="text-[10px] uppercase text-dimmed font-bold">Followers</div>
                    </div>
                    <div class="text-center">
                        <div class="font-bold text-sm">482</div>
                        <div class="text-[10px] uppercase text-dimmed font-bold">Following</div>
                    </div>
                    <div class="text-center">
                        <div class="font-bold text-sm">94</div>
                        <div class="text-[10px] uppercase text-dimmed font-bold">Projects</div>
                    </div>
                </div>
            </UCard>

            <!-- Mini Project Status Card -->
            <UCard :ui="{ body: 'flex flex-col gap-4' }">
                <div class="flex items-start justify-between">
                    <div class="flex gap-3">
                        <div class="size-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                            <UIcon name="i-lucide-layout" class="size-6 text-orange-500" />
                        </div>
                        <div>
                            <h3 class="font-bold">Project Antigravity</h3>
                            <p class="text-xs text-dimmed italic">Due in 5 days</p>
                        </div>
                    </div>
                    <UBadge label="In Progress" color="warning" variant="subtle" />
                </div>
                <div class="space-y-2 mt-2">
                    <div class="flex justify-between text-xs font-medium">
                        <span>Development Progress</span>
                        <span>65%</span>
                    </div>
                    <progress class="w-full h-1.5 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800"
                        value="65" max="100">
                    </progress>
                </div>
                <div class="flex -space-x-2 mt-4">
                    <UAvatar v-for="i in 4" :key="i" :src="`https://i.pravatar.cc/100?img=${i + 20}`" size="xs"
                        class="ring-2 ring-white dark:ring-neutral-900" />
                    <div
                        class="size-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold ring-2 ring-white dark:ring-neutral-900">
                        +2
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <!-- 16. Team Interaction -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-share-2" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Team Interaction</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <!-- User Invitation Card -->
            <UCard title="Team Invitation" description="Invite your colleagues to collaborate on this project.">
                <div class="space-y-4 mt-6">
                    <div v-for="user in inviteUsers" :key="user.name"
                        class="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                        <div class="flex items-center gap-3">
                            <UAvatar :src="user.avatar" size="sm" />
                            <div>
                                <p class="text-sm font-bold">{{ user.name }}</p>
                                <p class="text-[10px] text-dimmed uppercase font-bold">{{ user.role }}</p>
                            </div>
                        </div>
                        <UButton v-if="user.status === 'invited'" label="Invited" size="xs" color="neutral"
                            variant="soft" disabled />
                        <UButton v-else label="Invite" size="xs" color="primary" variant="ghost"
                            icon="i-lucide-user-plus" />
                    </div>
                </div>
                <template #footer>
                    <div class="flex gap-2">
                        <UInput icon="i-lucide-mail" placeholder="Enter email address..." class="flex-1" />
                        <UButton label="Send" color="primary" />
                    </div>
                </template>
            </UCard>

            <!-- Activity Feed Card -->
            <UCard title="Recent Activity" description="Stay updated with the latest events in your workspace.">
                <div class="space-y-6 mt-4">
                    <div v-for="(item, index) in activity" :key="index" class="flex gap-4 relative">
                        <div v-if="index !== activity.length - 1"
                            class="absolute left-5 top-10 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
                        <div
                            class="size-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 z-10 ring-4 ring-white dark:ring-neutral-900">
                            <UIcon :name="item.icon" :class="`text-${item.color}`" class="size-5" />
                        </div>
                        <div class="flex flex-col py-1">
                            <p class="text-sm">
                                <span class="font-bold">{{ item.user }}</span>
                                <span class="text-dimmed ml-1">{{ item.action }}</span>
                            </p>
                            <span class="text-[10px] text-dimmed font-medium mt-0.5 uppercase tracking-tighter">{{
                                item.time
                            }}</span>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <UButton label="View Full Audit Log" variant="ghost" color="neutral" block size="sm" />
                </template>
            </UCard>
        </div>
    </section>

    <!-- 17. Events & Scheduling -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-calendar" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Events & Scheduling</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UCard v-for="event in events" :key="event.title"
                class="group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors cursor-pointer">
                <div class="flex gap-6 items-center">
                    <div :class="`bg-${event.color}/10 text-${event.color}`"
                        class="size-20 rounded-2xl flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <span class="text-[10px] font-black uppercase tracking-widest">{{ event.date.split(' ')[0]
                        }}</span>
                        <span class="text-2xl font-black">{{ event.date.split(' ')[1] }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-bold text-lg truncate group-hover:text-primary transition-colors">{{
                            event.title }}
                        </h3>
                        <div class="flex flex-col gap-1 mt-2">
                            <div class="flex items-center gap-1.5 text-xs text-dimmed">
                                <UIcon name="i-lucide-map-pin" class="size-3.5" />
                                <span>{{ event.location }}</span>
                            </div>
                            <div class="flex items-center gap-1.5 text-xs text-dimmed">
                                <UIcon name="i-lucide-clock" class="size-3.5" />
                                <span>{{ event.time }}</span>
                            </div>
                        </div>
                    </div>
                    <UButton icon="i-lucide-plus" variant="soft" color="neutral" size="sm" class="rounded-full" />
                </div>
            </UCard>
        </div>
    </section>

    <USeparator />

    <!-- ==========================================================================
             VII. Support & Resources
             ========================================================================== -->
    <div
        class="space-y-2 relative pl-6 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary before:rounded-r-full">
        <h2 class="text-3xl font-black uppercase tracking-tighter">VII. Support & Resources</h2>
        <p class="text-sm text-dimmed uppercase tracking-widest">Frequently asked questions and support desk
            patterns
        </p>
    </div>

    <!-- 18. FAQ & Support -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-help-circle" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Help & Support</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 items-start gap-6">
            <!-- FAQ Card -->
            <UCard title="Frequently Asked Questions"
                description="Quick answers to common questions about our platform.">
                <UAccordion :items="faqItems" variant="ghost" size="md" :ui="{
                    item: 'px-0',
                    trigger: 'font-bold text-sm py-4'
                }" />
                <template #footer>
                    <div class="flex items-center justify-between">
                        <p class="text-xs text-dimmed">Still need help?</p>
                        <UButton label="Contact Support" variant="link" color="primary" class="p-0" />
                    </div>
                </template>
            </UCard>

            <!-- Support Ticket Card -->
            <UCard class="bg-primary/5 dark:bg-primary/10 border-primary/20">
                <div class="flex gap-4 items-start">
                    <div class="size-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                        <UIcon name="i-lucide-life-buoy" class="size-6 text-primary" />
                    </div>
                    <div>
                        <h3 class="font-bold text-lg mb-1">Priority Support</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Get dedicated help from our engineering team with sub-hour response times and custom
                            integration
                            assistance.
                        </p>
                        <div class="flex gap-2">
                            <UButton label="Upgrade Now" color="primary" />
                            <UButton label="View Benefits" variant="ghost" color="neutral" />
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
    </section>

    <USeparator />

    <!-- ==========================================================================
             VIII. Advanced Interactive Patterns
             ========================================================================== -->
    <div
        class="space-y-2 relative pl-6 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary before:rounded-r-full">
        <h2 class="text-3xl font-black uppercase tracking-tighter">VIII. Advanced Interactive Patterns</h2>
        <p class="text-sm text-dimmed uppercase tracking-widest">Complex orchestrators, IoT controls, and spatial
            data
        </p>
    </div>

    <!-- 19. AI Node Orchestrator -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-cpu" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">AI Node Orchestrator</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <UCard v-for="node in workflowNodes" :key="node.id"
                class="relative overflow-hidden group transition-all duration-500 hover:ring-2 hover:ring-primary/50"
                :class="node.status === 'active' ? 'bg-primary/5 border-primary/20' : ''">

                <!-- Progress Pulse (Active only) -->
                <div v-if="node.status === 'active'"
                    class="absolute top-0 left-0 w-full h-1 overflow-hidden bg-primary/10">
                    <div
                        class="h-full bg-primary animate-[shimmer_2s_infinite] w-1/3 shadow-[0_0_15px_rgba(var(--color-primary-500),0.5)]" />
                </div>

                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center gap-3">
                        <div :class="[
                            node.status === 'active' ? 'bg-primary text-white scale-110 shadow-lg' :
                                node.status === 'pending' ? 'bg-warning/20 text-warning' : 'bg-neutral-100 dark:bg-neutral-800 text-dimmed'
                        ]" class="size-10 rounded-xl flex items-center justify-center transition-all duration-500">
                            <UIcon :name="node.icon" class="size-5"
                                :class="node.status === 'active' ? 'animate-pulse' : ''" />
                        </div>
                        <div>
                            <h4 class="font-bold text-sm leading-none">{{ node.name }}</h4>
                            <span class="text-[10px] text-dimmed uppercase font-bold tracking-widest">{{ node.type
                            }}</span>
                        </div>
                    </div>
                    <UBadge :label="node.status" size="sm" variant="subtle"
                        :color="node.status === 'active' ? 'primary' : node.status === 'pending' ? 'warning' : 'neutral'"
                        class="font-black uppercase text-[9px]" />
                </div>

                <div class="space-y-4">
                    <!-- Confidence Meter -->
                    <div class="space-y-1.5">
                        <div class="flex justify-between text-[10px] font-bold uppercase text-dimmed">
                            <span>Confidence</span>
                            <span>{{ (node.confidence * 100).toFixed(0) }}%</span>
                        </div>
                        <UProgress :model-value="node.confidence * 100"
                            :color="node.confidence > 0.9 ? 'primary' : node.confidence > 0.8 ? 'warning' : 'neutral'"
                            size="sm" />
                    </div>

                    <!-- Micro Logs -->
                    <div
                        class="bg-neutral-950 rounded-lg p-3 font-mono text-[10px] space-y-1.5 border border-neutral-800 min-h-[60px]">
                        <div v-if="node.logs.length === 0" class="text-neutral-600 italic">Awaiting execution...
                        </div>
                        <div v-for="(log, i) in node.logs" :key="i" class="flex gap-2">
                            <span class="text-primary/50">></span>
                            <span class="text-neutral-400 truncate">{{ log }}</span>
                        </div>
                        <div v-if="node.status === 'active'"
                            class="w-1.5 h-3 bg-primary animate-pulse inline-block align-middle ml-1" />
                    </div>
                </div>

                <template #footer>
                    <div class="flex gap-2">
                        <UButton label="Configure" variant="ghost" color="neutral" size="xs" class="flex-1 font-bold" />
                        <UButton :icon="node.status === 'active' ? 'i-lucide-pause' : 'i-lucide-play'"
                            :color="node.status === 'active' ? 'warning' : 'primary'" size="xs" variant="soft" />
                    </div>
                </template>
            </UCard>
        </div>
    </section>

    <!-- 20. IoT & Device Monitoring -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-home" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Smart IoT Controllers</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UCard v-for="device in iotDevices" :key="device.name"
                class="relative overflow-hidden backdrop-blur-xl border-white/10" :ui="{ body: 'relative z-10' }">
                <!-- Glassmorphism Background -->
                <div
                    class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-neutral-900/50 pointer-events-none" />
                <div :class="`bg-${device.color}/5`"
                    class="absolute -right-12 -top-12 size-32 rounded-full blur-3xl pointer-events-none" />

                <div class="flex justify-between items-start mb-6">
                    <div class="flex items-center gap-3">
                        <div :class="`bg-${device.color}/10 text-${device.color}`"
                            class="size-12 rounded-2xl flex items-center justify-center shadow-inner">
                            <UIcon
                                :name="device.name.includes('Thermostat') ? 'i-lucide-thermometer' : device.name.includes('Purifier') ? 'i-lucide-wind' : 'i-lucide-shield-check'"
                                class="size-6" />
                        </div>
                        <div>
                            <h4 class="font-bold">{{ device.name }}</h4>
                            <p class="text-xs text-dimmed">{{ device.room }}</p>
                        </div>
                    </div>
                    <USwitch v-model="device.status" :color="device.color" />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div v-if="'temp' in device"
                        class="p-3 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-white/5">
                        <div class="text-[10px] font-black uppercase text-dimmed mb-1">Temperature</div>
                        <div class="text-2xl font-black italic">{{ device.temp }}°C</div>
                    </div>
                    <div v-if="'quality' in device"
                        class="p-3 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-white/5">
                        <div class="text-[10px] font-black uppercase text-dimmed mb-1">Air Quality</div>
                        <div class="text-lg font-black italic text-success">{{ device.quality }}</div>
                    </div>
                    <div v-if="'filter' in device"
                        class="p-3 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-white/5">
                        <div class="text-[10px] font-black uppercase text-dimmed mb-1">Filter Life</div>
                        <div class="text-2xl font-black italic">{{ device.filter }}%</div>
                    </div>
                    <div v-if="'alerts' in device"
                        class="p-3 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-white/5">
                        <div class="text-[10px] font-black uppercase text-dimmed mb-1">Alerts</div>
                        <div class="text-2xl font-black italic"
                            :class="device.alerts > 0 ? 'text-error' : 'text-success'">
                            {{ device.alerts }}</div>
                    </div>
                    <div v-if="'battery' in device"
                        class="p-3 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-white/5">
                        <div class="text-[10px] font-black uppercase text-dimmed mb-1">Battery</div>
                        <div class="flex items-center gap-2">
                            <div class="flex-1 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                <div class="h-full bg-success" :style="{ width: `${device.battery}%` }" />
                            </div>
                            <span class="text-xs font-bold">{{ device.battery }}%</span>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <div
                        class="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-dimmed">
                        <span>Last Updated: 2m ago</span>
                        <div class="flex items-center gap-1">
                            <div class="size-1.5 rounded-full bg-success animate-pulse" />
                            <span>Connected</span>
                        </div>
                    </div>
                </template>
            </UCard>
        </div>
    </section>

    <!-- 21. Spatial & Map Card -->
    <section>
        <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-lucide-map" class="size-5 text-primary" />
            <h2 class="text-xl font-bold">Spatial & Location Explorer</h2>
        </div>
        <UCard :ui="{ body: 'p-0 sm:p-0 flex flex-col lg:flex-row overflow-hidden min-h-[400px]' }">
            <!-- Map Preview Side -->
            <div class="lg:w-2/3 bg-neutral-100 dark:bg-neutral-800 relative group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop&q=60"
                    class="w-full h-full object-cover transition-transform duration-[20s] linear group-hover:scale-150" />

                <!-- Map Overlay UI -->
                <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                <!-- Floating Map Controls -->
                <div class="absolute top-4 right-4 flex flex-col gap-2">
                    <UButton icon="i-lucide-plus" color="neutral" variant="solid" size="sm" />
                    <UButton icon="i-lucide-minus" color="neutral" variant="solid" size="sm" />
                    <UButton icon="i-lucide-navigation" color="primary" variant="solid" size="sm" />
                </div>

                <!-- Location Marker -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div class="relative">
                        <div class="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                        <div
                            class="relative size-6 rounded-full bg-primary border-4 border-white shadow-2xl flex items-center justify-center">
                            <div class="size-1.5 rounded-full bg-white" />
                        </div>
                    </div>
                </div>

                <!-- Bottom Coordinates Badge -->
                <div
                    class="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono text-white border border-white/10">
                    {{ locationData.coords }}
                </div>
            </div>

            <!-- Info Side -->
            <div class="lg:w-1/3 p-8 flex flex-col bg-white dark:bg-neutral-950">
                <div class="flex items-center gap-3 mb-6">
                    <div class="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <UIcon name="i-lucide-map-pin" class="size-6 text-primary" />
                    </div>
                    <div>
                        <h3 class="font-black italic text-xl">Headquarters</h3>
                        <p class="text-[10px] text-dimmed uppercase font-bold tracking-widest">Main Campus</p>
                    </div>
                </div>

                <div class="space-y-6 flex-1">
                    <div class="space-y-1">
                        <div class="text-[10px] font-black uppercase text-dimmed tracking-tighter">Address</div>
                        <p class="text-sm font-medium leading-relaxed">{{ locationData.address }}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div
                            class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                            <div class="text-[10px] font-black uppercase text-dimmed mb-1">Weather</div>
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-sun" class="size-4 text-warning" />
                                <span class="text-lg font-black italic">{{ locationData.temp }}</span>
                            </div>
                        </div>
                        <div
                            class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                            <div class="text-[10px] font-black uppercase text-dimmed mb-1">Timezone</div>
                            <div class="text-sm font-black italic mt-1">{{ locationData.timezone }}</div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="text-[10px] font-black uppercase text-dimmed tracking-tighter">Nearby Nodes
                        </div>
                        <div class="flex -space-x-3">
                            <UAvatar v-for="i in 5" :key="i" :src="`https://i.pravatar.cc/100?u=map-${i}`"
                                class="ring-4 ring-white dark:ring-neutral-950" />
                            <div
                                class="size-10 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black ring-4 ring-white dark:ring-neutral-950 z-10">
                                +12
                            </div>
                        </div>
                    </div>
                </div>

                <UButton label="Open in Google Maps" icon="i-lucide-external-link" block color="primary" class="mt-8" />
            </div>
        </UCard>
    </section>

    <USeparator />

    <!-- ==========================================================================
             IX. Experimental & Decorative
             ========================================================================== -->
    <div
        class="space-y-2 relative pl-6 py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-primary before:rounded-r-full">
        <h2 class="text-3xl font-black uppercase tracking-tighter">IX. Experimental & Decorative</h2>
        <p class="text-sm text-dimmed uppercase tracking-widest">High-impact visual designs and advanced CSS
            patterns
        </p>
    </div>

    <section>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- 3D Perspective Card -->
            <div class="group [perspective:1000px]">
                <div
                    class="relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]">
                    <UCard
                        class="relative overflow-hidden border-0 ring-1 ring-white/20 bg-neutral-900 text-white min-h-[300px] flex flex-col justify-center items-center text-center p-12">
                        <!-- Animated Background Gradients -->
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-600/40 to-blue-600/40 opacity-50 blur-3xl animate-pulse" />
                        <div
                            class="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity blur" />

                        <div class="relative z-10 [transform:translateZ(50px)]">
                            <div
                                class="size-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center mb-8 mx-auto border border-white/20 shadow-2xl">
                                <UIcon name="i-lucide-box" class="size-10 text-primary" />
                            </div>
                            <h3 class="text-4xl font-black italic tracking-tighter mb-4 uppercase">Perspective</h3>
                            <p class="text-sm text-white/60 max-w-xs mx-auto leading-relaxed">
                                Hover over this card to experience 3D transformation effects using CSS perspective
                                and
                                transform properties.
                            </p>
                        </div>

                        <div class="absolute bottom-8 right-8 [transform:translateZ(30px)]">
                            <UButton label="Explore 3D" color="primary" variant="solid" size="lg"
                                class="rounded-full px-8 shadow-[0_0_30px_rgba(var(--color-primary-500),0.5)]" />
                        </div>
                    </UCard>
                </div>
            </div>

            <!-- Glassmorphic Stats Card -->
            <div class="relative min-h-[300px] flex items-center justify-center overflow-hidden rounded-lg">
                <!-- Background Visuals -->
                <div class="absolute inset-0 bg-neutral-950">
                    <div class="absolute top-0 left-0 size-64 bg-primary/30 rounded-full blur-[100px] animate-blob" />
                    <div
                        class="absolute bottom-0 right-0 size-64 bg-blue-600/30 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                    <div
                        class="absolute top-1/2 left-1/2 size-64 bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
                </div>

                <UCard class="relative z-10 w-full backdrop-blur-2xl bg-white/5 border-white/10 text-white shadow-2xl">
                    <template #header>
                        <div class="flex justify-between items-center">
                            <span class="text-xs font-black uppercase tracking-[0.2em] text-primary">System
                                Overload</span>
                            <div class="size-2 rounded-full bg-error animate-ping" />
                        </div>
                    </template>

                    <div class="text-center py-6">
                        <div class="text-6xl font-black italic tracking-tighter mb-2">94<span
                                class="text-2xl text-primary">%</span></div>
                        <p class="text-xs text-white/50 uppercase font-bold tracking-widest">Global Resource Usage
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                            <div class="text-xl font-bold">12.4s</div>
                            <div class="text-[9px] uppercase font-black text-white/40">Latency</div>
                        </div>
                        <div class="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                            <div class="text-xl font-bold text-success">Active</div>
                            <div class="text-[9px] uppercase font-black text-white/40">Status</div>
                        </div>
                    </div>

                    <template #footer>
                        <UButton label="Initialize Reset" block variant="outline" color="neutral" size="lg"
                            class="hover:bg-white hover:text-black transition-all duration-500 font-black uppercase" />
                    </template>
                </UCard>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(300%);
    }
}

@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }

    33% {
        transform: translate(30px, -50px) scale(1.1);
    }

    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }

    100% {
        transform: translate(0px, 0px) scale(1);
    }
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

.animate-blob {
    animation: blob 7s infinite;
}
</style>