<script setup lang="ts">
// ============================================================================
// Page Configuration
// ============================================================================
definePageMeta({
    title: 'Media & Content Cards'
})

// ============================================================================
// Mock Data
// ============================================================================

const article = {
    title: 'The Rise of Autonomous Agentic Workflows',
    excerpt: 'Explore how generative AI is shifting from passive chat interfaces to active, goal-oriented agents.',
    category: 'Technology',
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    date: 'May 12, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60'
}

const news = {
    title: 'Global Tech Summit Announces New AI Ethical Guidelines',
    source: 'Tech Daily',
    time: '15 mins ago',
    isBreaking: true,
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60'
}

const magazine = {
    title: 'Minimalist Architecture in the Digital Age',
    subtitle: 'How space influences our mental well-being and productivity.',
    issue: 'The Summer Issue',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&auto=format&fit=crop&q=60'
}

const video = {
    title: 'Advanced Vue 3 Patterns: Composition API deep dive',
    duration: '24:15',
    views: '12k views',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60'
}

const featuredEditorial = {
    title: 'Designing the Future of Human-AI Interaction',
    author: 'Marcus Holloway',
    category: 'Design Systems',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80'
}

const tutorialStep = {
    step: 1,
    title: 'Initialize your project',
    description: 'Use the CLI to create a new scaffold with all necessary dependencies and configurations.',
    isCompleted: true
}

const courseLesson = {
    title: 'Introduction to Design Tokens',
    module: 'Design Foundations',
    duration: '15:00',
    progress: 100,
    isLocked: false
}

const book = {
    title: 'The Art of Simplicity',
    author: 'Dominique Loreau',
    rating: 4.8,
    reviews: 1240,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60'
}

const recipe = {
    title: 'Homemade Sourdough Bread',
    difficulty: 'Intermediate',
    prepTime: '24h',
    calories: '250 kcal',
    image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=800&auto=format&fit=crop&q=60'
}

const travel = {
    location: 'Kyoto, Japan',
    price: '$1,200',
    rating: 4.9,
    description: 'Experience the perfect blend of ancient traditions and modern life.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=60'
}

const portfolio = {
    name: 'Luminal Dashboard',
    tags: ['Vue', 'Tailwind', 'Three.js'],
    description: 'A data-rich dashboard with real-time analytics and 3D visualizations.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60'
}

const photography = {
    title: 'Alpine Morning',
    camera: 'Sony A7R IV',
    lens: '24-70mm f/2.8',
    iso: 100,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80'
}

const podcast = {
    title: 'Weekly Roundup: The AI Revolution',
    episodes: 42,
    duration: '12h 30m total',
    cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=60'
}

const newsletter = {
    title: 'Join the Vanguard',
    description: 'Get the latest insights on design and technology delivered to your inbox every week.'
}

const author = {
    name: 'Elena Gilbert',
    role: 'Principal Design Researcher',
    bio: 'Exploring the intersection of human behavior and automated systems for over a decade.',
    avatar: 'https://i.pravatar.cc/150?u=elena'
}

const caseStudy = {
    title: 'Optimizing E-commerce Checkout Flow',
    problem: '45% cart abandonment rate at the payment step.',
    solution: 'Implemented one-click checkout and social login.',
    result: 'Conversion rate increased by 22% in the first quarter.'
}

const timeline = [
    { date: 'Oct 2025', event: 'Initial concept and market research phase.' },
    { date: 'Jan 2026', event: 'Closed beta testing with 500 select users.' },
    { date: 'May 2026', event: 'Official global launch and scaling.' }
]

const quiz = {
    question: 'Which CSS property is used to create a glassmorphism effect?',
    options: ['blur', 'backdrop-filter', 'opacity', 'filter'],
    correctIndex: 1
}

const recommendation = {
    title: 'Personalized Learning Path',
    tags: ['Productivity', 'UX Design'],
    items: [
        { title: 'Psychology of Color', icon: 'i-lucide-palette' },
        { title: 'User Research Basics', icon: 'i-lucide-search' }
    ]
}

