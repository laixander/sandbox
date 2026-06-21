<script setup lang="ts">
// ============================================================================
// Page Configuration
// ============================================================================
definePageMeta({
    title: 'Social Cards'
})

// ============================================================================
// Mock Data
// ============================================================================

const post = {
    user: { name: 'Alex Rivera', handle: '@arivera', avatar: 'https://i.pravatar.cc/150?u=a' },
    time: '2h ago',
    content: 'Just deployed the new AI orchestration engine. The performance gains are incredible! 🚀 #buildinpublic',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
    stats: { likes: '1.2k', comments: '342', shares: '89' }
}

const stories = [
    { id: 1, user: 'Your Story', avatar: 'https://i.pravatar.cc/150?u=you', active: false, isAdd: true },
    { id: 2, user: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=s', active: true, isAdd: false },
    { id: 3, user: 'Mike', avatar: 'https://i.pravatar.cc/150?u=m', active: true, isAdd: false },
    { id: 4, user: 'Emma', avatar: 'https://i.pravatar.cc/150?u=e', active: false, isAdd: false }
]

const profile = {
    name: 'Jordan Lee',
    role: 'Lead Designer',
    avatar: 'https://i.pravatar.cc/150?u=j',
    banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60',
    bio: 'Crafting digital experiences. Coffee enthusiast. ☕️',
    stats: { followers: '12.5k', following: '842', posts: '450' }
}

const group = {
    name: 'Creative Coders',
    members: '4.2k',
    description: 'A community for developers who love design and art.',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
    avatars: ['https://i.pravatar.cc/150?u=g1', 'https://i.pravatar.cc/150?u=g2', 'https://i.pravatar.cc/150?u=g3']
}

const event = {
    title: 'Design Systems Meetup',
    date: 'OCT 24',
    time: '6:00 PM EST',
    location: 'Virtual Event',
    attendees: 156,
    color: 'primary'
} as const

const thread = {
    user: 'David Kim',
    avatar: 'https://i.pravatar.cc/150?u=d',
    time: '1h',
    content: 'What is your preferred state management library for Vue 3?',
    replies: [
        { user: 'Elena', avatar: 'https://i.pravatar.cc/150?u=el', content: 'Pinia all the way. It is so much cleaner and intuitive.', time: '45m' },
        { user: 'Chris', avatar: 'https://i.pravatar.cc/150?u=c', content: 'Agreed, Pinia is the standard now.', time: '10m' }
    ]
}

const friendSuggestions = [
    { name: 'Jessica Wu', role: 'Frontend Dev', avatar: 'https://i.pravatar.cc/150?u=jw', mutuals: 12 },
    { name: 'Marcus Fox', role: 'UX Researcher', avatar: 'https://i.pravatar.cc/150?u=mf', mutuals: 8 }
]

const liveStream = {
    title: 'Building a SaaS from scratch - Part 4',
    host: 'Tech Makers',
    viewers: '2.4k',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60'
}

const podcast = {
    title: 'The Future of Agentic AI',
    show: 'Tech Horizons',
    duration: '45:20',
    progress: 65,
    cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=60'
}

const creator = {
    name: 'Aria Stark',
    niche: 'Digital Art',
    followers: '250k',
    avatar: 'https://i.pravatar.cc/150?u=as',
    engagement: '8.4%',
    featured: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60'
}

const trending = [
    { rank: 1, topic: '#NuxtUI', volume: '124k posts' },
    { rank: 2, topic: 'Agentic Workflows', volume: '89k posts' },
    { rank: 3, topic: '#DesignTokens', volume: '45k posts' }
]

const poll = {
    question: 'Which framework do you use most for new projects?',
    votes: 4502,
    options: [
        { label: 'Nuxt 3', percentage: 65, color: 'primary' },
        { label: 'Next.js', percentage: 20, color: 'neutral' },
        { label: 'SvelteKit', percentage: 10, color: 'neutral' },
        { label: 'Other', percentage: 5, color: 'neutral' }
    ]
} as const

const gallery = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1515155075601-23009d0cb6d4?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60'
]

