<script setup lang="ts">
definePageMeta({
    title: 'Roles',
    isTable: true,
})

import { UBadge, UIcon, UButton, UDropdownMenu } from '#components'
import { useRoleStore } from '~/stores/roleStore'
import type { TableColumn } from '@nuxt/ui'
import type { Role } from '~/types/role'

const store = useRoleStore()
const toast = useAppToast()
const { log } = useActivityLog()

// Modal state
const isOpen = ref(false)
const isEditing = ref(false)
const currentRoleId = ref<string | null>(null)
const modalRef = useTemplateRef('modalRef')

const openCreateModal = () => {
    isEditing.value = false
    currentRoleId.value = null
    modalRef.value?.reset()
    isOpen.value = true
}

const openEditModal = (role: Role) => {
    isEditing.value = true
    currentRoleId.value = role.id
    modalRef.value?.reset({
        name: role.name,
        description: role.description,
    })
    isOpen.value = true
}

const handleSave = (data: { name: string; description: string }) => {
    if (isEditing.value && currentRoleId.value) {
        store.updateRole(currentRoleId.value, data)
        log('Roles', 'updated', `Updated role "${data.name}"`, { meta: { id: currentRoleId.value } })
        toast.success('Role Updated', `${data.name} has been updated.`)
    } else {
        const newRole: Role = { id: crypto.randomUUID(), ...data }
        store.createRole(newRole)
        log('Roles', 'created', `Created role "${data.name}"`, { meta: { id: newRole.id } })
        toast.success('Role Created', `${data.name} has been added.`)
    }
    isOpen.value = false
}

// Confirmation modal state
const isDeleteConfirmOpen = ref(false)
const pendingDeleteId = ref<string | null>(null)

const promptDelete = (roleId: string) => {
    pendingDeleteId.value = roleId
    isDeleteConfirmOpen.value = true
}

const confirmDelete = () => {
    if (pendingDeleteId.value) {
        const role = store.roles.find((r: Role) => r.id === pendingDeleteId.value)
        store.deleteRole(pendingDeleteId.value)
        log('Roles', 'deleted', `Deleted role "${role?.name ?? 'Unknown'}"`, { meta: { id: pendingDeleteId.value } })
        toast.error('Role Deleted', 'The role has been removed.')
        pendingDeleteId.value = null
    }
}

const tableColumns: TableColumn<Role>[] = [
    {
        accessorKey: 'name',
        header: 'Role Name',
        cell: ({ row }) => h('span', { class: 'text-default font-semibold' }, row.original.name)
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => h('span', { class: 'text-muted' }, row.original.description)
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
        meta: { class: { td: 'text-right' } },
        cell: ({ row }) => {
            const items = [
                [
                    {
                        label: 'Edit',
                        icon: 'i-lucide-pencil',
                        onSelect: () => openEditModal(row.original)
                    }
                ],
                [
                    {
                        label: 'Delete',
                        icon: 'i-lucide-trash',
                        color: 'error',
                        onSelect: () => promptDelete(row.original.id)
                    }
                ]
            ]

            return h(UDropdownMenu, {
                items,
                content: { align: 'end' },
                size: 'sm'
            }, {
                default: () => h(UButton, {
                    icon: 'i-lucide-ellipsis-vertical',
                    color: 'neutral',
                    variant: 'ghost',
                    size: 'sm'
                })
            })
        }
    }
]

const table = useTemplateRef('table')
const globalFilter = ref('')
const columnVisibility = ref({
    id: false
})
</script>

<template>
    <PageHeading forTable title="Roles" description="Manage roles in the system">
        <div class="flex gap-2">
            <TableGlobalFilter v-model="globalFilter" />
            <TableColumnToggle :table="table" />
        </div>
    </PageHeading>

    <Teleport to="#header-actions-teleport">
        <UButton color="primary" icon="i-lucide-plus" label="Add Role" size="sm" @click="openCreateModal()" />
    </Teleport>

    <ClientOnly>
        <UTable :data="store.roles" :columns="tableColumns" :loading="store.isLoading"
            v-model:column-visibility="columnVisibility" v-model:global-filter="globalFilter" sticky ref="table"
            class="flex-1 scrollbar">
            <template #empty>
                <UEmpty variant="naked" icon="i-lucide-shield-half" title="No roles found"
                    description="There are currently no roles to display. Add a new role to get started.">
                    <template #actions>
                        <UButton label="Add First Role" icon="i-lucide-plus" color="primary" size="lg"
                            @click="openCreateModal()" />
                    </template>
                </UEmpty>
            </template>
        </UTable>
    </ClientOnly>

    <!-- Delete Confirmation Modal -->
    <ConfirmationModal v-model:open="isDeleteConfirmOpen" title="Delete role?"
        description="This will permanently remove the role. This action cannot be undone." confirm-label="Yes, Delete"
        confirm-color="error" @confirm="confirmDelete" />

    <!-- Add / Edit Role Modal -->
    <AddRoleModal ref="modalRef" v-model:open="isOpen" :is-editing="isEditing" @save="handleSave" />
</template>
