<script setup lang="ts">
definePageMeta({
    layout: false
})

const store = useRoleStore()
const { setRole } = useDemoAuth()
const router = useRouter()

const selectedRoleId = ref<string | undefined>(undefined)

const handleLogin = () => {
    if (!selectedRoleId.value) return
    setRole(selectedRoleId.value)

    const role = store.roles.find((r: any) => r.id === selectedRoleId.value)
    if (role && role.pages && role.pages.length > 0) {
        router.push(role.pages[0] as string)
    } else {
        router.push('/')
    }
}
</script>

<template>
    <div class="fixed inset-0 flex justify-center items-center bg-neutral-50 dark:bg-neutral-950">
        <UCard class="w-full max-w-sm shadow-sm">
            <header class="space-y-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    <UIcon name="i-ph-stack-duotone" class="size-8 text-primary" />
                    <span class="text-2xl font-black tracking-tight">Sand<span class="text-primary">Box</span></span>
                </div>
                <div class="text-sm text-muted">Sign in to your account to continue</div>
            </header>

            <USeparator class="my-6" />

            <main class="space-y-4">
                <UFormField label="Username">
                    <UInput placeholder="Enter your username" variant="soft" size="lg" class="w-full" />
                </UFormField>
                <UFormField label="Password">
                    <UInput placeholder="Enter your password" variant="soft" size="lg" type="password" class="w-full" />
                </UFormField>
                <UFormField label="Role">
                    <USelect v-model="selectedRoleId" placeholder="Select your role"
                        :items="store.roles.map((r: any) => ({ label: r.name, value: r.id }))" variant="soft" size="lg"
                        class="w-full" />
                </UFormField>

                <!-- Role preview card -->
                <Transition name="fade" mode="out-in">
                    <div v-if="selectedRoleId"
                        class="flex items-center gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800">
                        <UIcon
                            :name="store.roles.find((r: any) => r.id === selectedRoleId)?.name === 'Admin' ? 'i-lucide-shield-check' : 'i-lucide-user'"
                            class="size-5 text-primary shrink-0" />
                        <div>
                            <div class="text-sm font-semibold text-primary">{{store.roles.find((r: any) => r.id ===
                                selectedRoleId)?.name }}</div>
                            <div class="text-xs text-muted">
                                {{store.roles.find((r: any) => r.id === selectedRoleId)?.description}}
                            </div>
                        </div>
                    </div>
                </Transition>

                <UButton label="Sign In" size="lg" class="justify-center" block :disabled="!selectedRoleId"
                    @click="handleLogin" />
            </main>

            <footer class="text-center mt-8">
                <ULink as="button" class="text-sm">Forgot Password?</ULink>
            </footer>
        </UCard>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
