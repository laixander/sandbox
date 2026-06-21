<script setup lang="ts">
// ============================================================================
// Page Configuration
// ============================================================================
definePageMeta({
    title: 'Ecommerce Cards'
})

// ============================================================================
// Mock Data
// ============================================================================

const products = [
    {
        id: 1,
        name: 'Quantum Sonic Headphones',
        price: '$299',
        originalPrice: '$399',
        rating: 4.8,
        reviews: 124,
        image: 'https://picsum.photos/seed/headphones/600/600',
        badge: 'New Arrival',
        colors: ['#000000', '#4F46E5', '#EF4444']
    },
    {
        id: 2,
        name: 'Aerolight Running Shoes',
        price: '$120',
        rating: 4.5,
        reviews: 89,
        image: 'https://picsum.photos/seed/shoes/600/600',
        badge: 'Best Seller'
    }
] as const

const wishlistItems = [
    { id: 1, name: 'Minimalist Wall Clock', price: '$45', image: 'https://picsum.photos/seed/clock/200/200', status: 'In Stock' },
    { id: 2, name: 'Leather Journal', price: '$32', image: 'https://picsum.photos/seed/journal/200/200', status: 'Low Stock' }
] as const

const flashSale = {
    name: 'Midnight Tech Sale',
    endsIn: '04:12:45',
    discount: '60% OFF'
} as const

const comparisonSpecs = [
    { label: 'Battery Life', p1: '30h', p2: '24h' },
    { label: 'Weight', p1: '250g', p2: '280g' },
    { label: 'Bluetooth', p1: 'v5.3', p2: 'v5.2' }
] as const

const orderStages = [
    { label: 'Ordered', status: 'completed', icon: 'i-lucide-package' },
    { label: 'Shipped', status: 'current', icon: 'i-lucide-truck' },
    { label: 'Delivered', status: 'upcoming', icon: 'i-lucide-home' }
] as const
</script>

