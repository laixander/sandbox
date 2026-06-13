<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ isEditing: boolean }>()
const emit = defineEmits<{ save: [data: z.output<typeof schema>] }>()

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
})

type Schema = z.output<typeof schema>
const formRef = useTemplateRef('formRef')
const isSaving = ref(false)

const state = reactive<Schema>({ name: '', description: '' })

const reset = (initial?: Partial<typeof state>) => {
    state.name = initial?.name ?? ''
    state.description = initial?.description ?? ''
    isSaving.value = false
}

defineExpose({ reset })

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (isSaving.value) return
    isSaving.value = true
    emit('save', event.data)
}
</script>

<template>
    <UModal v-model:open="open" :title="isEditing ? 'Modify Role Details' : 'Register New Role'">
        <template #body>
            <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Role Name" name="name" required>
                    <UInput v-model="state.name" placeholder="Admin" class="w-full" />
                </UFormField>
                <UFormField label="Description" name="description" required>
                    <UInput v-model="state.description" placeholder="Full access role" class="w-full" />
                </UFormField>
            </UForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton variant="ghost" color="neutral" :disabled="isSaving" @click="open = false">Dismiss</UButton>
                <UButton color="primary" :loading="isSaving" @click="formRef?.submit()">
                    {{ isEditing ? 'Save Changes' : 'Save Record' }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>
