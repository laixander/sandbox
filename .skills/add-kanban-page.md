# Skill: Add a Kanban Board Page

## Purpose
Scaffold a drag-and-drop Kanban board with multiple columns, draggable cards, locked (non-draggable) cards, an inline add-card form, and cross-column + intra-column reordering — following the exact structure of `app/pages/kanban.vue`.

## When to Use
- You need a visual task/workflow board where items progress through stages
- Cards need to be moveable between columns via drag and drop
- Some cards must be pinned/locked and cannot be moved

## Key Files
| File | Role |
|---|---|
| `app/types/kanban.ts` | `KanbanPriority`, `KanbanCard`, `KanbanColumn` types |
| `app/stores/kanbanStore.ts` | `moveCard`, `addCard`, `deployMockData`, `removeMockData` |
| `app/pages/kanban.vue` | The board page |

---

## Steps

### 1. Define types (`app/types/kanban.ts`)
```ts
export type KanbanPriority = 'low' | 'medium' | 'high' | 'critical'

export interface KanbanCard {
    id: string
    title: string
    description?: string
    priority: KanbanPriority
    tags: string[]
    /** If true, the card cannot be dragged */
    locked: boolean
    createdAt: string
}

export interface KanbanColumn {
    id: string
    title: string
    icon: string
    dotColor: string    // Tailwind class e.g. 'bg-blue-500'
    cards: KanbanCard[]
}
```

### 2. Create the store (`app/stores/kanbanStore.ts`)
```ts
import { defineStore } from 'pinia'
import type { KanbanCard, KanbanColumn } from '~/types/kanban'
import { SeederService } from '~/utils/seeder'

// Column structure is ALWAYS present (even after reset).
// Cards are what get seeded / cleared — columns are never destroyed.
function createColumnStructure(): KanbanColumn[] {
    return [
        { id: 'backlog',     title: 'Backlog',     icon: 'i-lucide-inbox',            color: 'error',  cards: [] },
        { id: 'todo',        title: 'To Do',        icon: 'i-lucide-circle-dashed',    color: 'blue',   cards: [] },
        { id: 'in-progress', title: 'In Progress',  icon: 'i-lucide-timer',            color: 'amber',  cards: [] },
        { id: 'review',      title: 'Review',       icon: 'i-lucide-eye',              color: 'violet', cards: [] },
        { id: 'done',        title: 'Done',         icon: 'i-lucide-circle-check-big', color: 'green',  cards: [] },
    ]
}

function createInitialColumns(): KanbanColumn[] {
    const cols = createColumnStructure()
    const getCol = (id: string) => cols.find(c => c.id === id)

    const backlog = getCol('backlog')
    if (backlog) backlog.cards = SeederService.generateKanbanCards(5)

    const todo = getCol('todo')
    if (todo) todo.cards = SeederService.generateKanbanCards(7)

    return cols
}

export const useKanbanStore = defineStore('kanbanStore', {
    state: () => ({
        // Columns always exist — cards are what get seeded / cleared
        columns: createInitialColumns() as KanbanColumn[],
    }),

    actions: {
        moveCard(cardId: string, fromColumnId: string, toColumnId: string, insertBeforeCardId?: string) {
            const fromCol = this.columns.find(c => c.id === fromColumnId)
            const toCol   = this.columns.find(c => c.id === toColumnId)
            if (!fromCol || !toCol) return

            const cardIdx = fromCol.cards.findIndex(c => c.id === cardId)
            if (cardIdx === -1) return

            const [card] = fromCol.cards.splice(cardIdx, 1)
            if (!card) return   // splice returns T[] — guard required so TS narrows T | undefined → T

            if (insertBeforeCardId) {
                const targetIdx = toCol.cards.findIndex(c => c.id === insertBeforeCardId)
                toCol.cards.splice(targetIdx === -1 ? toCol.cards.length : targetIdx, 0, card)
            } else {
                toCol.cards.push(card)
            }
        },

        addCard(columnId: string, data: Omit<KanbanCard, 'id' | 'createdAt'>) {
            const col = this.columns.find(c => c.id === columnId)
            if (!col) return
            col.cards.unshift({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...data })
        },

        deployMockData() { this.columns = createInitialColumns() },

        removeMockData() {
            // Keep column structure — only clear cards so UEmpty state shows per column
            this.columns.forEach(col => { col.cards = [] })
        },
    },

    getters: {
        // Columns always exist, so hasData = there are cards, not there are columns
        hasData:     (state) => state.columns.some(col => col.cards.length > 0),
        totalCards:  (state) => state.columns.reduce((sum, col) => sum + col.cards.length, 0),
        lockedCount: (state) => state.columns.reduce((sum, col) => sum + col.cards.filter(c => c.locked).length, 0),
    },

    persist: { storage: persistedState.localStorage },
})
```

