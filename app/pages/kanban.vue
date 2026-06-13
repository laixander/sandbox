<script setup lang="ts">
import type { KanbanPriority, KanbanColumn, KanbanCard } from '~/types/kanban'

definePageMeta({ title: 'Kanban', isTable: true })

const store = useKanbanStore()
const { log } = useActivityLog()

// ── Search & Filter ───────────────────────────────────────────────────────
const searchQuery = ref('')
const selectedTags = ref<string[]>([])

const availableTags = computed(() => {
    const tags = new Set<string>()
    store.columns.forEach((col: KanbanColumn) => {
        col.cards.forEach(card => {
            card.tags?.forEach((t: string) => tags.add(t))
        })
    })
    return Array.from(tags).sort()
})

const displayColumns = computed(() => {
    return store.columns.map((c: KanbanColumn) => {
        const filteredCards = c.cards.filter(card => {
            let matchSearch = true
            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase()
                matchSearch = card.title.toLowerCase().includes(query) || 
                       card.description?.toLowerCase().includes(query) ||
                       (card.tags?.some((t: string) => t.toLowerCase().includes(query)) ?? false)
            }

            let matchTags = true
            if (selectedTags.value.length > 0) {
                matchTags = selectedTags.value.some((tag: string) => card.tags?.includes(tag))
            }

            return matchSearch && matchTags
        })
        return {
            ...c,
            cards: filteredCards
        }
    })
})

// ── Priority config ───────────────────────────────────────────────────────
type BadgeColor = 'neutral' | 'warning' | 'error' | 'info' | 'success' | 'primary' | 'secondary'

const priorityConfig: Record<KanbanPriority, { color: BadgeColor; icon: string; label: string }> = {
    low: { color: 'neutral', icon: 'i-lucide-arrow-down', label: 'Low' },
    medium: { color: 'warning', icon: 'i-lucide-minus', label: 'Medium' },
    high: { color: 'error', icon: 'i-lucide-arrow-up', label: 'High' },
    critical: { color: 'error', icon: 'i-lucide-flame', label: 'Critical' },
}

// ── Drag state ────────────────────────────────────────────────────────────
const isDragging = ref(false)
const dragging = ref<{ cardId: string; fromColumnId: string } | null>(null)

/**
 * Tracks WHERE the drag cursor currently is:
 * - cardId: insert BEFORE this card
 * - cardId null: drop at the END of the column
 */
const dragOver = ref<{ columnId: string; cardId: string | null } | null>(null)

const isDraggingCard = (cardId: string) => dragging.value?.cardId === cardId
const isColumnOver = (columnId: string) => dragOver.value?.columnId === columnId
const isCardOver = (cardId: string) => dragOver.value?.cardId === cardId

// ── Drag handlers ─────────────────────────────────────────────────────────
const onCardDragStart = (e: DragEvent, cardId: string, columnId: string, locked: boolean) => {
    if (locked) {
        e.preventDefault()
        return
    }
    isDragging.value = true
    dragging.value = { cardId, fromColumnId: columnId }
    e.dataTransfer!.effectAllowed = 'move'
}

const onCardDragOver = (cardId: string, columnId: string) => {
    if (!dragging.value) return
    if (dragOver.value?.cardId === cardId && dragOver.value?.columnId === columnId) return
    dragOver.value = { columnId, cardId }
}

const onColumnDragOver = (columnId: string) => {
    if (!dragging.value) return
    if (dragOver.value?.columnId === columnId && dragOver.value?.cardId === null) return
    dragOver.value = { columnId, cardId: null }
}

const moveCard = (cardId: string, fromColumnId: string, toColumnId: string, insertBeforeCardId?: string) => {
    // Resolve human-readable names for the log message
    const fromCol = store.columns.find((c: KanbanColumn) => c.id === fromColumnId)
    const toCol = store.columns.find((c: KanbanColumn) => c.id === toColumnId)
    const card = fromCol?.cards.find((c: KanbanCard) => c.id === cardId)

    store.moveCard(cardId, fromColumnId, toColumnId, insertBeforeCardId)

    if (card && fromCol && toCol) {
        if (fromColumnId === toColumnId) {
            log('Kanban', 'updated', `Reordered "${card.title}" within "${toCol.title}"`)
        } else {
            log('Kanban', 'updated', `Moved "${card.title}" from "${fromCol.title}" to "${toCol.title}"`)
        }
    }
}

const onDrop = (toColumnId: string, insertBeforeCardId?: string) => {
    if (!dragging.value) return

    const { cardId, fromColumnId } = dragging.value

    moveCard(cardId, fromColumnId, toColumnId, insertBeforeCardId)

    dragging.value = null
    dragOver.value = null
    setTimeout(() => { isDragging.value = false }, 50)
}