const badge = {
    title: 'Top Contributor',
    description: 'Awarded for exceptional community support.',
    date: 'Unlocked Oct 12',
    icon: 'i-lucide-award',
    color: 'warning'
} as const

const track = {
    title: 'Midnight City',
    artist: 'M83',
    albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=60',
    duration: '4:03',
    progress: 45
}

const repost = {
    user: 'Tech Insider',
    avatar: 'https://i.pravatar.cc/150?u=ti',
    content: 'Fascinating read on the architecture behind modern LLMs.',
    original: {
        user: 'AI Research Lab',
        handle: '@ailab',
        avatar: 'https://i.pravatar.cc/150?u=ai',
        content: 'We just published our paper on optimizing transformer attention heads for edge devices.'
    }
}

const forum = {
    title: 'How to structure a monorepo for Vue apps?',
    author: 'dev_guru',
    replies: 42,
    views: '1.2k',
    lastActive: '5m ago'
}

const notifications = [
    { id: 1, user: 'Alex', action: 'liked your post', icon: 'i-lucide-heart', color: 'error', time: '2m' },
    { id: 2, user: 'Sarah', action: 'mentioned you', icon: 'i-lucide-at-sign', color: 'primary', time: '1h' },
    { id: 3, user: 'Creative Coders', action: 'posted a new update', icon: 'i-lucide-users', color: 'info', time: '3h' }
] as const

const challenge = {
    title: '7 Days of Code',
    progress: 4,
    total: 7,
    reward: 'Exclusive Profile Badge',
    color: 'success'
} as const

const commerce = {
    product: 'Minimalist Setup Desk',
    price: '$450',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=60',
    brand: 'Ergo Workspace'
}

</script>

