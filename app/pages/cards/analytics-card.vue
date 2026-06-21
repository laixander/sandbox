<script setup lang="ts">
// ============================================================================
// Page Configuration
// ============================================================================
definePageMeta({
    title: 'Analytics Cards'
})

// ============================================================================
// Mock Data
// ============================================================================

const revenueData = [
    { label: 'Subscriptions', value: 75, color: 'primary' },
    { label: 'Add-ons', value: 15, color: 'info' },
    { label: 'Overage', value: 10, color: 'warning' }
] as const

const activityFeed = [
    { id: 1, user: 'Alex Rivera', action: 'deployed new version', time: '2m ago', icon: 'i-lucide-rocket', color: 'primary' },
    { id: 2, user: 'System', action: 'database backup completed', time: '15m ago', icon: 'i-lucide-database', color: 'success' },
    { id: 3, user: 'Sarah Chen', action: 'added 4 new agents', time: '1h ago', icon: 'i-lucide-user-plus', color: 'info' }
] as const

const leaderboard = [
    { rank: 1, name: 'Growth Bot', score: '12,450', trend: 'up', avatar: 'https://i.pravatar.cc/100?u=1' },
    { rank: 2, name: 'Clean Sweep', score: '10,230', trend: 'down', avatar: 'https://i.pravatar.cc/100?u=2' },
    { rank: 3, name: 'Data Miner', score: '8,900', trend: 'up', avatar: 'https://i.pravatar.cc/100?u=3' }
] as const

const trafficSources = [
    { source: 'Direct', value: 45, color: 'primary', icon: 'i-lucide-mouse-pointer-2' },
    { source: 'Social', value: 25, color: 'info', icon: 'i-lucide-share-2' },
    { source: 'Referral', value: 20, color: 'warning', icon: 'i-lucide-link' },
    { source: 'Other', value: 10, color: 'error', icon: 'i-lucide-more-horizontal' }
] as const

const sparklineData = [40, 35, 55, 45, 60, 50, 75, 65, 80]
const forecastData = [65, 70, 68, 75, 82, 85, 90, 95]
const retentionData = [100, 92, 85, 78, 72, 68, 65, 62]

const nodeColumns = [
    { accessorKey: 'id', header: 'Node ID' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'load', header: 'Load', meta: { class: { th: 'text-right', td: 'text-right' } } }
]

const nodes = [
    { id: 'NODE-01-US', status: 'Healthy', load: '27%' },
    { id: 'NODE-02-US', status: 'Healthy', load: '39%' },
    { id: 'NODE-03-US', status: 'Healthy', load: '51%' }
]
</script>