const onDragEnd = () => {
    dragging.value = null
    dragOver.value = null
    setTimeout(() => { isDragging.value = false }, 50)
}

// ── Add card ──────────────────────────────────────────────────────────────
const addingCard = ref<string | null>(null)  // columnId
const newCardTitle = ref('')
const newCardPriority = ref<KanbanPriority>('medium')

// Auto-focus the title input whenever the add-card form is shown.
// Uses a querySelector because the UInput is inside a v-for — useTemplateRef
// would return an array and the exposed property name is ambiguous.
watch(addingCard, async (val: string | null) => {
    if (!val) return
    await nextTick()
    document.querySelector<HTMLInputElement>('.kanban-add-card-input input')?.focus()
})

const startAddCard = (columnId: string) => {
    addingCard.value = columnId
    newCardTitle.value = ''
    newCardPriority.value = 'medium'
}

const confirmAddCard = () => {
    if (!addingCard.value || !newCardTitle.value.trim()) {
        cancelAddCard()
        return
    }
    const col = store.columns.find((c: KanbanColumn) => c.id === addingCard.value)
    store.addCard(addingCard.value, {
        title: newCardTitle.value.trim(),
        priority: newCardPriority.value,
        tags: [],
        locked: false,
    })
    log('Kanban', 'created', `Added "${newCardTitle.value.trim()}" to "${col?.title ?? addingCard.value}"`)
    cancelAddCard()
}

const cancelAddCard = () => {
    addingCard.value = null
    newCardTitle.value = ''
}

const onInputKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') confirmAddCard()
    else if (e.key === 'Escape') cancelAddCard()
}

const priorityOptions: { value: KanbanPriority; label: string }[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
]

// ── Tag dragging ──────────────────────────────────────────────────────────
const draggedTag = ref<{ cardId: string; tag: string } | null>(null)
const dragOverTag = ref<{ cardId: string; tag: string } | null>(null)

const onTagDragStart = (e: DragEvent, cardId: string, tag: string) => {
    draggedTag.value = { cardId, tag }
    e.dataTransfer!.effectAllowed = 'move'
}

const onTagDragOver = (cardId: string, tag: string) => {
    if (!draggedTag.value || draggedTag.value.cardId !== cardId) return
    if (dragOverTag.value?.cardId === cardId && dragOverTag.value?.tag === tag) return
    dragOverTag.value = { cardId, tag }
}

const onTagDrop = (cardId: string, targetTag: string) => {
    if (!draggedTag.value || draggedTag.value.cardId !== cardId) return
    const sourceTag = draggedTag.value.tag
    if (sourceTag === targetTag) {
        draggedTag.value = null
        dragOverTag.value = null
        return
    }

    const card = store.columns.flatMap((c: KanbanColumn) => c.cards).find((c: KanbanCard) => c.id === cardId)
    if (!card) return

    const fromIndex = card.tags.indexOf(sourceTag)
    const toIndex = card.tags.indexOf(targetTag)

    if (fromIndex !== -1 && toIndex !== -1) {
        card.tags.splice(fromIndex, 1)
        card.tags.splice(toIndex, 0, sourceTag)
    }
    draggedTag.value = null
    dragOverTag.value = null
}

const onTagDragEnd = () => {
    draggedTag.value = null
    dragOverTag.value = null
}

// ── Dropdown items ────────────────────────────────────────────────────────
const getColumnDropdownItems = (cardId: string, currentColumnId: string) => {
    return [
        store.columns
            .filter((c: KanbanColumn) => c.id !== currentColumnId)
            .map((c: KanbanColumn) => ({
                label: c.title,
                icon: c.icon,
                onSelect: () => moveCard(cardId, currentColumnId, c.id)
            }))
    ]
}
</script>