<template>
    <!-- ==========================================================================
         Header Section
         ========================================================================== -->
    <UPageCard title="Ecommerce Collection"
        description="Premium product presentation components, conversion-focused layouts, and shopping interface patterns."
        variant="naked" />

    <!-- ==========================================================================
         Section 1: Product Displays
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <!-- 1. Product Showcase Card -->
        <UCard class="group overflow-hidden" :ui="{ body: 'p-0 sm:p-0' }">
            <div class="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img :src="products[0].image"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute top-3 left-3">
                    <UBadge color="primary" variant="solid" class="font-bold">{{ products[0].badge }}</UBadge>
                </div>
                <UButton icon="i-lucide-heart" color="neutral" variant="ghost"
                    class="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full shadow-sm hover:text-error" />
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-sm line-clamp-1 flex-1">{{ products[0].name }}</h3>
                    <div class="flex items-center gap-1 text-xs font-bold text-warning">
                        <UIcon name="i-lucide-star" class="size-3 fill-current" />
                        {{ products[0].rating }}
                    </div>
                </div>
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-lg font-black italic">{{ products[0].price }}</span>
                    <span class="text-xs text-dimmed line-through">{{ products[0].originalPrice }}</span>
                </div>
                <UButton label="Add to Cart" icon="i-lucide-shopping-cart" block color="primary" />
            </div>
        </UCard>

        <!-- 2. Quick Buy Card -->
        <UCard class="flex flex-col gap-4">
            <div class="flex gap-4">
                <img :src="products[1].image" class="size-20 rounded-xl object-cover bg-neutral-100" />
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-sm truncate">{{ products[1].name }}</h4>
                    <p class="text-lg font-black italic text-primary mt-1">{{ products[1].price }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <UButton label="Quick View" variant="outline" color="neutral" size="sm" block />
                <UButton label="Buy Now" color="primary" size="sm" block />
            </div>
        </UCard>

        <!-- 4. Flash Sale Card -->
        <UCard class="bg-neutral-950 border-neutral-800 relative overflow-hidden group">
            <div class="absolute -right-8 -top-8 size-32 bg-error/20 rounded-full blur-3xl" />
            <div class="relative">
                <div class="flex items-center gap-2 mb-4">
                    <UIcon name="i-lucide-zap" class="size-5 text-error animate-pulse" />
                    <span class="text-xs font-black uppercase tracking-widest text-error">Flash Sale</span>
                </div>
                <h3 class="text-xl font-black italic text-white leading-tight mb-2">{{ flashSale.name }}</h3>
                <p class="text-sm text-neutral-400 mb-6">Up to <span class="text-white font-bold">{{
                    flashSale.discount }}</span> on all tech.</p>

                <div class="flex gap-2 mb-6">
                    <div v-for="unit in ['04', '12', '45']" :key="unit"
                        class="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg py-2 text-center">
                        <span class="text-lg font-black text-white italic leading-none">{{ unit }}</span>
                    </div>
                </div>
                <UButton label="Shop the Sale" block color="error" variant="solid" />
            </div>
        </UCard>

        <!-- 5. Wishlist Card -->
        <UCard title="Wishlist Items" :ui="{ body: 'space-y-4' }">
            <div v-for="item in wishlistItems" :key="item.id" class="flex items-center gap-3 group/item">
                <div class="size-12 rounded-lg overflow-hidden shrink-0">
                    <img :src="item.image" class="size-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                    <h5 class="text-xs font-bold truncate">{{ item.name }}</h5>
                    <p class="text-xs font-black text-primary">{{ item.price }}</p>
                </div>
                <UButton icon="i-lucide-shopping-bag" size="xs" color="neutral" variant="ghost"
                    class="opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </div>
            <template #footer>
                <UButton label="View All Wishlist" variant="link" color="primary" size="xs" class="p-0" />
            </template>
        </UCard>

        <!-- 3. Product Comparison Card -->
        <UCard title="Compare Specs" class="lg:col-span-2">
            <div class="grid grid-cols-3 gap-4">
                <div class="pt-8">
                    <div v-for="spec in comparisonSpecs" :key="spec.label"
                        class="h-10 flex items-center text-xs font-bold text-dimmed uppercase">
                        {{ spec.label }}
                    </div>
                </div>
                <div class="text-center">
                    <img :src="products[0].image" class="size-12 mx-auto rounded-lg mb-2 object-cover" />
                    <p class="text-[10px] font-black italic truncate mb-4">Quantum Sonic</p>
                    <div v-for="spec in comparisonSpecs" :key="spec.label"
                        class="h-10 flex items-center justify-center text-xs font-black">
                        {{ spec.p1 }}
                    </div>
                </div>
                <div class="text-center">
                    <img :src="products[1].image" class="size-12 mx-auto rounded-lg mb-2 object-cover" />
                    <p class="text-[10px] font-black italic truncate mb-4">Aerolight</p>
                    <div v-for="spec in comparisonSpecs" :key="spec.label"
                        class="h-10 flex items-center justify-center text-xs font-black">
                        {{ spec.p2 }}
                    </div>
                </div>
            </div>
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 2: Promotional & Bundles
         ========================================================================== -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- 7. Featured Product Card -->
        <UCard class="lg:col-span-2 overflow-hidden group" :ui="{ body: 'p-0 sm:p-0' }">
            <div class="flex flex-col md:flex-row h-full">
                <div class="md:w-1/2 relative">
                    <img :src="products[0].image" class="h-full w-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                </div>
                <div class="p-8 md:w-1/2 flex flex-col justify-center bg-neutral-900 text-white">
                    <UBadge label="Editor's Choice" color="primary" variant="solid" class="w-fit mb-4" />
                    <h2 class="text-3xl font-black italic leading-tight mb-4">{{ products[0].name }}</h2>
                    <p class="text-neutral-400 text-sm mb-8 leading-relaxed">Experience sound like never before with
                        our
                        flagship quantum-tuned drivers and adaptive noise cancellation.</p>
                    <div class="flex items-center gap-6 mb-8">
                        <div>
                            <p class="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Price</p>
                            <p class="text-2xl font-black italic text-primary">{{ products[0].price }}</p>
                        </div>
                        <div class="h-8 w-px bg-neutral-800" />
                        <div>
                            <p class="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Rating</p>
                            <div class="flex items-center gap-1">
                                <span class="text-lg font-black italic">{{ products[0].rating }}</span>
                                <UIcon name="i-lucide-star" class="size-4 text-warning fill-current" />
                            </div>
                        </div>
                    </div>
                    <UButton label="Explore Features" size="lg" color="primary" icon="i-lucide-arrow-right" trailing />
                </div>
            </div>
        </UCard>

        <!-- 8. Bundle Offer Card -->
        <UCard class="border-2 border-dashed border-primary/50 bg-primary/5">
            <div class="text-center mb-6">
                <UBadge label="Value Bundle" color="primary" variant="subtle" class="mb-2" />
                <h3 class="font-black italic text-lg leading-tight">Pro Audio Starter Kit</h3>
            </div>
            <div class="space-y-4 mb-8">
                <div v-for="i in 3" :key="i"
                    class="flex items-center gap-3 p-2 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-default">
                    <div class="size-10 bg-neutral-100 rounded-lg shrink-0" />
                    <div class="flex-1 min-w-0 text-left">
                        <p class="text-xs font-bold truncate">Premium Item #{{ i }}</p>
                        <p class="text-[10px] text-dimmed italic">$49.00</p>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between p-4 bg-primary text-white rounded-2xl mb-4">
                <div class="text-left">
                    <p class="text-[10px] uppercase font-bold opacity-80">Bundle Price</p>
                    <p class="text-2xl font-black italic">$129.00</p>
                </div>
                <div class="text-right">
                    <p class="text-[10px] uppercase font-bold opacity-80">You Save</p>
                    <p class="text-lg font-black italic">$48.00</p>
                </div>
            </div>
            <UButton label="Add Bundle to Cart" block color="primary" size="lg" />
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 3: Specialized Formats
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <!-- 11. Digital Download Card -->
        <UCard class="group">
            <div
                class="size-16 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UIcon name="i-lucide-file-audio" class="size-8 text-primary" />
            </div>
            <h4 class="font-black italic text-sm mb-1">Ambient Sound Pack</h4>
            <p class="text-xs text-dimmed mb-6">50+ High-quality wav samples for production.</p>
            <div class="flex items-center justify-between mb-4">
                <span class="text-lg font-black italic">$19.00</span>
                <span class="text-[10px] text-dimmed font-bold uppercase">240MB • ZIP</span>
            </div>
            <UButton label="Download Now" icon="i-lucide-download" block color="primary" variant="soft" />
        </UCard>

        <!-- 12. Marketplace Seller Card -->
        <UCard>
            <div class="flex items-center gap-3 mb-6">
                <UAvatar src="https://i.pravatar.cc/100?u=seller" size="lg" />
                <div>
                    <h4 class="font-bold italic text-sm">TechVibe Official</h4>
                    <div class="flex items-center gap-1 mt-1">
                        <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-2 text-warning fill-current" />
                        <span class="text-[10px] text-dimmed font-bold ml-1">(4.9)</span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-1 mb-6 rounded-xl overflow-hidden">
                <img v-for="i in 3" :key="i" :src="`https://picsum.photos/seed/seller-${i}/100/100`"
                    class="aspect-square object-cover" />
            </div>
            <UButton label="Visit Store" block color="neutral" variant="outline" size="sm" />
        </UCard>

        <!-- 13. Product Variant Card -->
        <UCard title="Select Variant">
            <div class="space-y-6">
                <div>
                    <p class="text-[10px] text-dimmed font-bold uppercase mb-3 tracking-widest">Color</p>
                    <div class="flex gap-2">
                        <div v-for="c in ['bg-black', 'bg-indigo-600', 'bg-red-500']" :key="c"
                            :class="[c, c === 'bg-black' ? 'ring-2 ring-primary ring-offset-2' : '']"
                            class="size-8 rounded-full cursor-pointer shadow-inner" />
                    </div>
                </div>
                <div>
                    <p class="text-[10px] text-dimmed font-bold uppercase mb-3 tracking-widest">Size</p>
                    <div class="flex gap-2">
                        <div v-for="s in ['S', 'M', 'L', 'XL']" :key="s"
                            :class="s === 'M' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-neutral-900 border-default'"
                            class="size-10 rounded-lg border-2 flex items-center justify-center text-xs font-black cursor-pointer hover:border-primary transition-colors">
                            {{ s }}
                        </div>
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 14. Review Highlight Card -->
        <UCard>
            <div class="flex items-center gap-1 mb-3">
                <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-3 text-warning fill-current" />
            </div>
            <p class="text-sm italic leading-relaxed mb-6">"These headphones completely changed my work-from-home
                setup. The
                noise cancellation is absolute magic."</p>
            <div class="flex items-center gap-3">
                <UAvatar src="https://i.pravatar.cc/100?u=sarah" size="xs" />
                <div>
                    <p class="text-xs font-black italic">Sarah J.</p>
                    <p class="text-[10px] text-dimmed font-bold uppercase">Verified Buyer</p>
                </div>
            </div>
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 4: Promotions & Incentives
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <!-- 15. Coupon Promo Card -->
        <UCard class="bg-primary text-white border-none relative overflow-hidden group">
            <div
                class="absolute -right-4 -bottom-4 size-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div class="relative border-2 border-dashed border-white/30 rounded-xl p-4 text-center">
                <p class="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Limited Time Offer</p>
                <h4 class="text-3xl font-black italic mb-4">SAVE20</h4>
                <p class="text-xs font-bold mb-6">20% OFF YOUR FIRST ORDER</p>
                <UButton label="Copy Code" block color="neutral" variant="solid" size="sm"
                    class="font-black text-primary" />
            </div>
        </UCard>

        <!-- 16. Upsell Recommendation Card -->
        <UCard title="Complete the Look">
            <div class="flex gap-4 items-center">
                <img src="https://picsum.photos/seed/case/200/200"
                    class="size-16 rounded-lg object-cover bg-neutral-100" />
                <div class="flex-1">
                    <h4 class="text-xs font-bold">Premium Carry Case</h4>
                    <p class="text-xs font-black text-primary mt-1">$29.00</p>
                    <UButton label="Add" size="xs" color="primary" variant="soft" block class="mt-2" />
                </div>
            </div>
        </UCard>

        <!-- 19. Auction Bid Card -->
        <UCard class="relative overflow-hidden group">
            <div
                class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-error via-warning to-error animate-gradient" />
            <div class="flex justify-between items-start mb-4">
                <div>
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest">Current Bid</p>
                    <p class="text-2xl font-black italic text-error">$1,250</p>
                </div>
                <div class="text-right">
                    <p class="text-[10px] text-dimmed font-bold uppercase tracking-widest">Time Left</p>
                    <p class="text-sm font-black italic">02:14:05</p>
                </div>
            </div>
            <div class="flex gap-2">
                <UInput placeholder="Enter bid amount" class="flex-1" size="sm" />
                <UButton label="Place Bid" color="error" size="sm" class="font-black italic" />
            </div>
            <p class="text-[10px] text-dimmed mt-3 text-center font-bold italic">14 bids placed so far</p>
        </UCard>

        <!-- 20. Luxury Product Card -->
        <UCard class="border-none shadow-2xl bg-white dark:bg-neutral-950 p-8 text-center group">
            <div class="mb-8 relative">
                <div
                    class="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                <img src="https://picsum.photos/seed/luxury/400/400" class="relative size-40 mx-auto object-contain" />
            </div>
            <p class="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-4">Limited Edition</p>
            <h3 class="text-2xl font-serif italic mb-6">The Obsidian Series</h3>
            <p class="text-xs text-dimmed leading-relaxed mb-8 px-4 font-light">Meticulously crafted with
                aerospace-grade
                titanium and bespoke leather finishes.</p>
            <div class="text-2xl font-light tracking-widest mb-8">$4,200</div>
            <UButton label="Request Invitation" block color="neutral" variant="outline"
                class="font-light tracking-widest uppercase text-[10px]" />
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 5: Post-Purchase & History
         ========================================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <!-- 17. Order Tracking Card -->
        <UCard title="Track Shipment">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <p class="text-xs text-dimmed font-bold uppercase">Order ID</p>
                    <p class="text-sm font-black italic">#TK-44921</p>
                </div>
                <UBadge color="primary" variant="subtle" size="sm" class="font-black uppercase">In Transit</UBadge>
            </div>
            <div
                class="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-100 dark:before:bg-neutral-800">
                <div v-for="step in orderStages" :key="step.label" class="flex items-center gap-4 relative">
                    <div :class="[
                        step.status === 'completed' ? 'bg-primary text-white' :
                            step.status === 'current' ? 'bg-primary/20 text-primary ring-4 ring-primary/10' :
                                'bg-neutral-100 dark:bg-neutral-800 text-dimmed'
                    ]" class="size-10 rounded-full flex items-center justify-center z-10 shrink-0">
                        <UIcon :name="step.icon" class="size-5" />
                    </div>
                    <div>
                        <p class="text-sm font-bold" :class="step.status === 'upcoming' ? 'text-dimmed' : ''">{{
                            step.label
                        }}</p>
                        <p v-if="step.status === 'completed'"
                            class="text-[10px] text-dimmed font-bold uppercase mt-0.5">May
                            12, 10:30 AM</p>
                        <p v-if="step.status === 'current'" class="text-[10px] text-primary font-bold uppercase mt-0.5">
                            Expected Tomorrow</p>
                    </div>
                </div>
            </div>
        </UCard>

        <!-- 18. Recently Viewed Card -->
        <UCard title="Recently Viewed">
            <div class="grid grid-cols-2 gap-4 mt-2">
                <div v-for="i in 2" :key="i" class="group/item cursor-pointer">
                    <div class="aspect-square rounded-xl overflow-hidden mb-2 bg-neutral-100">
                        <img :src="`https://picsum.photos/seed/recent-${i}/200/200`"
                            class="size-full object-cover group-hover/item:scale-110 transition-transform" />
                    </div>
                    <p class="text-[10px] font-bold truncate">Premium Product {{ i }}</p>
                    <p class="text-xs font-black italic text-primary mt-0.5">$89.00</p>
                </div>
            </div>
        </UCard>
    </section>

    <!-- ==========================================================================
         Section 6: Checkout & Inventory
         ========================================================================== -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- 6. Cart Summary Card -->
        <UCard title="Order Summary">
            <div class="space-y-3 mt-4">
                <div class="flex justify-between text-sm">
                    <span class="text-dimmed">Subtotal (3 items)</span>
                    <span class="font-bold">$464.00</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-dimmed">Shipping</span>
                    <span class="text-success font-bold">FREE</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-dimmed">Tax</span>
                    <span class="font-bold">$38.20</span>
                </div>
                <div class="border-t border-default pt-4 mt-2 flex justify-between items-end">
                    <span class="text-xs font-bold uppercase text-dimmed">Total</span>
                    <span class="text-2xl font-black italic text-primary">$502.20</span>
                </div>
            </div>
            <template #footer>
                <UButton label="Proceed to Checkout" icon="i-lucide-shield-check" block size="lg" color="primary" />
            </template>
        </UCard>

        <!-- 9. Inventory Status Card -->
        <UCard class="relative overflow-hidden">
            <div class="flex items-center gap-3 mb-6">
                <div class="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <UIcon name="i-lucide-box" class="size-6 text-orange-500" />
                </div>
                <div>
                    <h4 class="font-bold italic text-sm">Stock Alert</h4>
                    <p class="text-[10px] text-dimmed uppercase font-bold">Low inventory warning</p>
                </div>
            </div>
            <div class="space-y-4">
                <div class="p-3 bg-orange-500/5 rounded-xl border border-orange-500/10">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-bold">Quantum Headphones</span>
                        <UBadge color="warning" variant="subtle" size="sm">5 left</UBadge>
                    </div>
                    <UProgress :model-value="15" color="warning" size="xs" />
                </div>
                <p class="text-xs text-dimmed leading-relaxed">Consider restocking soon. Average daily sales: <span
                        class="font-bold text-default">2 units</span>.</p>
                <UButton label="Create Restock Order" block color="neutral" variant="outline" size="sm" />
            </div>
        </UCard>

        <!-- 10. Subscription Product Card -->
        <UCard class="ring-2 ring-primary relative overflow-hidden">
            <div
                class="absolute right-0 top-0 bg-primary text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl">
                Save 20%</div>
            <h4 class="font-black italic text-lg mb-1">Monthly Coffee Club</h4>
            <p class="text-xs text-dimmed mb-6">Freshly roasted beans delivered to your door.</p>
            <div class="flex items-baseline gap-1 mb-6">
                <span class="text-3xl font-black italic">$24</span>
                <span class="text-sm text-dimmed font-bold">/month</span>
            </div>
            <ul class="space-y-3 mb-8">
                <li v-for="feat in ['2 x 500g Signature Blend', 'Exclusive Brewing Tips', 'Free Shipping Always']"
                    :key="feat" class="flex items-center gap-2 text-xs">
                    <UIcon name="i-lucide-check-circle" class="size-4 text-primary" />
                    {{ feat }}
                </li>
            </ul>
            <UButton label="Subscribe Now" block color="primary" size="lg" />
        </UCard>
    </section>
</template>
