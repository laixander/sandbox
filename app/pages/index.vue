<script setup lang="ts">
import { ref, h } from 'vue'
import { useUserStore } from '~/stores/userStore'
import { SeederService } from '~/utils/seeder'
import { UAvatar, UBadge, UIcon, UButton } from '#components'
import type { TableColumn } from '@nuxt/ui'

const store = useUserStore()
const viewMode = ref<'card' | 'table'>('card')

type User = typeof store.users[0]

// --- CRUD UI Modal State Management ---
const isOpen = ref(false)
const isEditing = ref(false)
const currentUserId = ref<string | null>(null)

const form = ref({
  name: '',
  email: '',
  role: '',
  avatar: ''
})

const openCreateModal = () => {
  isEditing.value = false
  currentUserId.value = null
  form.value = {
    name: '',
    email: '',
    role: '',
    avatar: SeederService.generateSingleUser().avatar // Assign random image preview out-of-the-box
  }
  isOpen.value = true
}

const openEditModal = (user: User) => {
  isEditing.value = true
  currentUserId.value = user.id
  form.value = {
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar
  }
  isOpen.value = true
}

const handleSave = () => {
  if (isEditing.value && currentUserId.value) {
    store.updateUser(currentUserId.value, { ...form.value })
  } else {
    store.createUser({
      id: crypto.randomUUID(),
      ...form.value
    })
  }
  isOpen.value = false
}

// --- Table Column Definitions with Action Handler Render Functions ---
const tableColumns: TableColumn<User>[] = [
  {
    accessorKey: 'avatar',
    header: '',
    cell: ({ row }) => h(UAvatar, {
      src: row.original.avatar,
      alt: row.original.name,
      size: 'sm'
    })
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => h('span', { class: 'font-semibold' }, row.original.name)
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => h('span', { class: 'text-xs font-medium text-primary' }, row.original.role)
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => h('span', { class: 'flex items-center gap-1 text-dimmed' }, [
      h(UIcon, { name: 'i-lucide-mail', class: 'w-3.5 h-3.5 shrink-0' }),
      row.original.email
    ])
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => h(UBadge, {
      label: row.original.id.slice(0, 8),
      variant: 'soft',
      color: 'neutral',
      class: 'font-mono text-[11px]'
    })
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => h('div', { class: 'flex justify-end gap-1' }, [
      h(UButton, {
        icon: 'i-lucide-pencil',
        size: 'xs',
        variant: 'ghost',
        color: 'neutral',
        onClick: () => openEditModal(row.original)
      }),
      h(UButton, {
        icon: 'i-lucide-trash',
        size: 'xs',
        variant: 'ghost',
        color: 'error',
        onClick: () => store.deleteUser(row.original.id)
      })
    ])
  }
]
</script>