const mediaPlaylist = {
    title: 'Productivity Beats',
    count: 12,
    tracks: [
        { title: 'Focus Flow', artist: 'Lofi Girl', duration: '3:45' },
        { title: 'Deep Work', artist: 'Calm Collective', duration: '4:20' },
        { title: 'Late Night Code', artist: 'Neon Dreams', duration: '5:12' }
    ]
}

</script>

<template>
    <!-- ==========================================================================
         Header Section
         ========================================================================== -->
    <UPageCard title="Media & Content"
        description="Premium layouts for articles, magazines, educational content, and immersive media showcases."
        variant="naked" />

    <!-- ==========================================================================
         Section 1: Editorial & News
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 1. Article Preview Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }"
            class="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div class="relative overflow-hidden aspect-[16/10]">
                <img :src="article.image"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute top-4 left-4">
                    <UBadge :label="article.category" color="primary" variant="solid"
                        class="font-black uppercase tracking-widest text-[10px] backdrop-blur-md bg-primary/80" />
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-center gap-2 mb-4 text-[10px] font-bold text-dimmed uppercase tracking-widest">
                    <span>{{ article.date }}</span>
                    <span class="size-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    <span>{{ article.readTime }}</span>
                </div>
                <h3
                    class="text-xl font-black leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {{ article.title }}
                </h3>
                <p class="text-sm text-dimmed line-clamp-2 mb-6">
                    {{ article.excerpt }}
                </p>
                <div class="flex items-center justify-between pt-4 border-t border-default">
                    <div class="flex items-center gap-3">
                        <UAvatar :src="article.author.avatar" size="xs" />
                        <span class="text-xs font-bold">{{ article.author.name }}</span>
                    </div>
                    <UButton icon="i-lucide-arrow-right" variant="ghost" color="neutral" size="sm"
                        class="rounded-full" />
                </div>
            </div>
        </UCard>

        <!-- 2. News Headline Card -->
        <UCard :ui="{ body: 'p-6' }"
            class="relative overflow-hidden group border-0 bg-neutral-50 dark:bg-neutral-900/50">
            <div v-if="news.isBreaking" class="absolute top-0 right-0">
                <div
                    class="bg-error text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-1 shadow-lg rounded-bl-xl">
                    Breaking
                </div>
            </div>
            <div class="flex gap-6 items-center">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="text-[10px] font-black text-primary uppercase tracking-widest">{{ news.source
                            }}</span>
                        <span class="text-[10px] text-dimmed font-bold">{{ news.time }}</span>
                    </div>
                    <h3
                        class="text-lg font-black leading-tight mb-4 group-hover:underline decoration-primary decoration-2 underline-offset-4">
                        {{ news.title }}
                    </h3>
                    <div class="flex items-center gap-2 text-[10px] font-bold text-dimmed">
                        <UIcon name="i-lucide-map-pin" class="size-3" />
                        <span>{{ news.location }}</span>
                    </div>
                </div>
                <div class="size-24 rounded-2xl overflow-hidden shrink-0 border border-default">
                    <img :src="news.image"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>
        </UCard>

        <!-- 3. Magazine Editorial Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden relative h-full' }" class="aspect-[3/4] group bg-black h-full">
            <img :src="magazine.image"
                class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div class="relative h-full p-8 flex flex-col justify-between text-white">
                <div class="flex justify-between items-start">
                    <span class="text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/30 pb-1">{{
                        magazine.issue }}</span>
                    <UIcon name="i-lucide-bookmark"
                        class="size-5 hover:text-primary transition-colors cursor-pointer" />
                </div>
                <div>
                    <h2 class="text-4xl font-serif italic mb-4 leading-tight">
                        {{ magazine.title }}
                    </h2>
                    <p class="text-sm text-white/70 font-medium leading-relaxed mb-6">
                        {{ magazine.subtitle }}
                    </p>
                    <UButton label="Explore Issue" color="neutral" variant="solid"
                        class="text-black font-black uppercase tracking-widest text-[10px] px-8 py-3 rounded-none" />
                </div>
            </div>
        </UCard>

        <!-- 20. Featured Editorial Card (Hero Style) -->
        <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden relative h-full' }" class="h-full group rounded-3xl border-0">
            <img :src="featuredEditorial.image"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div class="relative h-full p-4 sm:p-6 flex flex-col justify-center max-w-2xl text-white">
                <UBadge :label="featuredEditorial.category" color="primary" variant="subtle"
                    class="w-fit mb-6 uppercase font-black tracking-widest" />
                <h1 class="text-5xl font-black mb-6 leading-tight drop-shadow-2xl">
                    {{ featuredEditorial.title }}
                </h1>
                <div class="flex items-center gap-4 mb-8">
                    <div class="size-1 w-12 bg-primary rounded-full" />
                    <span class="text-sm font-bold uppercase tracking-widest opacity-80">By {{
                        featuredEditorial.author }}</span>
                </div>
                <div class="flex gap-4">
                    <UButton label="Read Full Article" color="primary" size="xl"
                        class="px-8 font-black uppercase tracking-widest text-sm" block />
                    <UButton icon="i-lucide-share-2" variant="outline" color="neutral" size="xl" class="rounded-full" />
                </div>
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 2: Learning & Tutorials
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 5. Tutorial Step Card -->
        <UCard :ui="{ root: 'overflow-visible' }" class="group relative">
            <div
                class="absolute -top-4 -left-4 size-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                {{ tutorialStep.step }}
            </div>
            <div class="pl-4 pt-2">
                <h3 class="text-lg font-black mb-3">{{ tutorialStep.title }}</h3>
                <p class="text-sm text-dimmed leading-relaxed mb-6">
                    {{ tutorialStep.description }}
                </p>
                <div class="flex items-center gap-3">
                    <UButton :label="tutorialStep.isCompleted ? 'Completed' : 'Mark as Done'"
                        :color="tutorialStep.isCompleted ? 'success' : 'primary'"
                        :variant="tutorialStep.isCompleted ? 'soft' : 'solid'" class="font-bold px-6" />
                    <UButton icon="i-lucide-help-circle" variant="ghost" color="neutral" />
                </div>
            </div>
        </UCard>

        <!-- 6. Course Lesson Card -->
        <UCard :ui="{ body: 'border-l-6 border-primary' }">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <p class="text-[10px] text-primary font-black uppercase tracking-widest mb-1">{{ courseLesson.module
                        }}</p>
                    <h3 class="font-bold text-base leading-tight">{{ courseLesson.title }}</h3>
                </div>
                <UIcon :name="courseLesson.isLocked ? 'i-lucide-lock' : 'i-lucide-play-circle'"
                    :class="courseLesson.isLocked ? 'text-dimmed' : 'text-primary'" class="size-6" />
            </div>
            <div class="flex items-center gap-4 mb-6">
                <div class="flex items-center gap-1.5 text-xs text-dimmed font-medium">
                    <UIcon name="i-lucide-clock" class="size-3.5" />
                    <span>{{ courseLesson.duration }}</span>
                </div>
                <div class="flex items-center gap-1.5 text-xs text-dimmed font-medium">
                    <UIcon name="i-lucide-file-text" class="size-3.5" />
                    <span>Resources</span>
                </div>
            </div>
            <div class="space-y-2">
                <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span :class="courseLesson.progress === 100 ? 'text-success' : 'text-dimmed'">{{
                        courseLesson.progress }}% Complete</span>
                    <UIcon v-if="courseLesson.progress === 100" name="i-lucide-check-circle-2"
                        class="size-3.5 text-success" />
                </div>
                <UProgress :model-value="courseLesson.progress"
                    :color="courseLesson.progress === 100 ? 'success' : 'primary'" size="xs" />
            </div>
        </UCard>

        <!-- 17. Interactive Quiz Card -->
        <UCard class="bg-neutral-900 text-white border-0">
            <div class="flex items-center gap-2 mb-6 text-primary">
                <UIcon name="i-lucide-brain-circuit" class="size-5" />
                <span class="text-[10px] font-black uppercase tracking-[0.2em]">Quick Quiz</span>
            </div>
            <h3 class="text-lg font-bold leading-tight mb-8">{{ quiz.question }}</h3>
            <div class="space-y-3">
                <button v-for="(option, idx) in quiz.options" :key="idx"
                    class="w-full text-left p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all group flex justify-between items-center">
                    <span class="text-sm font-medium">{{ option }}</span>
                    <div
                        class="size-5 rounded-full border border-white/20 group-hover:border-primary flex items-center justify-center">
                        <div
                            class="size-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </button>
            </div>
            <div class="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <span class="text-xs text-white/40">Question 4 of 10</span>
                <UButton label="Skip" variant="ghost" color="neutral" size="sm" class="text-white/60" />
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 3: Lifestyle & Travel
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 8. Recipe Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }" class="group">
            <div class="relative aspect-square">
                <img :src="recipe.image"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute top-4 left-4">
                    <UBadge :label="recipe.difficulty" color="warning" variant="solid"
                        class="font-black uppercase tracking-widest text-[10px] backdrop-blur-md bg-warning/80" />
                </div>
                <div class="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 class="text-xl font-black mb-1">{{ recipe.title }}</h3>
                    <div class="flex items-center gap-4 text-xs font-medium opacity-80">
                        <div class="flex items-center gap-1">
                            <UIcon name="i-lucide-clock" class="size-3.5" />
                            <span>{{ recipe.prepTime }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <UIcon name="i-lucide-flame" class="size-3.5" />
                            <span>{{ recipe.calories }}</span>
                        </div>
                    </div>

                    <div class="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
                        <UBadge v-for="tag in ['Flour', 'Water', 'Salt', 'Yeast']" :key="tag" :label="tag"
                            variant="soft" color="neutral" size="xs" class="rounded-full" />
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 9. Travel Destination Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }"
            class="group shadow-lg hover:shadow-primary/10 transition-all duration-500">
            <div class="relative h-64">
                <img :src="travel.image"
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div
                    class="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-xl">
                    <UIcon name="i-lucide-star" class="size-3 text-warning fill-warning" />
                    <span class="text-xs font-black">{{ travel.rating }}</span>
                </div>
                <div class="absolute bottom-4 left-4 flex items-center gap-1.5 text-white drop-shadow-lg">
                    <UIcon name="i-lucide-map-pin" class="size-4 text-primary" />
                    <span class="text-lg font-black uppercase tracking-widest">{{ travel.location }}</span>
                </div>
            </div>
            <div class="p-6">
                <p class="text-sm text-dimmed mb-6 line-clamp-2">
                    {{ travel.description }}
                </p>
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-[10px] text-dimmed font-black uppercase tracking-widest mb-0.5">Starting from</p>
                        <p class="text-xl font-black text-primary">{{ travel.price }}</p>
                    </div>
                    <UButton label="Book Now" color="primary" class="font-black px-8 rounded-xl" />
                </div>
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 4: Creative & Portfolio
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 10. Portfolio Project Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }"
            class="overflow-hidden group border-0 ring-1 ring-default hover:ring-primary/50 transition-all">
            <div
                class="bg-neutral-100 dark:bg-neutral-900 aspect-video relative flex items-center justify-center overflow-hidden">
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary-500)_0,transparent_70%)] opacity-10 group-hover:opacity-20 transition-opacity" />
                <img :src="portfolio.image"
                    class="inset-0 shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2" />
            </div>
            <div class="p-6">
                <div class="flex gap-2 mb-4">
                    <UBadge v-for="tag in portfolio.tags" :key="tag" :label="tag" variant="subtle" color="primary"
                        size="xs" class="font-bold" />
                </div>
                <h3 class="text-xl font-black mb-2 group-hover:text-primary transition-colors">{{ portfolio.name }}</h3>
                <p class="text-sm text-dimmed mb-6">{{ portfolio.description }}</p>
                <UButton label="View Case Study" variant="link" color="primary" icon="i-lucide-arrow-right" trailing
                    class="p-0 font-bold" />
            </div>
        </UCard>

        <!-- 11. Photography Showcase Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }" class="aspect-square group relative border-0 rounded-3xl">
            <img :src="photography.image"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
            <div
                class="absolute inset-0 p-8 flex flex-col justify-end text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h3 class="text-2xl font-black mb-4">{{ photography.title }}</h3>
                <div class="grid grid-cols-2 gap-y-3 pt-6 border-t border-white/20">
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-camera" class="size-4 text-primary" />
                        <span class="text-xs font-bold">{{ photography.camera }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-aperture" class="size-4 text-primary" />
                        <span class="text-xs font-bold">{{ photography.lens }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-sliders" class="size-4 text-primary" />
                        <span class="text-xs font-bold">ISO {{ photography.iso }}</span>
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 14. Author Profile Card -->
        <UCard class="text-center group border-0 bg-gradient-to-b from-primary/5 to-transparent">
            <div class="relative w-24 h-24 mx-auto mb-6">
                <div
                    class="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20 group-hover:opacity-40" />
                <UAvatar :src="author.avatar" size="3xl" class="relative ring-4 ring-white dark:ring-neutral-950" />
            </div>
            <h3 class="text-xl font-black mb-1">{{ author.name }}</h3>
            <p class="text-xs text-primary font-black uppercase tracking-widest mb-4">{{ author.role }}</p>
            <p class="text-sm text-dimmed leading-relaxed mb-8 px-4">
                {{ author.bio }}
            </p>
            <div class="flex justify-center gap-4">
                <UButton icon="i-lucide-twitter" variant="soft" color="neutral" class="rounded-full" />
                <UButton icon="i-lucide-linkedin" variant="soft" color="neutral" class="rounded-full" />
                <UButton icon="i-lucide-globe" variant="soft" color="neutral" class="rounded-full" />
            </div>
        </UCard>

        <!-- 15. Case Study Card -->
        <UCard class="relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            <div class="pl-4">
                <UBadge label="Case Study" color="primary" variant="subtle" size="xs"
                    class="mb-4 uppercase font-black" />
                <h3 class="text-lg font-black mb-8 leading-tight">{{ caseStudy.title }}</h3>

                <div class="grid grid-cols-3 gap-4">
                    <div class="space-y-1">
                        <p class="text-[10px] font-black uppercase tracking-widest text-dimmed">Problem</p>
                        <p class="text-[11px] font-bold leading-relaxed line-clamp-3">{{ caseStudy.problem }}</p>
                    </div>
                    <div class="space-y-1">
                        <p class="text-[10px] font-black uppercase tracking-widest text-dimmed">Solution</p>
                        <p class="text-[11px] font-bold leading-relaxed line-clamp-3">{{ caseStudy.solution }}</p>
                    </div>
                    <div class="space-y-1">
                        <p class="text-[10px] font-black uppercase tracking-widest text-primary">Result</p>
                        <p class="text-[11px] font-black leading-relaxed line-clamp-3 text-success">{{ caseStudy.result
                            }}</p>
                    </div>
                </div>
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 5: Media & Entertainment
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 2. Video Thumbnail Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0 overflow-hidden' }"
            class="group cursor-pointer border-0 ring-1 ring-default hover:ring-primary transition-all">
            <div class="relative aspect-video">
                <img :src="video.thumbnail"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div
                    class="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-black rounded-md">
                    {{ video.duration }}
                </div>
                <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                        class="size-12 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(var(--color-primary-500),0.5)]">
                        <UIcon name="i-lucide-play" class="size-6 fill-current ml-1" />
                    </div>
                </div>
            </div>
            <div class="p-4">
                <h4 class="font-bold text-sm mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {{ video.title }}</h4>
                <div class="flex items-center gap-2 text-[10px] font-bold text-dimmed uppercase tracking-widest">
                    <span>Vue Mastery</span>
                    <span class="size-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    <span>{{ video.views }}</span>
                </div>
            </div>
        </UCard>

        <!-- 7. Book Recommendation Card -->
        <UCard class="group hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            <div class="flex gap-6">
                <div class="relative shrink-0 perspective-1000">
                    <img :src="book.cover"
                        class="h-40 rounded-lg shadow-[8px_12px_24px_rgba(0,0,0,0.2)] transform-gpu group-hover:rotate-y-[-20deg] transition-transform duration-500" />
                    <div class="absolute top-0 left-0 w-1.5 h-full bg-black/10 rounded-l-lg blur-[1px]" />
                </div>
                <div class="flex flex-col justify-center">
                    <h3 class="text-xl font-black leading-tight mb-1">{{ book.title }}</h3>
                    <p class="text-sm text-dimmed font-bold mb-4">by {{ book.author }}</p>
                    <div class="flex items-center gap-2 mb-6">
                        <div class="flex text-warning">
                            <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-3.5 fill-current"
                                :class="i > 4 ? 'opacity-30' : ''" />
                        </div>
                        <span class="text-[10px] font-black text-dimmed uppercase tracking-widest">({{ book.reviews }}
                            reviews)</span>
                    </div>
                    <UButton label="View Details" variant="soft" color="primary" size="sm"
                        class="w-fit font-black rounded-full" />
                </div>
            </div>
        </UCard>

        <!-- 12. Podcast Playlist Card -->
        <UCard class="bg-neutral-900 text-white border-0 overflow-hidden group">
            <div class="relative h-32 mb-4">
                <img :src="podcast.cover"
                    class="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 group-hover:scale-150 transition-transform duration-1000" />
                <div class="absolute inset-0 p-6 flex items-center gap-4">
                    <img :src="podcast.cover"
                        class="size-20 rounded-xl shadow-2xl rotate-[-4deg] group-hover:rotate-0 transition-transform" />
                    <div>
                        <h3 class="font-black text-lg leading-tight">{{ podcast.title }}</h3>
                        <p class="text-xs text-white/60 mt-1">{{ podcast.episodes }} episodes</p>
                    </div>
                </div>
            </div>
            <div class="px-6 pb-6 space-y-4">
                <div
                    class="flex items-center justify-between text-xs font-bold text-white/40 uppercase tracking-widest">
                    <span>Latest Update</span>
                    <span>Yesterday</span>
                </div>
                <UButton label="Listen Now" color="primary" block size="lg"
                    class="font-black uppercase tracking-widest shadow-lg shadow-primary/20" />
            </div>
        </UCard>

        <!-- 19. Media Playlist Card -->
        <UCard :ui="{ body: 'p-0 sm:p-0' }" class="overflow-hidden">
            <div
                class="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 border-b border-default">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-black text-lg">{{ mediaPlaylist.title }}</h3>
                    <UButton icon="i-lucide-shuffle" variant="ghost" color="neutral" size="xs" />
                </div>
                <p class="text-[10px] text-dimmed font-black uppercase tracking-widest">{{ mediaPlaylist.count }} Tracks
                    • 45 mins</p>
            </div>
            <div class="divide-y divide-default">
                <div v-for="(track, idx) in mediaPlaylist.tracks" :key="idx"
                    class="p-4 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer group">
                    <div
                        class="size-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                        <span v-if="idx !== 0">{{ idx + 1 }}</span>
                        <UIcon v-else name="i-lucide-play" class="size-4 fill-current" />
                    </div>
                    <div class="flex-1">
                        <h4 class="text-sm font-bold leading-tight" :class="idx === 0 ? 'text-primary' : ''">{{
                            track.title }}</h4>
                        <p class="text-[10px] text-dimmed font-bold">{{ track.artist }}</p>
                    </div>
                    <span class="text-[10px] font-bold text-dimmed">{{ track.duration }}</span>
                    <UButton icon="i-lucide-more-vertical" variant="ghost" color="neutral" size="xs"
                        class="opacity-0 group-hover:opacity-100" />
                </div>
            </div>
        </UCard>

    </section>

    <!-- ==========================================================================
         Section 6: Interaction & Community
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

        <!-- 13. Newsletter Signup Card -->
        <UCard class="relative overflow-hidden text-center bg-primary/5 border-0">
            <div class="absolute -top-12 -right-12 size-48 bg-primary/10 rounded-full blur-3xl" />
            <div class="absolute -bottom-12 -left-12 size-48 bg-primary/10 rounded-full blur-3xl" />

            <div class="relative py-4 px-6">
                <div
                    class="size-16 rounded-3xl bg-primary text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20 rotate-12 group-hover:rotate-0 transition-transform">
                    <UIcon name="i-lucide-mail" class="size-8" />
                </div>
                <h3 class="text-2xl font-black mb-3">{{ newsletter.title }}</h3>
                <p class="text-sm text-dimmed mb-8 leading-relaxed">
                    {{ newsletter.description }}
                </p>
                <div class="space-y-3">
                    <UInput placeholder="Enter your email" size="lg" class="rounded-xl shadow-sm" />
                    <UButton label="Subscribe Now" color="primary" block size="lg"
                        class="rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20" />
                </div>
                <p class="text-[10px] text-dimmed mt-6 font-bold uppercase tracking-widest">No spam, ever. Unsubscribe
                    anytime.</p>
            </div>
        </UCard>

        <!-- 16. Timeline Story Card -->
        <UCard title="Project Journey">
            <div
                class="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-0.5 before:bg-neutral-100 dark:before:bg-neutral-800">
                <div v-for="(item, idx) in timeline" :key="idx" class="relative pl-10 group">
                    <div
                        class="absolute top-2 left-0 size-6 rounded-full border-2 border-primary bg-white dark:bg-neutral-950 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                        <div class="size-2 rounded-full bg-primary" />
                    </div>
                    <p class="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{{ item.date }}</p>
                    <p class="text-sm font-bold leading-relaxed">{{ item.event }}</p>
                </div>
            </div>
        </UCard>

        <!-- 18. Content Recommendation Card -->
        <UCard>
            <div class="flex items-center justify-between mb-8">
                <h3 class="text-sm font-black uppercase tracking-widest">{{ recommendation.title }}</h3>
                <UButton icon="i-lucide-refresh-cw" variant="ghost" color="neutral" size="xs" />
            </div>
            <div class="space-y-4">
                <div v-for="(item, idx) in recommendation.items" :key="idx"
                    class="group p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-default hover:border-primary/30 transition-all cursor-pointer">
                    <div class="flex items-center gap-4">
                        <div
                            class="size-12 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                            <UIcon :name="item.icon" class="size-6" />
                        </div>
                        <div class="flex-1">
                            <h4 class="font-bold text-sm leading-tight">{{ item.title }}</h4>
                            <div class="flex gap-2 mt-1">
                                <span
                                    class="text-[9px] font-black text-primary uppercase tracking-widest">Recommended</span>
                            </div>
                        </div>
                        <UIcon name="i-lucide-chevron-right"
                            class="size-4 text-dimmed group-hover:text-primary transition-colors" />
                    </div>
                </div>
            </div>
            <div class="mt-8 flex flex-wrap gap-2">
                <UBadge v-for="tag in recommendation.tags" :key="tag" :label="tag" variant="soft" color="neutral"
                    size="xs" class="rounded-full px-3" />
            </div>
        </UCard>

    </section>
</template>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}

.rotate-y-\[-20deg\] {
    transform: rotateY(-20deg);
}
</style>