<template>
    <PageHeading forTable title="Kanban" description="Drag cards between columns to track progress">
        <div class="flex gap-2">
            <TableGlobalFilter v-model="searchQuery" placeholder="Search cards..." />
            <USelectMenu v-model="selectedTags" :items="availableTags" multiple placeholder="Filter by tags" class="w-48" />
        </div>
    </PageHeading>

    <Teleport to="#header-actions-teleport">
        <div class="flex items-center gap-2 text-xs text-muted">
            <UIcon name="i-lucide-lock" class="size-3.5" />
            <span>{{ store.lockedCount }} locked</span>
            <span class="text-default/20">·</span>
            <span>{{ store.totalCards }} total</span>
        </div>
    </Teleport>

    <!-- ── Board ── -->
    <ClientOnly>
        <div class="flex-1 min-h-0 flex flex-col">
            <div class="flex-1 flex gap-3 overflow-x-auto scrollbar p-4">

                <div v-for="column in displayColumns" :key="column.id" class="flex flex-col w-72 shrink-0 gap-2">
                    <!-- Column header -->
                    <div class="flex items-center gap-2 p-2 rounded-xl shrink-0">
                        <UChip :color="(column.color as any)" size="2xl" standalone inset />
                        <UIcon :name="column.icon" class="size-4 text-muted shrink-0" />
                        <span class="text-sm font-semibold truncate">{{ column.title }}</span>
                        <UBadge :label="String(column.cards.length)" variant="soft" color="neutral"
                            class="ml-auto shrink-0 font-mono" />
                    </div>

                    <!-- Drop zone -->
                    <div class="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto scrollbar rounded-xl p-2 transition-all duration-150"
                        :class="isColumnOver(column.id)
                            ? 'bg-primary/5 ring-2 ring-primary/30 ring-dashed'
                            : 'bg-elevated/40'" @dragover.prevent="onColumnDragOver(column.id)"
                        @drop.prevent="onDrop(column.id)" @dragend="onDragEnd">
                        <template v-for="card in column.cards" :key="card.id">

                            <!-- Card wrapper to prevent layout shift -->
                            <div class="relative">
                                <!-- Drop-before indicator -->
                                <div v-if="isCardOver(card.id)" class="absolute -top-[5px] left-1 right-1 h-0.5 rounded-full bg-primary z-10 pointer-events-none" />

                                <!-- Modal wrapper for card -->
                            <UModal :ui="{ header: 'flex justify-between items-center' }">
                                <template #header="{ close }">
                                    <div class="flex items-center gap-2">
                                        <UDropdownMenu :items="getColumnDropdownItems(card.id, column.id)"
                                            :content="{ align: 'start' }" size="sm" :disabled="card.locked">
                                            <UButton :label="column.title" :icon="column.icon" variant="solid"
                                                :trailing-icon="card.locked ? undefined : 'i-lucide-arrow-right'"
                                                size="sm" :class="[
                                                    'bg-' + column.color, 'transition-all text-white',
                                                    card.locked ? 'pointer-events-none' : 'hover:bg-' + column.color + ' active:bg-' + column.color + ' hover:bg-none hover:brightness-90',
                                                    'disabled:bg-' + column.color,
                                                    'focus-visible:outline-' + column.color
                                                ]" />
                                        </UDropdownMenu>
                                        <!-- {{ card.title }} -->
                                        <UButton v-model="card.locked" color="neutral" variant="ghost" size="sm"
                                            :icon="card.locked ? 'i-lucide-lock' : 'i-lucide-lock-open'"
                                            @click="card.locked = !card.locked" />
                                    </div>
                                    <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-x"
                                        @click="close" />
                                </template>
                                <!-- Card -->
                                <UCard :ui="{ root: 'ring-0 border border-default', body: 'sm:p-4 relative space-y-2' }"
                                    class="group transition-all select-none shrink-0" :class="[
                                        card.locked
                                            ? 'cursor-default opacity-80'
                                            : 'cursor-pointer active:cursor-default hover:border-primary/30 hover:shadow-sm',
                                        isDraggingCard(card.id) && 'opacity-40 scale-95',
                                    ]" :draggable="!card.locked"
                                    @click="(e: MouseEvent) => isDragging && e.stopPropagation()"
                                    @dragstart="onCardDragStart($event, card.id, column.id, card.locked)"
                                    @dragover.prevent.stop="onCardDragOver(card.id, column.id)"
                                    @drop.prevent.stop="onDrop(column.id, card.id)" @dragend="onDragEnd">

                                    <!-- Lock badge (top-right) -->
                                    <div v-if="card.locked" class="absolute top-2.5 right-2.5 text-muted"
                                        title="This card is locked and cannot be moved">
                                        <UIcon name="i-lucide-lock" class="size-3" />
                                    </div>

                                    <!-- Title -->
                                    <p class="text-sm font-medium leading-snug pr-4"
                                        :class="card.locked ? 'text-muted' : 'text-highlighted'">
                                        {{ card.title }}
                                    </p>

                                    <!-- Description -->
                                    <p v-if="card.description" class="text-xs text-muted leading-relaxed line-clamp-2">
                                        {{ card.description }}
                                    </p>

                                    <!-- Footer: priority + tags -->
                                    <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                                        <UBadge :label="priorityConfig[card.priority].label"
                                            :icon="priorityConfig[card.priority].icon"
                                            :color="priorityConfig[card.priority].color" variant="subtle" size="sm" />
                                        <UBadge v-for="tag in card.tags" :key="tag" :label="tag" color="neutral"
                                            variant="soft" size="sm" />
                                    </div>
                                </UCard>

                                <template #body>
                                    <div class="space-y-4">
                                        <UFormField label="Title" name="title">
                                            <UInput v-model="card.title" class="w-full" />
                                        </UFormField>

                                        <UFormField label="Priority / Status" name="priority">
                                            <USelect v-model="card.priority" :items="priorityOptions" class="w-full" />
                                        </UFormField>

                                        <UFormField label="Description" name="description">
                                            <UTextarea v-model="card.description"
                                                placeholder="Add a more detailed description..." autoresize
                                                class="w-full" />
                                        </UFormField>

                                        <UFormField label="Tags" name="tags">
                                            <div class="space-y-2 w-full">
                                                <div class="flex flex-wrap gap-1.5"
                                                    v-if="card.tags && card.tags.length">
                                                    <template v-for="tag in card.tags" :key="tag">
                                                        <!-- Tag wrapper to prevent layout shift -->
                                                        <div class="relative flex">
                                                            <!-- Drop-before indicator -->
                                                            <div v-if="dragOverTag?.cardId === card.id && dragOverTag?.tag === tag"
                                                                class="absolute -left-[4px] top-0 bottom-0 w-0.5 rounded-full bg-primary z-10 pointer-events-none" />

                                                        <UBadge color="neutral" variant="soft" size="sm"
                                                            class="flex items-center gap-1 cursor-grab active:cursor-grabbing transition-transform"
                                                            :class="{ 'opacity-50 scale-95': draggedTag?.cardId === card.id && draggedTag?.tag === tag }"
                                                            draggable="true"
                                                            @dragstart="(e: DragEvent) => onTagDragStart(e, card.id, tag)"
                                                            @dragover.prevent="onTagDragOver(card.id, tag)"
                                                            @drop.prevent="onTagDrop(card.id, tag)"
                                                            @dragend="onTagDragEnd">
                                                                {{ tag }}
                                                                <UIcon name="i-lucide-x"
                                                                    class="size-3 cursor-pointer hover:text-error"
                                                                    @click.stop="card.tags = card.tags.filter((t: string) => t !== tag)" />
                                                            </UBadge>
                                                        </div>
                                                    </template>
                                                </div>
                                                <UInput placeholder="Type and press Enter to add tags..." size="sm"
                                                    icon="i-lucide-tag" class="w-full" @keydown.enter.prevent="(e: KeyboardEvent) => {
                                                        const val = (e.target as HTMLInputElement).value.trim();
                                                        if (val && !card.tags.includes(val)) {
                                                            card.tags.push(val);
                                                        }
                                                        (e.target as HTMLInputElement).value = '';
                                                    }" />
                                            </div>
                                        </UFormField>
                                    </div>
                                </template>
                            </UModal>
                            </div>
                        </template>

                        <!-- Inline add-card form -->
                        <div v-if="addingCard === column.id"
                            class="bg-default rounded-lg border border-primary/50 p-3 space-y-2 shrink-0">
                            <UInput ref="addCardInput" v-model="newCardTitle" placeholder="Card title…" size="sm"
                                class="w-full kanban-add-card-input" @keydown="onInputKeydown" />
                            <div class="flex items-center gap-2">
                                <USelect v-model="newCardPriority" :items="priorityOptions" variant="soft" size="xs"
                                    class="flex-1" />
                                <UButton label="Add" icon="i-lucide-plus" variant="soft" size="xs"
                                    :disabled="!newCardTitle.trim()" @click="confirmAddCard" />
                                <UButton icon="i-lucide-x" size="xs" color="neutral" variant="ghost"
                                    @click="cancelAddCard" />
                            </div>
                        </div>

                        <!-- Empty column state -->
                        <UEmpty v-if="column.cards.length === 0 && addingCard !== column.id" variant="naked"
                            icon="i-lucide-inbox" title="No cards" description="Drop a card here or add one below"
                            class="flex-1 py-4" />
                    </div>

                    <!-- Add card trigger -->
                    <UButton v-if="addingCard !== column.id" label="Add Card" icon="i-lucide-plus" size="xs"
                        color="neutral" variant="ghost" class="shrink-0 justify-start mt-auto"
                        @click="startAddCard(column.id)" />
                </div>

            </div>
        </div>
    </ClientOnly>
</template>