> Use `SeederService.generateKanbanCards(count)` instead of hardcoded cards to ensure the board uses realistic test data consistent with the rest of the application.

### 3. Create the page (`app/pages/kanban.vue`)

**`definePageMeta`:**
```ts
definePageMeta({ title: 'Kanban', isTable: true })
// isTable: true gives the full-height flex layout needed for the board
```

> **Do NOT auto-seed on `onMounted`.** The store starts empty, like all other stores. Data is only populated via DemoFab "Deploy Demo Data". Auto-seeding on mount will re-populate the board after a system reset — undoing it silently.

**Type the badge color config explicitly** — TypeScript widens object literal `color` fields to `string`, which fails UBadge's prop type:
```ts
type BadgeColor = 'neutral' | 'warning' | 'error' | 'info' | 'success' | 'primary' | 'secondary'

const priorityConfig: Record<KanbanPriority, { color: BadgeColor; icon: string; label: string }> = {
    low:      { color: 'neutral', icon: 'i-lucide-arrow-down', label: 'Low' },
    medium:   { color: 'warning', icon: 'i-lucide-minus',      label: 'Medium' },
    high:     { color: 'error',   icon: 'i-lucide-arrow-up',   label: 'High' },
    critical: { color: 'error',   icon: 'i-lucide-flame',      label: 'Critical' },
}
```

**Search and Filter state:**
```ts
const searchQuery = ref('')
const selectedTags = ref<string[]>([])

const availableTags = computed(() => {
    const tags = new Set<string>()
    store.columns.forEach(col => {
        col.cards.forEach(card => card.tags?.forEach(t => tags.add(t)))
    })
    return Array.from(tags).sort()
})

const displayColumns = computed(() => {
    return store.columns.map(c => {
        const filteredCards = c.cards.filter(card => {
            let matchSearch = true
            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase()
                matchSearch = card.title.toLowerCase().includes(query) || 
                       card.description?.toLowerCase().includes(query) ||
                       (card.tags?.some(t => t.toLowerCase().includes(query)) ?? false)
            }
            let matchTags = true
            if (selectedTags.value.length > 0) {
                matchTags = selectedTags.value.some(tag => card.tags?.includes(tag))
            }
            return matchSearch && matchTags
        })
        return { ...c, cards: filteredCards }
    })
})
```

**Drag state:**
```ts
const dragging = ref<{ cardId: string; fromColumnId: string } | null>(null)
// columnId: the column being dragged over
// cardId: insert BEFORE this card; null = append to end
const dragOver = ref<{ columnId: string; cardId: string | null } | null>(null)
```