<template>
    <!-- ==========================================================================
         Header Section
         ========================================================================== -->
    <UPageCard title="Social Media & Community"
        description="A high-fidelity collection of social feed, profile, and community engagement components."
        variant="naked" />

    <!-- ==========================================================================
         Section 1: Social Feed & Profile
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 1. Social Post Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }"
            class="group hover:shadow-xl transition-shadow duration-300">
            <div class="p-4 flex gap-3 items-center">
                <UAvatar :src="post.user.avatar" size="md" />
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-1">
                        <h3 class="font-bold text-sm truncate">{{ post.user.name }}</h3>
                        <UIcon name="i-lucide-badge-check" class="size-3.5 text-primary" />
                    </div>
                    <p class="text-[10px] text-dimmed uppercase font-bold tracking-widest">{{ post.time }}</p>
                </div>
                <UButton icon="i-lucide-more-horizontal" variant="ghost" color="neutral" size="xs" />
            </div>
            <div class="px-4 pb-3">
                <p class="text-sm leading-relaxed">{{ post.content }}</p>
            </div>
            <div class="aspect-video relative bg-neutral-100 dark:bg-neutral-900">
                <img :src="post.image" class="w-full h-full object-cover" />
            </div>
            <div class="p-2 border-t border-default flex justify-between">
                <UButton icon="i-lucide-heart" :label="post.stats.likes" variant="ghost" color="neutral" size="sm"
                    class="hover:text-error" />
                <UButton icon="i-lucide-message-circle" :label="post.stats.comments" variant="ghost" color="neutral"
                    size="sm" />
                <UButton icon="i-lucide-share-2" :label="post.stats.shares" variant="ghost" color="neutral" size="sm" />
            </div>
        </UCard>

        <!-- 2. Story Preview Card -->
        <UCard title="Stories">
            <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                <div v-for="story in stories" :key="story.id"
                    class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                    <div class="relative">
                        <div class="size-16 rounded-full p-0.5"
                            :class="story.active ? 'bg-gradient-to-tr from-primary to-purple-500' : 'bg-neutral-200 dark:bg-neutral-800'">
                            <UAvatar :src="story.avatar"
                                class="size-full border-2 border-white dark:border-neutral-950" />
                        </div>
                        <div v-if="story.isAdd"
                            class="absolute bottom-0 right-0 size-5 bg-primary text-white rounded-full border-2 border-white dark:border-neutral-950 flex items-center justify-center">
                            <UIcon name="i-lucide-plus" class="size-3" />
                        </div>
                    </div>
                    <span class="text-[10px] font-bold truncate w-16 text-center"
                        :class="!story.active && !story.isAdd ? 'text-dimmed' : ''">{{ story.user }}</span>
                </div>
            </div>
        </UCard>

        <!-- 3. Profile Intro Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }" class="overflow-hidden">
            <div class="h-24 relative bg-neutral-100 dark:bg-neutral-900">
                <img :src="profile.banner" class="w-full h-full object-cover opacity-80" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div class="px-6 pb-6 relative">
                <div class="flex justify-between items-end -mt-10 mb-4">
                    <div class="p-1 bg-white dark:bg-neutral-950 rounded-2xl">
                        <UAvatar :src="profile.avatar" size="3xl" class="rounded-xl" />
                    </div>
                    <div class="flex gap-2">
                        <UButton icon="i-lucide-mail" variant="soft" color="neutral" class="rounded-xl" />
                        <UButton label="Follow" color="primary" class="rounded-xl font-bold px-6" />
                    </div>
                </div>
                <div>
                    <h2 class="text-xl font-black">{{ profile.name }}</h2>
                    <p class="text-sm text-dimmed">{{ profile.role }}</p>
                </div>
                <p class="text-sm mt-4 leading-relaxed">{{ profile.bio }}</p>
                <div class="flex gap-6 mt-6">
                    <div>
                        <span class="font-black">{{ profile.stats.followers }}</span>
                        <span class="text-[10px] text-dimmed font-bold uppercase ml-1">Followers</span>
                    </div>
                    <div>
                        <span class="font-black">{{ profile.stats.following }}</span>
                        <span class="text-[10px] text-dimmed font-bold uppercase ml-1">Following</span>
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 4. Community Group Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }"
            class="overflow-hidden hover:ring-2 ring-primary/50 transition-all cursor-pointer">
            <div class="aspect-[21/9] relative">
                <img :src="group.banner" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                        <h3 class="text-white font-black text-lg">{{ group.name }}</h3>
                        <p class="text-white/70 text-xs mt-1">{{ group.members }} members</p>
                    </div>
                    <UButton label="Join" size="xs" color="neutral" variant="solid" class="text-black font-bold" />
                </div>
            </div>
            <div class="p-4">
                <p class="text-sm text-dimmed">{{ group.description }}</p>
                <div class="mt-4 flex items-center justify-between">
                    <div class="flex -space-x-2">
                        <UAvatar v-for="avatar in group.avatars" :key="avatar" :src="avatar" size="sm"
                            class="ring-2 ring-white dark:ring-neutral-950" />
                        <div
                            class="size-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold ring-2 ring-white dark:ring-neutral-950">
                            +12
                        </div>
                    </div>
                    <UIcon name="i-lucide-arrow-right" class="size-4 text-dimmed" />
                </div>
            </div>
        </UCard>

        <!-- 5. Event Invitation Card -->
        <UCard class="relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-2xl" />
            <div class="flex gap-5 items-start pl-2">
                <div
                    class="bg-primary/10 text-primary rounded-xl flex flex-col items-center justify-center p-3 min-w-[70px]">
                    <span class="text-[10px] font-black uppercase tracking-widest">{{ event.date.split(' ')[0]
                    }}</span>
                    <span class="text-2xl font-black">{{ event.date.split(' ')[1] }}</span>
                </div>
                <div class="flex-1">
                    <UBadge label="Upcoming" variant="subtle" color="primary" size="xs"
                        class="mb-2 uppercase font-black tracking-widest" />
                    <h3 class="font-bold text-lg leading-tight">{{ event.title }}</h3>
                    <div class="space-y-1 mt-2">
                        <div class="flex items-center gap-2 text-xs text-dimmed">
                            <UIcon name="i-lucide-clock" class="size-3.5" />
                            <span>{{ event.time }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-dimmed">
                            <UIcon name="i-lucide-map-pin" class="size-3.5" />
                            <span>{{ event.location }}</span>
                        </div>
                    </div>
                    <div class="mt-4 flex items-center justify-between">
                        <p class="text-xs font-bold">{{ event.attendees }} attending</p>
                        <UButton label="RSVP" color="primary" size="sm" class="px-6" />
                    </div>
                </div>
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 2: Interaction & Community
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 6. Comment Thread Card -->
        <UCard title="Discussion">
            <div class="flex gap-3">
                <UAvatar :src="thread.avatar" size="sm" class="shrink-0" />
                <div class="flex-1">
                    <div class="bg-neutral-50 dark:bg-neutral-900 rounded-2xl rounded-tl-none p-3">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-bold">{{ thread.user }}</span>
                            <span class="text-[10px] text-dimmed">{{ thread.time }}</span>
                        </div>
                        <p class="text-sm">{{ thread.content }}</p>
                    </div>
                    <div class="flex items-center gap-4 mt-2 px-2 text-xs font-bold text-dimmed">
                        <button class="hover:text-primary transition-colors">Like</button>
                        <button class="hover:text-primary transition-colors">Reply</button>
                    </div>

                    <!-- Replies -->
                    <div
                        class="mt-4 space-y-4 relative before:absolute before:top-0 before:bottom-4 before:-left-6 before:w-px before:bg-neutral-200 dark:before:bg-neutral-800">
                        <div v-for="reply in thread.replies" :key="reply.user" class="flex gap-3 relative">
                            <div class="absolute top-4 -left-6 w-4 h-px bg-neutral-200 dark:bg-neutral-800" />
                            <UAvatar :src="reply.avatar" size="xs" class="shrink-0 mt-1" />
                            <div class="flex-1">
                                <div class="bg-neutral-50 dark:bg-neutral-900 rounded-2xl rounded-tl-none p-2.5">
                                    <div class="flex justify-between items-center mb-0.5">
                                        <span class="text-xs font-bold">{{ reply.user }}</span>
                                        <span class="text-[10px] text-dimmed">{{ reply.time }}</span>
                                    </div>
                                    <p class="text-xs">{{ reply.content }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 7. Friend Suggestion Card -->
        <UCard title="Suggested for you">
            <div class="space-y-4">
                <div v-for="friend in friendSuggestions" :key="friend.name"
                    class="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                    <UAvatar :src="friend.avatar" size="md" />
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-sm truncate">{{ friend.name }}</h4>
                        <p class="text-[10px] text-dimmed">{{ friend.mutuals }} mutual connections</p>
                    </div>
                    <UButton icon="i-lucide-user-plus" variant="soft" color="primary" size="sm" class="rounded-full" />
                </div>
            </div>
            <template #footer>
                <UButton label="View All Suggestions" variant="ghost" color="neutral" block class="text-xs" />
            </template>
        </UCard>

        <!-- 8. Live Stream Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }"
            class="overflow-hidden group cursor-pointer border-0 ring-1 ring-neutral-200 dark:ring-neutral-800">
            <div class="aspect-video relative overflow-hidden">
                <img :src="liveStream.thumbnail"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div class="absolute top-3 left-3 flex gap-2">
                    <UBadge label="LIVE" color="error"
                        class="animate-pulse font-black uppercase tracking-widest text-[10px]" />
                    <UBadge :label="`${liveStream.viewers} watching`" color="neutral" variant="solid"
                        class="bg-black/60 backdrop-blur font-bold text-[10px]" />
                </div>
                <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                        class="size-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--color-primary-500),0.5)]">
                        <UIcon name="i-lucide-play" class="size-6 text-white ml-1" />
                    </div>
                </div>
                <div class="absolute bottom-3 left-3 right-3">
                    <h3 class="text-white font-bold truncate">{{ liveStream.title }}</h3>
                    <p class="text-white/70 text-xs">{{ liveStream.host }}</p>
                </div>
            </div>
        </UCard>

        <!-- 9. Podcast Episode Card -->
        <UCard class="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
            <div class="flex gap-4">
                <img :src="podcast.cover" class="size-24 rounded-xl shadow-lg object-cover shrink-0" />
                <div class="flex-1 flex flex-col justify-center">
                    <p class="text-[10px] text-primary font-black uppercase tracking-widest mb-1">{{ podcast.show }}
                    </p>
                    <h3 class="font-bold text-sm leading-tight line-clamp-2">{{ podcast.title }}</h3>
                    <div class="flex items-center gap-2 mt-auto">
                        <UButton icon="i-lucide-play-circle" color="primary" variant="ghost"
                            class="p-0 hover:bg-transparent" :ui="{ leadingIcon: 'size-8' }" />
                        <div class="flex-1 space-y-1">
                            <div class="flex justify-between text-[10px] font-bold text-dimmed">
                                <span>24:10</span>
                                <span>{{ podcast.duration }}</span>
                            </div>
                            <UProgress :model-value="podcast.progress" color="primary" size="xs" />
                        </div>
                    </div>
                </div>
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 3: Content & Creators
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 10. Creator Spotlight Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }" class="overflow-hidden group">
            <div class="h-48 relative">
                <img :src="creator.featured"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div class="absolute top-4 left-4">
                    <UBadge label="Featured Creator" color="primary" variant="solid"
                        class="font-black uppercase tracking-widest text-[10px] backdrop-blur bg-primary/80" />
                </div>
                <div class="absolute bottom-0 w-full p-6 flex items-end gap-4">
                    <div class="p-1 bg-white dark:bg-neutral-950 rounded-2xl shrink-0">
                        <UAvatar :src="creator.avatar" size="xl" class="rounded-xl" />
                    </div>
                    <div class="flex-1 pb-1">
                        <h2 class="text-white text-xl font-black">{{ creator.name }}</h2>
                        <p class="text-primary text-xs font-bold uppercase tracking-widest">{{ creator.niche }}</p>
                    </div>
                </div>
            </div>
            <div class="p-6 grid grid-cols-2 gap-4">
                <div class="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-3 text-center">
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest mb-1">Followers</p>
                    <p class="text-lg font-black">{{ creator.followers }}</p>
                </div>
                <div class="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-3 text-center">
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest mb-1">Engagement</p>
                    <p class="text-lg font-black text-success">{{ creator.engagement }}</p>
                </div>
            </div>
        </UCard>

        <!-- 11. Trending Topic Card -->
        <UCard title="Trends for you">
            <div class="space-y-4">
                <div v-for="item in trending" :key="item.rank"
                    class="flex items-start justify-between group cursor-pointer p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                    <div>
                        <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest mb-0.5">{{ item.rank
                        }} • Trending
                        </p>
                        <h4 class="font-bold text-sm group-hover:text-primary transition-colors">{{ item.topic }}
                        </h4>
                        <p class="text-xs text-dimmed mt-0.5">{{ item.volume }}</p>
                    </div>
                    <UButton icon="i-lucide-more-horizontal" variant="ghost" color="neutral" size="xs"
                        class="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
            <template #footer>
                <UButton label="Show more" variant="link" color="primary" class="p-0 text-sm" />
            </template>
        </UCard>

        <!-- 12. Poll Voting Card -->
        <UCard>
            <div class="flex items-center gap-2 mb-4 text-primary">
                <UIcon name="i-lucide-bar-chart-2" class="size-5" />
                <span class="text-xs font-bold uppercase tracking-widest">Community Poll</span>
            </div>
            <h3 class="font-bold text-lg leading-tight mb-6">{{ poll.question }}</h3>
            <div class="space-y-3">
                <div v-for="(option, index) in poll.options" :key="index" class="relative">
                    <div class="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                        <div class="h-full transition-all duration-1000"
                            :class="option.color === 'primary' ? 'bg-primary/20' : 'bg-neutral-200 dark:bg-neutral-700'"
                            :style="{ width: `${option.percentage}%` }" />
                    </div>
                    <div
                        class="relative p-3 flex justify-between items-center text-sm font-bold cursor-pointer hover:text-primary transition-colors">
                        <span>{{ option.label }}</span>
                        <span>{{ option.percentage }}%</span>
                    </div>
                </div>
            </div>
            <p class="text-xs text-dimmed mt-6">{{ poll.votes.toLocaleString() }} votes • Final results</p>
        </UCard>

        <!-- 13. Media Gallery Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }" class="overflow-hidden">
            <div class="p-4 flex gap-3 items-center">
                <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UIcon name="i-lucide-image" class="size-5" />
                </div>
                <div>
                    <h3 class="font-bold text-sm">Design Inspiration</h3>
                    <p class="text-xs text-dimmed">Added 4 new photos</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-1 p-1">
                <img :src="gallery[0]" class="aspect-square object-cover w-full rounded-tl-lg" />
                <img :src="gallery[1]" class="aspect-square object-cover w-full rounded-tr-lg" />
                <img :src="gallery[2]" class="aspect-square object-cover w-full rounded-bl-lg" />
                <div class="relative aspect-square">
                    <img :src="gallery[3]" class="w-full h-full object-cover rounded-br-lg" />
                    <div
                        class="absolute inset-0 bg-black/60 rounded-br-lg flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                        <span class="text-white font-black text-xl">+12</span>
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 14. Achievement Badge Card -->
        <UCard class="text-center relative overflow-hidden group border-warning/20 bg-warning/5">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-warning/20 blur-3xl rounded-full" />
            <div class="relative flex flex-col items-center p-4">
                <div
                    class="size-24 rounded-full bg-gradient-to-br from-warning-400 to-warning-600 p-1 mb-4 shadow-xl shadow-warning/20 group-hover:scale-110 transition-transform duration-500">
                    <div
                        class="size-full bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center border-2 border-warning/30">
                        <UIcon :name="badge.icon" class="size-10 text-warning" />
                    </div>
                </div>
                <UBadge label="Achievement Unlocked" color="warning" variant="subtle" size="sm"
                    class="mb-2 uppercase font-black" />
                <h3 class="text-xl font-black mb-2">{{ badge.title }}</h3>
                <p class="text-sm text-dimmed">{{ badge.description }}</p>
                <p class="text-[10px] font-bold text-dimmed mt-6 uppercase tracking-widest">{{ badge.date }}</p>
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 4: Entertainment & Commerce
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 15. Music Track Card -->
        <UCard class="bg-neutral-950 text-white border-neutral-800">
            <div class="flex items-center gap-4">
                <img :src="track.albumArt" class="size-16 rounded-lg shadow-lg" />
                <div class="flex-1">
                    <h3 class="font-bold">{{ track.title }}</h3>
                    <p class="text-xs text-neutral-400">{{ track.artist }}</p>
                </div>
                <UIcon name="i-lucide-music" class="size-5 text-primary animate-pulse" />
            </div>
            <div class="mt-6 space-y-2">
                <UProgress :model-value="track.progress" color="primary" size="sm" />
                <div class="flex justify-between text-[10px] font-bold text-neutral-400">
                    <span>1:48</span>
                    <span>{{ track.duration }}</span>
                </div>
            </div>
            <div class="flex items-center justify-center gap-6 mt-4">
                <UButton icon="i-lucide-skip-back" variant="ghost" color="neutral" class="hover:bg-neutral-800" />
                <UButton icon="i-lucide-pause" color="primary" size="lg"
                    class="rounded-full shadow-lg shadow-primary/20" />
                <UButton icon="i-lucide-skip-forward" variant="ghost" color="neutral" class="hover:bg-neutral-800" />
            </div>
        </UCard>

        <!-- 16. Repost Card -->
        <UCard class="group hover:border-primary/30 transition-colors">
            <div class="flex items-center gap-2 mb-3 text-xs text-dimmed font-bold">
                <UIcon name="i-lucide-repeat" class="size-3.5" />
                <span>{{ repost.user }} reposted</span>
            </div>
            <p class="text-sm mb-4">{{ repost.content }}</p>

            <div class="border border-default rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900/50">
                <div class="flex items-center gap-2 mb-2">
                    <UAvatar :src="repost.original.avatar" size="xs" />
                    <span class="text-sm font-bold">{{ repost.original.user }}</span>
                    <span class="text-[10px] text-dimmed">{{ repost.original.handle }}</span>
                </div>
                <p class="text-sm text-dimmed">{{ repost.original.content }}</p>
            </div>
        </UCard>

        <!-- 17. Discussion Forum Card -->
        <UCard class="hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-3">
                <UBadge label="Frontend" color="info" variant="subtle" size="xs" />
                <span class="text-[10px] text-dimmed font-bold uppercase tracking-widest">{{ forum.lastActive
                }}</span>
            </div>
            <h3 class="font-bold text-base leading-tight mb-4 hover:text-primary cursor-pointer transition-colors">
                {{
                    forum.title }}</h3>
            <div class="flex items-center justify-between pt-4 border-t border-default">
                <div class="flex items-center gap-2 text-xs text-dimmed font-bold">
                    <UIcon name="i-lucide-user" class="size-3.5" />
                    <span>{{ forum.author }}</span>
                </div>
                <div class="flex items-center gap-4 text-xs text-dimmed font-bold">
                    <div class="flex items-center gap-1">
                        <UIcon name="i-lucide-message-square" class="size-3.5" />
                        <span>{{ forum.replies }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <UIcon name="i-lucide-eye" class="size-3.5" />
                        <span>{{ forum.views }}</span>
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 18. Notification Alert Card -->
        <UCard title="Recent Notifications">
            <div class="space-y-4">
                <div v-for="notif in notifications" :key="notif.id"
                    class="flex gap-4 p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer">
                    <div :class="`bg-${notif.color}/10 text-${notif.color}`"
                        class="size-10 rounded-full flex items-center justify-center shrink-0">
                        <UIcon :name="notif.icon" class="size-5" />
                    </div>
                    <div class="flex-1 pt-1">
                        <p class="text-sm leading-tight">
                            <span class="font-bold">{{ notif.user }}</span>
                            <span class="text-dimmed"> {{ notif.action }}</span>
                        </p>
                        <p class="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">{{ notif.time
                        }}</p>
                    </div>
                    <div class="size-2 rounded-full bg-primary mt-2" />
                </div>
            </div>
        </UCard>

        <!-- 19. Community Challenge Card -->
        <UCard class="border-success/20 bg-success/5 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10">
                <UIcon name="i-lucide-target" class="size-24 text-success" />
            </div>
            <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                    <UIcon name="i-lucide-flame" class="size-5 text-orange-500" />
                    <h3 class="font-bold text-lg">{{ challenge.title }}</h3>
                </div>
                <p class="text-xs text-dimmed mb-6">Complete coding exercises for 7 consecutive days.</p>

                <div class="space-y-2">
                    <div class="flex justify-between text-xs font-bold">
                        <span class="text-success">Day {{ challenge.progress }}</span>
                        <span class="text-dimmed">Goal: {{ challenge.total }}</span>
                    </div>
                    <UProgress :model-value="(challenge.progress / challenge.total) * 100" color="success" size="md" />
                </div>

                <div
                    class="mt-6 pt-4 border-t border-success/10 flex items-center gap-3 text-xs font-bold text-success">
                    <UIcon name="i-lucide-gift" class="size-4" />
                    <span>Reward: {{ challenge.reward }}</span>
                </div>
            </div>
        </UCard>

        <!-- 20. Social Commerce Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }" class="overflow-hidden group">
            <div class="aspect-square relative">
                <img :src="commerce.image"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <!-- Shopping Tag Overlay -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                        class="bg-white/90 dark:bg-black/90 backdrop-blur shadow-xl rounded-full px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:scale-110 transition-transform">
                        <UIcon name="i-lucide-shopping-bag" class="size-3 text-primary" />
                        <span class="text-xs font-black">{{ commerce.price }}</span>
                    </div>
                </div>
            </div>
            <div class="p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-bold text-sm">{{ commerce.product }}</h3>
                    <p class="text-[10px] text-dimmed uppercase font-bold tracking-widest mt-0.5">{{ commerce.brand
                    }}</p>
                </div>
                <UButton label="Buy" color="primary" variant="soft" size="sm" class="px-4 font-bold rounded-full" />
            </div>
        </UCard>

    </section>
</template>