<template>
    <!-- ==========================================================================
         Header Section
         ========================================================================== -->
    <UPageCard title="Premium Analytics"
        description="A high-fidelity collection of dashboard widgets and data visualization components built with Nuxt UI."
        variant="naked" />

    <!-- ==========================================================================
         Section 1: Core KPIs
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <!-- 1. Stat Summary Card -->
        <UCard class="relative overflow-hidden group">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-dimmed font-medium uppercase tracking-wider">Total Revenue</p>
                    <h3 class="text-3xl font-black italic mt-1">$124,592</h3>
                </div>
                <div class="p-3 bg-primary/10 rounded-xl">
                    <UIcon name="i-lucide-dollar-sign" class="size-6 text-primary flex" />
                </div>
            </div>
            <div class="mt-4 flex items-center gap-2">
                <UBadge color="success" variant="subtle" size="sm" class="font-bold">
                    <UIcon name="i-lucide-trending-up" class="mr-1" /> +12.5%
                </UBadge>
                <span class="text-xs text-dimmed font-medium">vs last month</span>
            </div>
        </UCard>

        <!-- 2. Mini Analytics Card -->
        <UCard class="relative overflow-hidden">
            <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold text-dimmed uppercase tracking-widest">Active Users</span>
                <span class="text-lg font-black">2,842</span>
            </div>
            <div class="h-10 flex items-end gap-1">
                <div v-for="(v, i) in sparklineData" :key="i" :style="{ height: `${v}%` }"
                    class="flex-1 bg-primary/20 hover:bg-primary transition-colors rounded-t-sm" />
            </div>
        </UCard>

        <!-- 3. Comparison Card -->
        <UCard>
            <p class="text-xs font-bold text-dimmed uppercase mb-4">New vs Returning</p>
            <div class="grid grid-cols-2 divide-x divide-default">
                <div class="pr-4">
                    <p class="text-2xl font-black italic">1.2k</p>
                    <p class="text-[10px] text-dimmed uppercase font-bold">New</p>
                </div>
                <div class="pl-4">
                    <p class="text-2xl font-black italic">1.6k</p>
                    <p class="text-[10px] text-dimmed uppercase font-bold">Returning</p>
                </div>
            </div>
        </UCard>

        <!-- 4. Progress Tracker Card -->
        <UCard>
            <div class="flex justify-between items-end mb-2">
                <p class="text-sm font-bold">Project Alpha</p>
                <span class="text-xs font-black text-primary italic">78%</span>
            </div>
            <UProgress :model-value="78" color="primary" size="sm" />
            <p class="text-[10px] text-dimmed uppercase font-bold mt-2 tracking-tighter">
                4 of 6 milestones reached
            </p>
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 2: Financial & Activity
         ========================================================================== -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- 5. Revenue Breakdown Card -->
        <UCard title="Revenue Segments">
            <div class="space-y-4">
                <div v-for="item in revenueData" :key="item.label" class="space-y-1">
                    <div class="flex justify-between text-xs font-bold">
                        <span class="text-dimmed">{{ item.label }}</span>
                        <span>{{ item.value }}%</span>
                    </div>
                    <UProgress :model-value="item.value" :color="item.color" size="sm" />
                </div>
            </div>
        </UCard>

        <!-- 6. Activity Feed Card -->
        <UCard title="Recent Activity" description="Live updates from your workspace agents.">
            <div class="space-y-4">
                <div v-for="event in activityFeed" :key="event.id" class="flex items-center gap-3">
                    <div :class="`bg-${event.color}/10 text-${event.color}`"
                        class="size-10 rounded-lg flex items-center justify-center shrink-0">
                        <UIcon :name="event.icon" class="size-4" />
                    </div>
                    <div class="min-w-0">
                        <p class="text-sm text-dimmed leading-none truncate">
                            <span class="font-bold text-default">{{ event.user }}</span> {{ event.action }}
                        </p>
                        <p class="text-[10px] text-dimmed mt-1 uppercase font-bold leading-none">{{ event.time }}
                        </p>
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 7. Performance Score Card -->
        <UCard class="flex flex-col items-center justify-center text-center py-8">
            <div class="relative size-32 mb-4 mx-auto">
                <svg class="size-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent"
                        class="text-neutral-100 dark:text-neutral-800" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent"
                        stroke-dasharray="364.4" stroke-dashoffset="36.4"
                        class="text-primary transition-all duration-1000" />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-4xl font-black italic">A+</span>
                    <span class="text-[10px] text-dimmed uppercase font-bold">Score</span>
                </div>
            </div>
            <h4 class="text-lg font-black italic">System Efficiency</h4>
            <p class="text-xs text-dimmed px-6 mt-2">Your system is performing 15% better than last week.</p>
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 3: Insights & Visuals
         ========================================================================== -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <!-- 8. Heatmap Insight Card -->
        <UCard title="Activity Heatmap" description="Peak performance times over the last 7 days.">
            <div class="grid grid-cols-7 gap-1 mt-4">
                <div v-for="i in 28" :key="i" :class="[
                    i % 4 === 0 ? 'bg-primary' : i % 3 === 0 ? 'bg-primary/60' : i % 2 === 0 ? 'bg-primary/30' : 'bg-neutral-100 dark:bg-neutral-800'
                ]" class="aspect-square rounded-sm" />
            </div>
            <div class="flex justify-between mt-2 text-[10px] text-dimmed font-bold uppercase">
                <span>Mon</span>
                <span>Sun</span>
            </div>
        </UCard>

        <!-- 9. Goal Achievement Card -->
        <UCard>
            <div class="flex items-center gap-4">
                <div
                    class="size-16 rounded-full bg-warning/10 flex items-center justify-center shrink-0 ring-6 ring-warning/5">
                    <UIcon name="i-lucide-trophy" class="size-8 text-warning" />
                </div>
                <div class="flex-1">
                    <h3 class="text-lg font-black leading-none">Goal: $200k</h3>
                    <p class="text-sm text-dimmed mt-1">Monthly target milestone progress.</p>
                    <div class="mt-4">
                        <div class="flex justify-between text-xs font-bold mb-1">
                            <span class="text-primary">$158,200</span>
                            <span class="text-dimmed">79%</span>
                        </div>
                        <UProgress :model-value="79" color="primary" size="sm" />
                    </div>
                </div>
            </div>
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 4: Live Data & Forecasts
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <!-- 10. Real-Time Status Card -->
        <UCard>
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-2">
                    <div class="size-2 rounded-full bg-success animate-pulse" />
                    <span class="text-sm font-bold uppercase tracking-widest">API Status</span>
                </div>
                <UBadge color="success" variant="soft" size="sm">Operational</UBadge>
            </div>
            <div class="space-y-3">
                <div class="flex justify-between items-center text-xs">
                    <span class="text-dimmed">Response Time</span>
                    <span class="font-bold">124ms</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="text-dimmed">Uptime (30d)</span>
                    <span class="font-bold">99.98%</span>
                </div>
                <div class="flex justify-between items-center text-xs">
                    <span class="text-dimmed">Active Connections</span>
                    <span class="font-bold">1,240</span>
                </div>
            </div>
        </UCard>

        <!-- 11. Forecast Card -->
        <UCard title="Revenue Forecast" description="Predicted trends for the next 7 days.">
            <div class="h-24 flex items-end gap-1">
                <div v-for="(v, i) in forecastData" :key="i" :style="{ height: `${v}%` }"
                    class="flex-1 bg-info/30 hover:bg-info transition-all rounded-t-sm" />
            </div>
            <div class="mt-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg flex items-center justify-between">
                <span class="text-xs font-bold">Projected End of Month</span>
                <span class="text-sm font-black italic text-info">$185k</span>
            </div>
        </UCard>

        <!-- 12. Top Performer Card -->
        <UCard title="Top Performer" class="relative overflow-hidden group">
            <div
                class="absolute -right-4 -top-4 size-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-xl bg-primary/20 flex items-center justify-center shadow-lg">
                    <UIcon name="i-lucide-zap" class="size-6 text-primary" />
                </div>
                <div>
                    <h4 class="font-bold italic">Core Engine v2</h4>
                    <p class="text-[10px] text-dimmed uppercase font-bold tracking-widest">42% of total revenue</p>
                </div>
            </div>
            <div class="mt-6 grid grid-cols-2 gap-4 border-t border-default pt-4">
                <div>
                    <p class="text-xs text-dimmed font-bold uppercase">Volume</p>
                    <p class="text-lg font-black">$42,500</p>
                </div>
                <div>
                    <p class="text-xs text-dimmed font-bold uppercase">Growth</p>
                    <p class="text-lg font-black text-success">+15%</p>
                </div>
            </div>
        </UCard>

        <!-- 13. Leaderboard Card -->
        <UCard title="Agent Leaderboard">
            <div class="space-y-4 divide-y divide-default *:pb-4">
                <div v-for="user in leaderboard" :key="user.rank" class="flex items-center gap-4 last:pb-0">
                    <div class="relative flex items-center justify-center w-6 h-6 shrink-0">
                        <!-- Background Glow for Top 3 -->
                        <div v-if="user.rank <= 3" class="absolute inset-0 rounded-full blur-[2px] opacity-20" :class="{
                            'bg-yellow-400': user.rank === 1,
                            'bg-slate-400': user.rank === 2,
                            'bg-amber-600': user.rank === 3
                        }" />
                        <!-- Rank Badge -->
                        <span
                            class="text-[10px] font-black relative flex items-center justify-center w-full h-full rounded-full border transition-colors duration-300"
                            :class="{
                                'bg-yellow-400/10 border-yellow-400/50 text-yellow-600 dark:text-yellow-400': user.rank === 1,
                                'bg-slate-400/10 border-slate-400/50 text-slate-600 dark:text-slate-400': user.rank === 2,
                                'bg-amber-600/10 border-amber-600/50 text-amber-700 dark:text-amber-500': user.rank === 3,
                                'bg-neutral-100 dark:bg-neutral-800 border-transparent text-dimmed': user.rank > 3
                            }">
                            <UIcon v-if="user.rank === 1" name="i-lucide-crown" class="size-3" />
                            <template v-else>{{ user.rank }}</template>
                        </span>
                    </div>
                    <UAvatar :src="user.avatar" size="xs" />
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold truncate">{{ user.name }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <p class="text-xs font-black">{{ user.score }}</p>
                        <UIcon :name="user.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                            :class="user.trend === 'up' ? 'text-success' : 'text-error'" class="size-3" />
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 14. Data Table Card -->
        <UCard class="md:col-span-2 overflow-hidden" :ui="{ body: 'p-0 sm:p-0' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="font-bold italic text-sm">System Nodes</h3>
                    <UButton color="neutral" variant="ghost" size="xs" icon="i-lucide-maximize-2" />
                </div>
            </template>
            <UTable :columns="nodeColumns" :data="nodes" :ui="{
                thead: 'bg-neutral-50 dark:bg-neutral-900 border-b border-default',
                th: 'px-6 text-[10px] font-bold uppercase text-dimmed tracking-widest',
                td: 'px-6 text-xs'
            }">
                <template #id-cell="{ row }">
                    <span class="font-medium">{{ row.getValue('id') }}</span>
                </template>
                <template #status-cell="{ row }">
                    <UBadge color="success" variant="subtle" size="sm" class="rounded-full">
                        {{ row.getValue('status') }}
                    </UBadge>
                </template>
                <template #load-cell="{ row }">
                    <span class="font-black italic text-right block w-full">{{ row.getValue('load') }}</span>
                </template>
            </UTable>
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 5: Complex Analytics
         ========================================================================== -->
    <section class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <!-- 15. Split Metrics Card -->
        <UCard class="lg:col-span-2" :ui="{ body: 'px-0 sm:px-0' }">
            <div class="grid grid-cols-3 divide-x divide-default h-full items-center">
                <div class="text-center px-4">
                    <p class="text-[10px] text-dimmed font-bold uppercase mb-1 tracking-widest">CPU</p>
                    <p class="text-2xl font-black">42%</p>
                    <UIcon name="i-lucide-cpu" class="size-4 text-primary mt-2 mx-auto" />
                </div>
                <div class="text-center px-4">
                    <p class="text-[10px] text-dimmed font-bold uppercase mb-1 tracking-widest">RAM</p>
                    <p class="text-2xl font-black">8.2<span class="text-xs font-medium">GB</span></p>
                    <UIcon name="i-lucide-memory-stick" class="size-4 text-info mt-2 mx-auto" />
                </div>
                <div class="text-center px-4">
                    <p class="text-[10px] text-dimmed font-bold uppercase mb-1 tracking-widest">Disk</p>
                    <p class="text-2xl font-black text-error">92%</p>
                    <UIcon name="i-lucide-hard-drive" class="size-4 text-error mt-2 mx-auto" />
                </div>
            </div>
        </UCard>

        <!-- 16. Circular Gauge Card -->
        <UCard :ui="{ body: 'flex flex-col items-center justify-center gap-4' }">
            <div class="relative size-24">
                <svg class="size-full" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"
                        stroke="currentColor" stroke-width="3" class="text-neutral-100 dark:text-neutral-800" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"
                        stroke="currentColor" stroke-width="3" stroke-dasharray="85, 100" class="text-success" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xl font-black italic">85%</div>
            </div>
            <p class="text-xs font-bold text-dimmed uppercase tracking-widest">Customer Satisfaction</p>
        </UCard>

        <!-- 17. Financial Snapshot Card -->
        <UCard title="Financial Snapshot" :ui="{ body: 'space-y-4' }">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="size-2 rounded-full bg-primary" />
                    <span class="text-xs text-dimmed font-bold">Revenue</span>
                </div>
                <span class="text-sm font-black">$24.5k</span>
            </div>
            <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                    <div class="size-2 rounded-full bg-error" />
                    <span class="text-xs text-dimmed font-bold">Expenses</span>
                </div>
                <span class="text-sm font-black">$12.8k</span>
            </div>
            <div class="border-t border-default pt-4 flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-widest text-dimmed">Net Profit</span>
                <span class="text-lg font-black italic text-success">$11.7k</span>
            </div>
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 6: Traffic & Retention
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <!-- 18. Traffic Source Card -->
        <UCard title="Traffic Sources">
            <div class="space-y-3">
                <div v-for="source in trafficSources" :key="source.source" class="space-y-1">
                    <div class="flex justify-between text-[10px] font-bold uppercase items-center">
                        <div class="flex items-center gap-1.5">
                            <UIcon :name="source.icon" class="size-3 text-dimmed" />
                            <span class="text-dimmed">{{ source.source }}</span>
                        </div>
                        <span>{{ source.value }}%</span>
                    </div>
                    <UProgress :model-value="source.value" :color="source.color" size="sm" />
                </div>
            </div>
        </UCard>

        <!-- 19. Retention Card -->
        <UCard title="User Retention" description="Percentage of users returning over 8 weeks.">
            <div class="flex items-end gap-1 h-32 mt-4">
                <div v-for="(v, i) in retentionData" :key="i" :style="{ height: `${v}%` }"
                    class="flex-1 bg-primary/40 hover:bg-primary transition-all rounded-t-md relative group">
                    <div
                        class="absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {{ v }}%
                    </div>
                </div>
            </div>
            <div class="flex justify-between mt-2 text-[10px] text-dimmed font-bold uppercase">
                <span>Week 1</span>
                <span>Week 8</span>
            </div>
        </UCard>

        <!-- 20. System Health Card -->
        <UCard class="bg-neutral-950 border-neutral-800">
            <div class="flex items-center gap-2 mb-6">
                <div
                    class="relative flex items-center justify-center size-3 before:content-[''] before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-success/60">
                    <UChip color="success" size="md" class="relative" standalone inset :ui="{ base: 'ring-0' }" />
                </div>
                <h3 class="text-sm font-black italic text-white uppercase tracking-widest">System Health</h3>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <p class="text-[10px] text-neutral-500 font-bold uppercase">Uptime</p>
                    <p class="text-lg font-black text-white italic">99.9%</p>
                </div>
                <div class="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <p class="text-[10px] text-neutral-500 font-bold uppercase">Alerts</p>
                    <p class="text-lg font-black text-white italic">0</p>
                </div>
            </div>
            <UButton label="View Detailed Logs" block color="neutral" variant="ghost" size="xs"
                class="mt-6 text-neutral-400 hover:text-white" />
        </UCard>
    </section>
</template>