**Drag handlers:**
```ts
const onCardDragStart = (e: DragEvent, cardId: string, columnId: string, locked: boolean) => {
    if (locked) { e.preventDefault(); return }
    dragging.value = { cardId, fromColumnId: columnId }
    e.dataTransfer!.effectAllowed = 'move'
}

const onCardDragOver = (cardId: string, columnId: string) => {
    if (!dragging.value) return
    dragOver.value = { columnId, cardId }
}

const onColumnDragOver = (columnId: string) => {
    if (!dragging.value) return
    dragOver.value = { columnId, cardId: null }
}

const onDrop = (toColumnId: string, insertBeforeCardId?: string) => {
    if (!dragging.value) return
    store.moveCard(dragging.value.cardId, dragging.value.fromColumnId, toColumnId, insertBeforeCardId)
    dragging.value = null
    dragOver.value = null
}

const onDragEnd = () => { dragging.value = null; dragOver.value = null }
```

**Inline add-card form:**
```ts
const addingCard = ref<string | null>(null)  // column ID currently being added to
const newCardTitle = ref('')
const newCardPriority = ref<KanbanPriority>('medium')

// IMPORTANT: Do NOT use useTemplateRef for the input inside a v-for.
// Vue collects refs inside v-for into arrays, causing type errors.
// Use a watch + querySelector instead:
watch(addingCard, async (val) => {
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
    if (!addingCard.value || !newCardTitle.value.trim()) { cancelAddCard(); return }
    store.addCard(addingCard.value, { title: newCardTitle.value.trim(), priority: newCardPriority.value, tags: [], locked: false })
    cancelAddCard()
}

const cancelAddCard = () => { addingCard.value = null; newCardTitle.value = '' }
```


### 4. Template structure
```html
<PageHeading forTable title="Kanban" description="...">
    <div class="flex gap-2">
        <TableGlobalFilter v-model="searchQuery" placeholder="Search cards..." />
        <USelectMenu v-model="selectedTags" :items="availableTags" multiple placeholder="Filter by tags" class="w-48" />
    </div>
</PageHeading>

<!-- Board container: full height, horizontal scroll -->
<ClientOnly>
    <div class="flex-1 min-h-0 flex flex-col">
        <div class="flex-1 flex gap-3 overflow-x-auto scrollbar p-4">

            <div v-for="column in displayColumns" :key="column.id" class="flex flex-col w-72 shrink-0 gap-2">
                <!-- Column header -->
                <div class="flex items-center gap-2 p-2 rounded-xl shrink-0">
                <span class="size-2.5 rounded-full shrink-0" :class="column.dotColor" />
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

                    <!-- Drop-before indicator -->
                    <div v-if="isCardOver(card.id)" class="h-0.5 rounded-full bg-primary mx-1 shrink-0" />

                    <!-- Card -->
                    <UCard :ui="{ root: 'ring-0 border border-default', body: 'sm:p-4 relative space-y-2' }"
                        class="group transition-all select-none shrink-0" :class="[
                            card.locked
                                ? 'cursor-default opacity-80'
                                : 'cursor-grab active:cursor-grabbing hover:border-primary/30 hover:shadow-sm',
                            isDraggingCard(card.id) && 'opacity-40 scale-95',
                        ]" :draggable="!card.locked"
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
                            <UBadge v-for="tag in card.tags" :key="tag" :label="tag" color="neutral" variant="soft"
                                size="sm" />
                        </div>
                    </UCard>
                </template>

                <!-- Inline add-card form -->
                <div v-if="addingCard === column.id"
                    class="bg-default rounded-lg border border-primary/50 p-3 space-y-2 shrink-0">
                    <UInput ref="addCardInput" v-model="newCardTitle" placeholder="Card title…" size="sm"
                        class="w-full kanban-add-card-input" @keydown="onInputKeydown" />
                    <div class="flex items-center gap-2">
                        <USelect v-model="newCardPriority" :items="priorityOptions" variant="soft" size="xs"
                            class="flex-1" />
                        <UButton label="Add" variant="soft" size="xs" :disabled="!newCardTitle.trim()"
                            @click="confirmAddCard" />
                        <UButton icon="i-lucide-x" size="xs" color="neutral" variant="ghost"
                            @click="cancelAddCard" />
                    </div>
                </div>

                <!-- Empty column state -->
                <UEmpty v-if="column.cards.length === 0 && addingCard !== column.id" variant="naked"
                    icon="i-lucide-inbox" title="No cards" description="Drop a card here or add one below"
                    class="flex-1 py-4" />

                <!-- Add card trigger -->
                <UButton v-if="addingCard !== column.id" label="Add Card" icon="i-lucide-plus" size="xs"
                    color="neutral" variant="ghost" class="shrink-0 justify-start mt-auto"
                    @click="startAddCard(column.id)" />
            </div>
        </div>
    </div>
</ClientOnly>
```

