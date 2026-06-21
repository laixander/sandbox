<script setup lang="ts">
// ============================================================================
// Page Configuration
// ============================================================================
definePageMeta({
    title: 'SaaS Cards'
})

// ============================================================================
// Mock Data
// ============================================================================

const projectOverview = {
    title: 'Website Redesign',
    client: 'Acme Corp',
    progress: 75,
    dueDate: 'Nov 15',
    status: 'On Track',
    color: 'success',
    team: [
        'https://i.pravatar.cc/150?u=p1',
        'https://i.pravatar.cc/150?u=p2',
        'https://i.pravatar.cc/150?u=p3'
    ]
} as const

const taskManagement = {
    title: 'Implement OAuth2 Flow',
    id: 'TSK-842',
    priority: 'High',
    status: 'In Progress',
    dueDate: 'Tomorrow',
    comments: 4,
    attachments: 2,
    assignee: 'https://i.pravatar.cc/150?u=t1'
}

const calendarEvent = {
    title: 'Q3 Roadmap Planning',
    type: 'Video Call',
    date: 'Today, 2:00 PM',
    duration: '45m',
    attendees: [
        { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=c1' },
        { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=c2' },
        { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=c3' }
    ]
}

const documentPreview = {
    name: 'Q3_Financial_Report.pdf',
    type: 'PDF Document',
    size: '4.2 MB',
    modified: '2 hours ago',
    author: 'Finance Team',
    icon: 'i-lucide-file-text',
    color: 'error'
} as const

const workspaceSummary = {
    name: 'Engineering',
    activeUsers: 24,
    totalUsers: 28,
    uptime: '99.9%',
    storageUsed: 65,
    storageTotal: 100
}

const aiAssistant = {
    prompt: 'Summarize the latest feedback from beta users regarding the new dashboard.',
    suggestion: 'Beta Feedback Summary',
    output: 'Users generally appreciate the new layout, citing a 30% reduction in navigation time. However, 15% reported issues finding the export functionality, suggesting a need for better discoverability.',
    tokens: 142
}

const workflowStep = {
    name: 'Data Validation',
    status: 'Running',
    progress: 45,
    logs: [
        'Checking schema matching...',
        'Validating required fields...',
        'Processing row 452/1000'
    ]
}

const integrationStatus = {
    name: 'Salesforce',
    status: 'Connected',
    lastSync: '10m ago',
    recordsSynced: '1,240',
    icon: 'i-lucide-cloud',
    color: 'info'
} as const

const teamMember = {
    name: 'Elena Rodriguez',
    role: 'Senior Backend Engineer',
    department: 'Core Platform',
    avatar: 'https://i.pravatar.cc/150?u=tm1',
    status: 'In a meeting',
    timezone: 'PST (10:45 AM)'
}

const meetingNotes = {
    title: 'Product Sync',
    date: 'Oct 24',
    participants: 4,
    actionItems: [
        { text: 'Finalize API specs', owner: 'Elena', done: true },
        { text: 'Review design mocks', owner: 'Jordan', done: false }
    ]
}

const timeTracking = {
    task: 'UI Implementation',
    project: 'Dashboard v2',
    logged: '4h 30m',
    estimated: '8h 00m',
    progress: 56
}

const clientAccount = {
    company: 'TechFlow Solutions',
    contact: 'Mark Johnson',
    mrr: '$4,500',
    health: 'Good',
    renewal: 'Dec 1st',
    logo: 'i-lucide-briefcase'
}

const supportTicket = {
    id: '#TK-4092',
    title: 'Cannot access billing page',
    user: 'j.doe@example.com',
    priority: 'Urgent',
    status: 'Open',
    sla: '1h 15m remaining'
}

const pipelineStage = {
    stage: 'Negotiation',
    deals: 12,
    value: '$124,000',
    conversion: '45%',
    trend: 'up'
}

const featureRequest = {
    title: 'Dark Mode Support',
    category: 'UI/UX',
    upvotes: 342,
    status: 'Planned',
    author: 'https://i.pravatar.cc/150?u=fr1'
}

const deploymentStatus = {
    environment: 'Production',
    version: 'v2.4.1',
    status: 'Deploying',
    progress: 80,
    steps: ['Build', 'Test', 'Deploy', 'Verify']
}

const apiUsage = {
    plan: 'Pro Plan',
    requests: '845k',
    limit: '1M',
    latency: '124ms',
    errorRate: '0.01%'
}

const workspaceAccess = {
    role: 'Administrator',
    users: 3,
    permissions: ['Billing', 'Settings', 'Users'],
    lastAudit: '2 days ago'
}

const knowledgeBase = {
    title: 'How to configure custom domains',
    category: 'Setup Guide',
    readTime: '5 min read',
    helpful: '94%',
    views: '1.2k'
}

const announcement = {
    title: 'Scheduled Maintenance',
    date: 'This Sunday, 2:00 AM UTC',
    content: 'We will be performing database upgrades. Expect up to 15 minutes of downtime.',
    type: 'warning'
} as const

</script>

<template>
    <!-- ==========================================================================
         Header Section
         ========================================================================== -->
    <UPageCard title="SaaS & Productivity"
        description="A collection of specialized components for dashboards, project management, and business applications."
        variant="naked" />

    <!-- ==========================================================================
         Section 1: Project & Tasks
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 1. Project Overview Card -->
        <UCard class="hover:border-primary/50 transition-colors">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="font-bold text-lg">{{ projectOverview.title }}</h3>
                    <p class="text-xs text-dimmed">{{ projectOverview.client }}</p>
                </div>
                <UBadge :label="projectOverview.status" :color="projectOverview.color" variant="subtle" size="sm" />
            </div>
            <div class="space-y-2 mb-6">
                <div class="flex justify-between text-xs font-bold">
                    <span>Progress</span>
                    <span>{{ projectOverview.progress }}%</span>
                </div>
                <UProgress :model-value="projectOverview.progress" :color="projectOverview.color" size="sm" />
            </div>
            <div class="flex items-center justify-between border-t border-default pt-4">
                <div class="flex -space-x-2">
                    <UAvatar v-for="(avatar, i) in projectOverview.team" :key="i" :src="avatar" size="sm"
                        class="ring-2 ring-white dark:ring-neutral-950" />
                </div>
                <div class="flex items-center gap-1.5 text-xs font-bold text-dimmed">
                    <UIcon name="i-lucide-calendar" class="size-4" />
                    <span>{{ projectOverview.dueDate }}</span>
                </div>
            </div>
        </UCard>

        <!-- 2. Task Management Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }" class="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div class="p-4 border-l-4 border-l-error bg-neutral-50 dark:bg-neutral-900/30">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[10px] font-bold text-dimmed uppercase tracking-widest">{{ taskManagement.id
                    }}</span>
                    <UBadge :label="taskManagement.priority" color="error" variant="soft" size="xs" />
                </div>
                <h4 class="font-bold text-sm mb-4 leading-tight">{{ taskManagement.title }}</h4>
                <div class="flex items-center justify-between">
                    <div class="flex gap-3 text-xs text-dimmed font-medium">
                        <div class="flex items-center gap-1">
                            <UIcon name="i-lucide-message-square" class="size-3.5" />
                            <span>{{ taskManagement.comments }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <UIcon name="i-lucide-paperclip" class="size-3.5" />
                            <span>{{ taskManagement.attachments }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-dimmed">{{ taskManagement.dueDate }}</span>
                        <UAvatar :src="taskManagement.assignee" size="xs" />
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 3. Calendar Event Card -->
        <UCard class="border-primary/20 bg-primary/5 group">
            <div class="flex gap-4 items-start">
                <div
                    class="bg-primary text-white rounded-xl p-3 flex flex-col items-center justify-center min-w-[60px] group-hover:scale-105 transition-transform">
                    <UIcon name="i-lucide-video" class="size-6 mb-1" />
                    <span class="text-[10px] font-black uppercase tracking-widest">Meet</span>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-base">{{ calendarEvent.title }}</h3>
                    <p class="text-xs text-primary font-bold mt-1">{{ calendarEvent.date }}</p>
                    <p class="text-xs text-dimmed mb-4">{{ calendarEvent.duration }} • {{ calendarEvent.type }}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex -space-x-1.5">
                            <UAvatar v-for="(attendee, i) in calendarEvent.attendees" :key="i" :src="attendee.avatar"
                                size="xs" class="ring-2 ring-primary-50 dark:ring-primary-950" />
                        </div>
                        <UButton label="Join" color="primary" size="xs" class="rounded-full px-4" />
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 4. Document Preview Card -->
        <UCard :ui="{ body: 'flex items-center gap-4' }"
            class="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors cursor-pointer">
            <div :class="`bg-${documentPreview.color}/10 text-${documentPreview.color}`"
                class="size-12 rounded-xl flex items-center justify-center shrink-0">
                <UIcon :name="documentPreview.icon" class="size-6" />
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="font-bold text-sm truncate">{{ documentPreview.name }}</h4>
                <p class="text-[10px] text-dimmed mt-0.5">{{ documentPreview.size }} • Modified {{
                    documentPreview.modified }}</p>
            </div>
            <UButton icon="i-lucide-download" variant="ghost" color="neutral" size="sm" />
        </UCard>

        <!-- 5. Workspace Summary Card -->
        <UCard title="Workspace Health" class="relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <UIcon name="i-lucide-activity" class="size-32" />
            </div>
            <div class="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest mb-1">Active Users</p>
                    <p class="text-2xl font-black">{{ workspaceSummary.activeUsers }}<span
                            class="text-sm text-dimmed font-medium ml-1">/ {{ workspaceSummary.totalUsers }}</span>
                    </p>
                </div>
                <div>
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest mb-1">System Uptime</p>
                    <p class="text-2xl font-black text-success">{{ workspaceSummary.uptime }}</p>
                </div>
            </div>
            <div class="mt-6">
                <div class="flex justify-between text-xs font-bold mb-2">
                    <span>Storage</span>
                    <span>{{ workspaceSummary.storageUsed }}GB / {{ workspaceSummary.storageTotal }}GB</span>
                </div>
                <UProgress :model-value="workspaceSummary.storageUsed" color="primary" size="sm" />
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 2: Workspaces & AI
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 6. AI Assistant Card -->
        <UCard class="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
            <div class="flex items-center gap-2 mb-4">
                <UIcon name="i-lucide-sparkles" class="size-5 text-primary" />
                <span class="text-xs font-bold uppercase tracking-widest text-primary">AI Insights</span>
            </div>
            <div class="bg-white dark:bg-neutral-950 rounded-xl p-3 border border-default shadow-sm mb-4">
                <p class="text-xs font-medium text-dimmed italic">"{{ aiAssistant.prompt }}"</p>
            </div>
            <div class="pl-4 border-l-2 border-primary">
                <h4 class="font-bold text-sm mb-2">{{ aiAssistant.suggestion }}</h4>
                <p class="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{{ aiAssistant.output }}
                </p>
            </div>
            <template #footer>
                <div class="flex justify-between items-center">
                    <span class="text-[10px] text-dimmed">{{ aiAssistant.tokens }} tokens used</span>
                    <div class="flex gap-2">
                        <UButton icon="i-lucide-copy" variant="ghost" color="neutral" size="xs" />
                        <UButton label="Insert" color="primary" size="xs" />
                    </div>
                </div>
            </template>
        </UCard>

        <!-- 7. Automation Workflow Card -->
        <UCard title="Active Workflow">
            <div class="flex items-center gap-3 mb-4">
                <div
                    class="relative flex items-center justify-center size-3 before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary/60">
                    <div class="size-2 rounded-full bg-primary relative" />
                </div>
                <h3 class="font-bold text-sm">{{ workflowStep.name }}</h3>
            </div>
            <UProgress :model-value="workflowStep.progress" color="primary" size="sm" class="mb-4" />
            <div
                class="bg-neutral-950 rounded-lg p-3 font-mono text-[10px] space-y-1.5 border border-neutral-800 text-neutral-400">
                <div v-for="(log, i) in workflowStep.logs" :key="i" class="flex gap-2">
                    <span class="text-primary/50">></span>
                    <span class="truncate">{{ log }}</span>
                </div>
                <div class="w-1.5 h-3 bg-primary animate-pulse inline-block align-middle ml-1" />
            </div>
        </UCard>

        <!-- 8. Integration Status Card -->
        <UCard class="group hover:border-info/50 transition-colors">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div
                        class="size-10 rounded-xl bg-info/10 text-info flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UIcon :name="integrationStatus.icon" class="size-5" />
                    </div>
                    <h3 class="font-bold">{{ integrationStatus.name }}</h3>
                </div>
                <USwitch :model-value="true" color="info" />
            </div>
            <div class="grid grid-cols-2 gap-4 border-t border-default pt-4">
                <div>
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest mb-1">Status</p>
                    <div class="flex items-center gap-1.5 text-xs font-bold text-success">
                        <UIcon name="i-lucide-check-circle" class="size-3.5" />
                        <span>{{ integrationStatus.status }}</span>
                    </div>
                </div>
                <div>
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest mb-1">Last Sync</p>
                    <p class="text-xs font-medium">{{ integrationStatus.lastSync }}</p>
                </div>
            </div>
        </UCard>

        <!-- 9. Team Member Card -->
        <UCard>
            <div class="flex items-center gap-4">
                <div class="relative">
                    <UAvatar :src="teamMember.avatar" size="lg" />
                    <div
                        class="absolute bottom-0 right-0 size-3 rounded-full bg-warning border-2 border-white dark:border-neutral-950" />
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-base truncate">{{ teamMember.name }}</h3>
                    <p class="text-xs text-dimmed truncate">{{ teamMember.role }}</p>
                </div>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
                <UBadge :label="teamMember.department" color="neutral" variant="soft" size="xs" />
                <UBadge icon="i-lucide-clock" :label="teamMember.timezone" color="neutral" variant="soft" size="xs" />
            </div>
            <div class="mt-4 pt-4 border-t border-default flex gap-2">
                <UButton label="Message" color="neutral" variant="soft" block class="flex-1" />
                <UButton icon="i-lucide-more-horizontal" color="neutral" variant="soft" />
            </div>
        </UCard>

        <!-- 10. Meeting Notes Card -->
        <UCard class="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800/30">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                    <UIcon name="i-lucide-file-edit" class="size-5" />
                    <h3 class="font-bold">{{ meetingNotes.title }}</h3>
                </div>
                <span class="text-xs font-bold text-yellow-600/70">{{ meetingNotes.date }}</span>
            </div>
            <div class="space-y-2">
                <p class="text-xs font-bold uppercase tracking-widest text-yellow-600/70 mb-2">Action Items</p>
                <div v-for="(item, i) in meetingNotes.actionItems" :key="i" class="flex items-start gap-2">
                    <UCheckbox :model-value="item.done" color="primary" />
                    <div class="flex-1 pt-0.5">
                        <p class="text-sm leading-none" :class="item.done ? 'line-through text-dimmed' : ''">{{
                            item.text }}</p>
                        <p class="text-[10px] text-dimmed mt-1">@{{ item.owner }}</p>
                    </div>
                </div>
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 3: Operations & Logistics
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 11. Time Tracking Card -->
        <UCard>
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="font-bold text-sm">{{ timeTracking.task }}</h3>
                    <p class="text-xs text-dimmed">{{ timeTracking.project }}</p>
                </div>
                <UButton icon="i-lucide-play" color="primary" size="sm"
                    class="rounded-full shadow-lg shadow-primary/20" />
            </div>
            <div class="flex items-end justify-between mb-2">
                <div class="text-2xl font-black">{{ timeTracking.logged }}</div>
                <div class="text-xs text-dimmed font-medium">of {{ timeTracking.estimated }}</div>
            </div>
            <UProgress :model-value="timeTracking.progress" color="primary" size="sm" />
        </UCard>

        <!-- 12. Client Account Card -->
        <UCard>
            <div class="flex items-center gap-3 mb-4">
                <div
                    class="size-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-dimmed">
                    <UIcon :name="clientAccount.logo" class="size-5" />
                </div>
                <div>
                    <h3 class="font-bold text-base">{{ clientAccount.company }}</h3>
                    <p class="text-xs text-dimmed">{{ clientAccount.contact }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 border-y border-default py-4 mb-4">
                <div>
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest mb-1">Monthly Rev</p>
                    <p class="text-lg font-black italic">{{ clientAccount.mrr }}</p>
                </div>
                <div>
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest mb-1">Health</p>
                    <p class="text-lg font-black text-success">{{ clientAccount.health }}</p>
                </div>
            </div>
            <div class="flex items-center justify-between text-xs text-dimmed">
                <span>Renewal: {{ clientAccount.renewal }}</span>
                <UButton label="View Profile" variant="link" color="primary" class="p-0 text-xs" />
            </div>
        </UCard>

        <!-- 13. Support Ticket Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }">
            <div class="p-4 sm:p-6 border-l-6 border-l-warning">
                <div class="flex justify-between items-start mb-2">
                    <UBadge :label="supportTicket.id" color="neutral" variant="soft" size="xs" class="font-mono" />
                    <UBadge :label="supportTicket.priority" color="warning" variant="subtle" size="xs"
                        class="uppercase font-black" />
                </div>
                <h3 class="font-bold text-sm mb-1">{{ supportTicket.title }}</h3>
                <p class="text-xs text-dimmed mb-4">{{ supportTicket.user }}</p>
                <div class="flex items-center justify-between border-t border-default pt-3">
                    <div class="flex items-center gap-1.5 text-xs text-warning font-bold">
                        <UIcon name="i-lucide-clock" class="size-3.5" />
                        <span>SLA: {{ supportTicket.sla }}</span>
                    </div>
                    <UAvatar src="https://i.pravatar.cc/150?u=sup1" size="xs" />
                </div>
            </div>
        </UCard>

        <!-- 14. Pipeline Stage Card -->
        <UCard class="bg-neutral-50 dark:bg-neutral-900/50">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-sm uppercase tracking-widest text-dimmed">{{ pipelineStage.stage }}</h3>
                <UBadge :label="`${pipelineStage.deals} Deals`" color="primary" variant="soft" size="xs" />
            </div>
            <div class="text-3xl font-black italic mb-4">{{ pipelineStage.value }}</div>
            <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-dimmed">Conversion Rate</span>
                <div class="flex items-center gap-1 text-success">
                    <span>{{ pipelineStage.conversion }}</span>
                    <UIcon name="i-lucide-trending-up" class="size-3" />
                </div>
            </div>
        </UCard>

        <!-- 15. Feature Request Card -->
        <UCard class="hover:shadow-md transition-shadow cursor-pointer">
            <div class="flex gap-4">
                <div
                    class="flex flex-col items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 min-w-[50px] shrink-0">
                    <UIcon name="i-lucide-chevron-up" class="size-5 text-dimmed" />
                    <span class="font-black">{{ featureRequest.upvotes }}</span>
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-1">
                        <UBadge :label="featureRequest.category" color="neutral" variant="soft" size="xs" />
                        <UBadge :label="featureRequest.status" color="primary" variant="subtle" size="xs" />
                    </div>
                    <h3 class="font-bold text-base mt-2">{{ featureRequest.title }}</h3>
                    <div class="flex items-center gap-2 mt-3">
                        <UAvatar :src="featureRequest.author" size="2xs" />
                        <span class="text-xs text-dimmed">Requested by user</span>
                    </div>
                </div>
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 4: System & Infrastructure
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 16. Deployment Status Card -->
        <UCard>
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-rocket" class="size-5 text-primary" />
                    <h3 class="font-bold text-sm">{{ deploymentStatus.environment }} Deploy</h3>
                </div>
                <UBadge :label="deploymentStatus.version" color="neutral" variant="solid" size="xs" class="font-mono" />
            </div>
            <div class="mb-6">
                <div class="flex justify-between text-xs font-bold mb-2">
                    <span class="text-primary">{{ deploymentStatus.status }}...</span>
                    <span>{{ deploymentStatus.progress }}%</span>
                </div>
                <UProgress :model-value="deploymentStatus.progress" color="primary" size="sm" class="animate-pulse" />
            </div>
            <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-dimmed">
                <span v-for="(step, i) in deploymentStatus.steps" :key="i" :class="i < 3 ? 'text-primary' : ''">
                    {{ step }}
                    <UIcon v-if="i < deploymentStatus.steps.length - 1" name="i-lucide-chevron-right"
                        class="size-3 align-middle mx-1" />
                </span>
            </div>
        </UCard>

        <!-- 17. API Usage Card -->
        <UCard title="API Quota">
            <template #header>
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-sm">API Usage</h3>
                    <UBadge :label="apiUsage.plan" color="neutral" variant="soft" size="xs" />
                </div>
            </template>
            <div class="flex items-end justify-between mb-2">
                <div class="text-2xl font-black">{{ apiUsage.requests }}</div>
                <div class="text-xs text-dimmed font-medium">/ {{ apiUsage.limit }} reqs</div>
            </div>
            <UProgress :model-value="84.5" color="warning" size="sm" class="mb-6" />
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-2 text-center">
                    <p class="text-[10px] text-dimmed font-bold uppercase">Avg Latency</p>
                    <p class="text-sm font-black">{{ apiUsage.latency }}</p>
                </div>
                <div class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-2 text-center">
                    <p class="text-[10px] text-dimmed font-bold uppercase">Error Rate</p>
                    <p class="text-sm font-black text-success">{{ apiUsage.errorRate }}</p>
                </div>
            </div>
        </UCard>

        <!-- 18. Workspace Access Card -->
        <UCard class="border-error/20">
            <div class="flex items-center gap-3 mb-4">
                <div class="size-10 rounded-full bg-error/10 text-error flex items-center justify-center">
                    <UIcon name="i-lucide-shield-alert" class="size-5" />
                </div>
                <div>
                    <h3 class="font-bold text-base">{{ workspaceAccess.role }} Access</h3>
                    <p class="text-xs text-dimmed">{{ workspaceAccess.users }} users assigned</p>
                </div>
            </div>
            <div class="space-y-2 mb-4">
                <p class="text-[10px] font-bold text-dimmed uppercase tracking-widest">Permissions</p>
                <div class="flex flex-wrap gap-2">
                    <UBadge v-for="perm in workspaceAccess.permissions" :key="perm" :label="perm" color="neutral"
                        variant="soft" size="xs" />
                </div>
            </div>
            <div class="flex items-center justify-between border-t border-default pt-4 text-xs">
                <span class="text-dimmed">Audited: {{ workspaceAccess.lastAudit }}</span>
                <UButton label="Manage" color="error" variant="ghost" size="xs" class="font-bold" />
            </div>
        </UCard>

        <!-- 19. Knowledge Base Card -->
        <UCard class="group hover:border-primary/50 cursor-pointer transition-colors">
            <UBadge :label="knowledgeBase.category" color="primary" variant="subtle" size="xs" class="mb-3" />
            <h3 class="font-bold text-base leading-tight mb-4 group-hover:text-primary transition-colors">{{
                knowledgeBase.title
            }}</h3>
            <div class="flex items-center gap-4 text-xs text-dimmed font-medium">
                <div class="flex items-center gap-1">
                    <UIcon name="i-lucide-clock" class="size-3.5" />
                    <span>{{ knowledgeBase.readTime }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <UIcon name="i-lucide-thumbs-up" class="size-3.5" />
                    <span>{{ knowledgeBase.helpful }} helpful</span>
                </div>
            </div>
        </UCard>

        <!-- 20. Announcement Card -->
        <UCard class="bg-primary text-white border-0">
            <div class="flex items-start gap-4">
                <div class="p-2 bg-white/20 rounded-lg shrink-0">
                    <UIcon name="i-lucide-megaphone" class="size-6" />
                </div>
                <div>
                    <h3 class="font-bold text-lg leading-tight mb-1">{{ announcement.title }}</h3>
                    <p class="text-xs text-primary-200 font-bold uppercase tracking-widest mb-3">{{
                        announcement.date }}</p>
                    <p class="text-sm text-primary-100 leading-relaxed">{{ announcement.content }}</p>
                    <div class="mt-4 flex gap-2">
                        <UButton label="View Details" color="neutral" variant="solid" size="sm"
                            class="text-primary font-bold" />
                        <UButton label="Dismiss" color="neutral" variant="ghost" size="sm" />
                    </div>
                </div>
            </div>
        </UCard>

    </section>
</template>
