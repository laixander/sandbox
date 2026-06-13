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
</script>

<template>
    <UModal v-model:open="open" title="Manage User Roles">
        <template #body>
            <div class="space-y-3">
                <div class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Assign Roles</div>
                <div class="space-y-2">
                    <UCheckbox
                        v-for="role in roleStore.roles"
                        :key="role.id"
                        :name="role.id"
                        :label="role.name"
                        :model-value="selectedRoleIds.includes(role.id)"
                        @update:model-value="(val: boolean) => { 
                            if(val) selectedRoleIds.push(role.id); 
                            else selectedRoleIds = selectedRoleIds.filter((id: string) => id !== role.id); 
                        }"
                    />
                </div>
                <div v-if="roleStore.roles.length === 0" class="text-sm text-muted">
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