### 5. Wire into sidebar (`app/layouts/default.vue`)
```ts
{ label: 'Kanban', icon: 'i-lucide-kanban', to: '/kanban' }
```

### 6. Wire into DemoFab (`app/components/DemoFab.vue`)
```ts
import { useKanbanStore } from '~/stores/kanbanStore'
const kanbanStore = useKanbanStore()

// Add to isDataDeployed:
|| kanbanStore.hasData

// Add to handleSeed:
kanbanStore.deployMockData()

// Add to handleReset:
kanbanStore.removeMockData()
```

---

## Conventions

- **`isTable: true`** in `definePageMeta` — required for the full-height layout the board needs
- **`locked: boolean`** on each card — set `draggable="false"` in the template and display `i-lucide-lock`; use `cursor-default opacity-80`
- **`dragOver.cardId`** — `null` means "append to end of column"; a card ID means "insert before this card"
- **Drop-before indicator** — `<div class="h-0.5 rounded-full bg-primary">` rendered ABOVE the target card via `v-if="isCardOver(card.id)"`
- **Column drop zone highlight** — `ring-2 ring-primary/30 ring-dashed bg-primary/5` applied when `isColumnOver(columnId)`
- **`@dragover.prevent.stop` and `@drop.prevent.stop` on cards** — `.stop` prevents the event from bubbling to the column `@dragover` and `@drop`, so highlighting works cleanly and drops fire only once
- **Never use `useTemplateRef` for elements inside `v-for`** — Vue collects them into an array; use `watch` + `querySelector` with a marker class instead
- **`type BadgeColor = ...`** — always type explicit color union configs; TypeScript widens object literals to `string`, which fails component prop types
- **Do NOT auto-seed on `onMounted`** — the store starts empty like all other stores; seeding is exclusively via DemoFab
- **`UEmpty` in empty columns** — `<UEmpty variant="naked" class="flex-1 py-4">` inside the drop zone when `column.cards.length === 0 && addingCard !== column.id`; keeps the column visible and still droppable
- **`splice` guard** — `const [card] = arr.splice(idx, 1); if (!card) return` is required; TypeScript types `splice` as returning `T[]` so the destructured element is `T | undefined`
- **`crypto.randomUUID()`** — standard for generating IDs

---

## Output / Deliverables
- `app/types/kanban.ts`
- `app/stores/kanbanStore.ts`
- `app/pages/kanban.vue`
- `app/layouts/default.vue` — sidebar nav item
- `app/components/DemoFab.vue` — store wired in

## Verification
- Navigate to `/kanban` — 5 empty columns show with `UEmpty` state; no cards until DemoFab seeds
- Click DemoFab "Deploy Demo Data" — 13 cards populate across columns; 4 show the lock icon
- Drag a draggable card to another column — it moves; board state persists after page reload
- Drag a locked card — cursor does not change to grab; card does not move
- Drag a card over another card in the same column — thin blue line appears above target; release reorders
- Drag over an empty column area — column highlights with dashed ring; release appends to end
- Click "Add Card" on any column — inline form appears, input is focused automatically
- Type a title, press Enter — card appears at the top of the column; form closes
- Press Esc — form closes without adding a card
- DemoFab "Reset" — all cards cleared; 5 columns remain with UEmpty state; "Deploy Demo Data" restores cards