<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      
      <header class="text-center mb-10">
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
          NuxtUI Pinia <span class="text-primary">CRUD Demo</span>
        </h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-muted font-extralight sm:mt-4">
          Seed, Create, Read, Update, and Delete data persisted across local storage.
        </p>
      </header>

      <ClientOnly>
        <UCard variant="subtle" class="mb-8">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="flex gap-3">
              <UButton
                icon="i-lucide-database-zap"
                size="md"
                color="primary"
                variant="solid"
                :loading="store.isLoading"
                @click="store.deployMockData(9)"
              >
                Deploy 9 Users
              </UButton>

              <UButton
                icon="i-lucide-plus"
                size="md"
                color="neutral"
                variant="subtle"
                @click="openCreateModal"
              >
                Add User
              </UButton>

              <UButton
                icon="i-lucide-trash"
                size="md"
                color="error"
                variant="ghost"
                :disabled="!store.hasUsers || store.isLoading"
                @click="store.removeMockData()"
              >
                Clear Data
              </UButton>
            </div>

            <div class="flex items-center gap-4 text-sm">
              <div class="flex items-center gap-1.5">
                <span class="text-muted">Status:</span>
                <UBadge :color="store.isLoading ? 'warning' : 'success'" variant="subtle">
                  {{ store.isLoading ? 'Seeding...' : 'Ready' }}
                </UBadge>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-muted">Total Records:</span>
                <UBadge color="neutral" variant="outline">{{ store.userCount }}</UBadge>
              </div>

              <UTabs
                v-model="viewMode"
                variant="pill"
                size="xs"
                :content="false"
                :items="[
                  { value: 'card', icon: 'i-lucide-grid-2x2' },
                  { value: 'table', icon: 'i-lucide-list' },
                ]"
              />
            </div>
          </div>
        </UCard>

        <div>
          <div v-if="store.isLoading && !store.hasUsers && viewMode === 'card'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <UCard v-for="n in 9" :key="n" variant="subtle" class="w-full shadow-sm">
              <div class="flex items-center space-x-4">
                <USkeleton class="h-12 w-12 rounded-full" />
                <div class="space-y-2 flex-1">
                  <USkeleton class="h-4 w-[60%]" />
                  <USkeleton class="h-4 w-[80%]" />
                </div>
              </div>
            </UCard>
          </div>

          <UCard v-else-if="!store.hasUsers" class="ring-0 py-12 border-2 border-dashed border-muted bg-transparent">
            <div class="flex flex-col items-center justify-center">
              <UIcon name="i-lucide-database" class="w-12 h-12 text-dimmed mb-4" />
              <h3 class="font-semibold">No data deployed</h3>
              <p class="mt-1 text-sm text-dimmed">
                Your store is empty. Click "Deploy" to auto-seed or "Add User" to input custom metrics.
              </p>
            </div>
          </UCard>

          <div v-else-if="viewMode === 'card'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <UCard 
              v-for="user in store.users" 
              :key="user.id" 
              variant="subtle" 
              :ui="{ body: 'relative', footer: 'p-0 sm:p-0' }"
              class="shadow-sm"
            >
              <div class="flex items-start gap-4">
                <UAvatar :src="user.avatar" :alt="user.name" size="lg" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold truncate">{{ user.name }}</p>
                  <p class="text-xs font-medium text-primary truncate mb-2">{{ user.role }}</p>
                  <p class="text-xs text-muted flex items-center gap-1 w-full">
                    <UIcon name="i-lucide-mail" class="w-3.5 h-3.5 inline" />
                    <span class="truncate">{{ user.email }}</span>
                  </p>
                </div>
              </div>
              <UBadge :label="user.id.slice(0, 8)" variant="soft" color="neutral" class="absolute top-3 right-3 text-[10px] font-mono text-muted px-1.5 py-0.5 rounded" />
              <template #footer>
                <div class="flex justify-end divide-x divide-default">
                    <UButton icon="i-lucide-pencil" size="xs" variant="ghost" color="neutral" block class="py-3 rounded-none" @click="openEditModal(user)">Edit</UButton>
                    <UButton icon="i-lucide-trash" size="xs" variant="ghost" color="error" block class="py-3 rounded-none" @click="store.deleteUser(user.id)">Delete</UButton>
                  </div>
            </template>
            </UCard>
          </div>

          <UCard v-else variant="subtle" :ui="{ body: 'p-0 sm:p-0' }" class="shadow-sm">
            <UTable :data="store.users" :columns="tableColumns" :loading="store.isLoading" />
          </UCard>
        </div>
        
        <UModal v-model:open="isOpen" :title="isEditing ? 'Modify Profile Details' : 'Register New Profile'">
            <template #body>
            <div class="space-y-4">
              <UFormField label="Full Name" required>
                <UInput v-model="form.name" placeholder="John Doe" class="w-full" />
              </UFormField>
              <UFormField label="Job Assignment" required>
                <UInput v-model="form.role" placeholder="Systems Engineer" class="w-full" />
              </UFormField>
              <UFormField label="Electronic Mail" required>
                <UInput v-model="form.email" type="email" placeholder="john.doe@enterprise.io" class="w-full" />
              </UFormField>
            </div>
            </template>

            <template #footer>
              <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" @click="isOpen = false">Dismiss</UButton>
                <UButton color="primary" @click="handleSave">Save Record</UButton>
              </div>
            </template>
        </UModal>

        <template #fallback>
          <div class="w-full flex flex-col items-center justify-center py-12 text-muted">
            <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin mx-auto mb-4" />
            Syncing Storage State...
          </div>
        </template>
      </ClientOnly>

    </div>
  </div>
</template>