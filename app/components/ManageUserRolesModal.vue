<script setup lang="ts">
import { useRoleStore } from '~/stores/roleStore'

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ save: [roleIds: string[]] }>()

const roleStore = useRoleStore()
const selectedRoleIds = ref<string[]>([])
const isSaving = ref(false)

const reset = (initialRoles: string[]) => {
    selectedRoleIds.value = [...initialRoles]
    isSaving.value = false
}

defineExpose({ reset })

async function onSubmit() {
    if (isSaving.value) return
    isSaving.value = true
    emit('save', selectedRoleIds.value)
}

const roleItems = computed(() => roleStore.roles.map((role: any) => ({
    value: role.id,
    label: role.name
})))
</script>

<template>
    <UModal v-model:open="open" title="Manage User Roles">
        <template #body>
            <div class="space-y-3">
                <div class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Assign Roles</div>
                <UCheckboxGroup v-if="roleItems.length" v-model="selectedRoleIds" :items="roleItems" name="roles" />
                <div v-else class="text-sm text-muted">
                    No roles available. Please create some roles first.
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" :disabled="isSaving" @click="open = false">Dismiss</UButton>
                <UButton color="primary" :loading="isSaving" @click="onSubmit">
                    Save Assignments
                </UButton>
            </div>
        </template>
    </UModal>
</template>
